"use client";

import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SvgColor } from "@/components/svg-color";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Modal from "@/components/Modal";
import { getTaskStatus, startAnalysis } from "@/app/lib/client";
import { useRouter } from "next/navigation";
import type { components } from "@/app/lib/schema";
import { TASK_STATUS_MESSAGE } from "@/constants/taskStatus";

type StatusKey = keyof typeof TASK_STATUS_MESSAGE;
type TaskStatusResponse = components["schemas"]["TaskStatusResponse"];

export type ResumeUploadSchemaType = zod.infer<typeof ResumeUploadSchema>;

const ResumeUploadSchema = zod.object({
  file: zod
    .instanceof(File, { message: "파일을 업로드 해주세요" })
    .refine((file) => file.size > 0, {
      message: "빈 파일은 업로드할 수 없습니다.",
    })
    // 파일 크기 5MB 초과 체크
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "파일 크기는 최대 5MB까지 허용됩니다.",
    }),
  manualResume: zod.string(),
});

export default function ResumeUploadView() {
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 input 참조
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [task_id, setTask_id] = useState<string>("");
  const router = useRouter();
  const [shouldPoll, setShouldPoll] = useState<boolean>(true);
  const [taskStatusMessage, setTaskStatusMessage] = useState<string>("");
  const [modalImageContent, setModalImageContent] =
    useState<React.ReactNode>(null);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mockStatus, setMockStatus] = useState<StatusKey | null>(null); // 디버그용 상태

  // 파일 input 클릭
  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  // 페이지 진입시 이전 상태 초기화
  useEffect(() => {}, []);

  // form 관리
  const defaultValues = {
    file: undefined,
    manualResume: "",
  };

  const methods = useForm<ResumeUploadSchemaType>({
    resolver: zodResolver(ResumeUploadSchema),
    defaultValues,
  });

  const { watch } = methods;

  const values = watch();
  const manualResume = values.manualResume;
  const withoutSpacesManual = manualResume.replace(/\s/g, ""); // 직접 작성란 공백 제거

  // 1. 이력서 분석 시작
  const analysisMutation = useMutation({
    mutationFn: startAnalysis,
    onSuccess: (data) => {
      const task_id = data.task_id;
      setTask_id(task_id);
    },
    onError: (err) => {
      setTaskStatusMessage(
        "이력서 업로드에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
      console.error(err);
    },
  });

  // 2. taskId로 상태 확인 (폴링)
  const { data: taskStatus } = useQuery<TaskStatusResponse>({
    queryKey: ["task-status"],
    queryFn: () => getTaskStatus(task_id!),
    enabled: !!task_id && shouldPoll && !mockStatus, // taskId가 있고, 폴링이 필요하고, mockStatus가 없을 때만 실행
    refetchInterval: 1000, // 1초마다 폴링
  });

  // task status 상태관리 및 폴링 제어
  useEffect(() => {
    if (!taskStatus) return;

    let mainImageSrc = "";
    let progressImageSrc = "";

    switch (taskStatus.status) {
      case "pending":
      case "processing":
        mainImageSrc = "/images/home_jinro.svg";
        progressImageSrc = "/images/resume_step_1.svg";
        break;
      case "parsing":
      case "chunking":
        mainImageSrc = "/images/home_resume.svg";
        progressImageSrc = "/images/resume_step_2.svg";
        break;
      case "saving":
      case "scoring":
        mainImageSrc = "/images/glasses_resume.svg";
        progressImageSrc = "/images/resume_step_3.svg";
        break;
      case "completed":
        mainImageSrc = "/images/complete_resume.svg";
        progressImageSrc = "/images/resume_step_4.svg";
        break;
      default:
        break;
    }

    if (mainImageSrc) {
      setModalImageContent(
        <div className="flex flex-col items-center gap-8">
          <Image
            src={mainImageSrc}
            alt="상태 이미지"
            width={236}
            height={236}
          />
          {progressImageSrc && (
            <Image
              src={progressImageSrc}
              alt="진행 상태"
              width={588}
              height={48}
            />
          )}
        </div>
      );
    }

    // 상태 메시지 설정
    setTaskStatusMessage(
      TASK_STATUS_MESSAGE[taskStatus.status as StatusKey] ??
        "이력서 상태를 가져올 수 없습니다. 다시 시도해주세요."
    );

    // 완료 또는 실패 시 폴링 중단
    if (taskStatus.status === "completed" || taskStatus.status === "failed") {
      setShouldPoll(false); // 폴링 중단

      // 🎯 완료 처리 (페이지 이동)
      if (taskStatus.status === "completed") {
        setTaskStatusMessage(
          TASK_STATUS_MESSAGE[taskStatus.status as StatusKey]
        );
        // 캐시 무효화
        setTask_id("");
        queryClient.removeQueries({ queryKey: ["task-status"] });
        // 이력서 분석 결과 상세 페이지로 이동
        router.push(`/resume/report/${taskStatus.result.resume_id}`);
      } else if (taskStatus.status === "failed") {
        // 🎯 실패 처리
        setTaskStatusMessage(
          TASK_STATUS_MESSAGE[taskStatus.status as StatusKey] ??
            "이력서 상태를 가져올 수 없습니다. 다시 시도해주세요."
        );
      }
    }
  }, [taskStatus, router, queryClient]);

  // 디버그용: mockStatus가 변경될 때 UI 업데이트
  useEffect(() => {
    if (!mockStatus) return;

    let mainImageSrc = "";
    let progressImageSrc = "";

    switch (mockStatus) {
      case "pending":
      case "processing":
        mainImageSrc = "/images/home_jinro.svg";
        progressImageSrc = "/images/resume_step_1.svg";
        break;
      case "parsing":
      case "chunking":
        mainImageSrc = "/images/home_resume.svg";
        progressImageSrc = "/images/resume_step_2.svg";
        break;
      case "saving":
      case "scoring":
        mainImageSrc = "/images/glasses_resume.svg";
        progressImageSrc = "/images/resume_step_3.svg";
        break;
      case "completed":
        mainImageSrc = "/images/complete_resume.svg";
        progressImageSrc = "/images/resume_step_4.svg";
        break;
      case "failed":
        mainImageSrc = "/images/failed_resume.svg";
        progressImageSrc = ""; // 실패 시 프로그레스 바 없음
        break;
      default:
        break;
    }

    if (mainImageSrc) {
      setModalImageContent(
        <div className="flex flex-col items-center gap-8">
          <Image
            src={mainImageSrc}
            alt="상태 이미지"
            width={236}
            height={236}
          />
          {progressImageSrc && (
            <Image
              src={progressImageSrc}
              alt="진행 상태"
              width={588}
              height={48}
            />
          )}
        </div>
      );
    }

    setTaskStatusMessage(TASK_STATUS_MESSAGE[mockStatus] || "");
    setIsModalOpen(true); // 상태 변경 시 모달 열기
  }, [mockStatus]);

  // 폼 제출시 실행할 함수
  const onSubmit = async (formData: ResumeUploadSchemaType) => {
    setIsSubmitting(true);
    setIsModalOpen(true);

    try {
      await analysisMutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 이력서 업로드 섹션
  const renderUploadTab = (
    <section className="mb-20">
      <div className="flex justify-between mb-8">
        <h1 className="text-[32px] text-[#777777]">이력서를 업로드해주세요</h1>
        <Button type="button" onClick={() => handleFileSelectClick()}>
          파일 선택
        </Button>
      </div>

      <FormField
        control={methods.control}
        name="file"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <div>
                <Input
                  type="file"
                  id="resumeUpload"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
                <Label htmlFor="resumeUpload" className="block w-full">
                  <div
                    className={clsx(
                      "flex flex-col justify-center items-center rounded-[10px] h-[385px] space-y-[6px] mb-[10px] transition-colors",
                      values.file !== undefined &&
                        "bg-blue-2 text-blue border border-blue",
                      fieldState.invalid
                        ? "bg-[#FFF9F9] border border-[#FF6161] text-[#F45C5C]"
                        : "bg-[#F8F8F8] border border-[#CAC8C8] text-[#767676]"
                    )}
                  >
                    <div className="flex gap-[6px] items-center">
                      <p className="text-[22px]">
                        {fieldState.error
                          ? fieldState.error.message
                          : values.file === undefined
                          ? "파일을 업로드 해주세요"
                          : values.file.name}
                      </p>
                      <SvgColor src="/icons/icon-upload.svg" />
                    </div>
                    <p>지원 가능한 파일 형식 안내: PDF, DOC, DOCX, TXT 등</p>
                  </div>
                </Label>
                <p className="text-right text-xs text-[#767676]">
                  최대 5mb 까지 업로드 가능합니다.
                </p>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );

  const renderManualTab = (
    <TabsContent value="manual">
      <article className="space-y-8">
        <h1 className="text-[32px] text-[#777777]">이력서를 작성해주세요</h1>
        <div>
          <FormField
            control={methods.control}
            name="manualResume"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className="min-h-[268px] mb-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-right text-xs text-[#767676]">{`총 글자수 ${manualResume.length}자 / 공백제외 ${withoutSpacesManual.length}자`}</p>
        </div>
      </article>
    </TabsContent>
  );

  return (
    <div>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* 이력서 작성 방식 선택 탭 */}
          {renderUploadTab}
          <section className="flex w-full justify-end space-x-6">
            {isSubmitting ? (
              <Button
                variant={"loading"}
                size={"large"}
                className="w-[320px] h-[72px]"
              >
                이력서 분석중
              </Button>
            ) : (
              <Button
                type="submit"
                variant={"default_primary"}
                size={"large"}
                className="w-[320px] h-[72px]"
              >
                이력서 분석하기
              </Button>
            )}
          </section>
        </form>
      </Form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={taskStatusMessage}
        image={modalImageContent}
        handleFileUpload={() => handleFileSelectClick()}
      />

      {/* 디버그용 UI */}
      <div className="fixed bottom-5 right-5 bg-gray-200 p-4 rounded-lg shadow-lg space-y-2">
        <h4 className="font-bold">Debug: Set Mock Status</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(TASK_STATUS_MESSAGE).map((status) => (
            <Button
              key={status}
              variant="default"
              size="small"
              onClick={() => setMockStatus(status as StatusKey)}
            >
              {status}
            </Button>
          ))}
          <Button
            variant="default_primary"
            size="small"
            onClick={() => setMockStatus(null)}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
