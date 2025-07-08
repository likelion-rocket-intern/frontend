"use client";

import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useRef, useState } from "react";
import clsx from "clsx";
import Modal from "@/components/Modal";

type ResumeUploadSchemaType = zod.infer<typeof ResumeUploadSchema>;

const ResumeUploadSchema = zod.object({
  file: zod
    .instanceof(File, { message: "파일을 업로드해주세요." })
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 파일 input 클릭
  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  // form 관리
  const defaultValues = {
    file: undefined,
    manualResume: "",
  };

  const methods = useForm<ResumeUploadSchemaType>({
    resolver: zodResolver(ResumeUploadSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();
  const manualResume = values.manualResume;
  const withoutSpacesManual = manualResume.replace(/\s/g, ""); // 직접 작성란 공백 제거

  // 폼 제출시 실행할 함수
  const onSubmit = (formData: ResumeUploadSchemaType) => {
    console.log(formData);
  };

  const renderUploadTab = (
    <TabsContent value="upload">
      {/* 이력서 업로드 섹션 */}
      <section>
        <div className="flex justify-between mb-8">
          <h1 className="text-[32px] text-[#777777]">
            이력서를 업로드해주세요
          </h1>
          <Button
            type="button"
            onClick={() => handleFileSelectClick()}
            className="py-2 px-4 leading-none h-[38px]"
          >
            파일 선택
          </Button>
        </div>

        <FormField
          control={methods.control}
          name="file"
          render={({ field }) => (
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
                        "flex flex-col justify-center items-center bg-[#F8F8F8] border border-[#CAC8C8] rounded-[10px] h-[138px] text-[#767676] space-y-[6px] mb-[10px]",
                        values.file !== undefined && "bg-[#FFFAF7]"
                      )}
                    >
                      <div className="flex gap-[6px] items-center">
                        <p className="text-[22px]">
                          {values.file === undefined
                            ? "드래그해서 업로드"
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
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
    </TabsContent>
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
          <Tabs defaultValue="upload" className="flex w-full mb-24">
            <TabsList className="self-end mb-20">
              <TabsTrigger value="upload">이력서 파일 업로드하기</TabsTrigger>
              <TabsTrigger value="manual">새 이력서 작성하기</TabsTrigger>
            </TabsList>

            {renderUploadTab}

            {renderManualTab}
          </Tabs>

          <section className="flex w-full justify-end space-x-6 *:w-[320px] *:h-[72px] *:py-5 *:px-4 *:rounded-[6px] *:text-2xl">
            <Button variant={"white"} type="submit">
              저장하기
            </Button>
            <Button type="button" onClick={() => setIsModalOpen(true)}>
              이력서 분석하기
            </Button>
          </section>
        </form>
      </Form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="이력서 분석"
      >
        <p className="mb-4">이력서를 분석중입니다.</p>
      </Modal>
    </div>
  );
}
