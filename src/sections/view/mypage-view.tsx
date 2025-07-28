"use client";

import { z as zod } from "zod";
import { Button } from "@/components/ui/button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectForm from "@/components/SelectForm";
import { Input } from "@/components/ui/input";
import { SvgColor } from "@/components/svg-color";
import clsx from "clsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import client from "@/app/lib/client";
import { useState } from "react";
import AnalysisCircles from "@/components/AnalysisCircles";
import KeywordCloud from "@/components/KeywordCloud";
import { mockCompanyKeywords, mockMyKeywords } from "@/__mock__/keywords";
import { useRouter } from "next/navigation";

export type MypageSchemaType = zod.infer<typeof MypageSchema>;

interface Job {
  id: number;
  job_type: string;
  job_name_ko: string;
  description: string;
  stability: number;
  creativity: number;
  social_service: number;
  ability_development: number;
  conservatism: number;
  social_recognition: number;
  autonomy: number;
  self_improvement: number;
}

interface Aptitude {
  id: number;
  jinro_id: number;
  version: number;
  stability_score: number;
  creativity_score: number;
  social_service_score: number;
  ability_development_score: number;
  conservatism_score: number;
  social_recognition_score: number;
  autonomy_score: number;
  self_improvement_score: number;
  first_job_id: number;
  first_job: Job;
  first_job_score: number;
  second_job_id: number;
  second_job: Job;
  second_job_score: number;
  third_job_id: number;
  third_job: Job;
  third_job_score: number;
  created_at: string;
}

const MypageSchema = zod.object({
  link: zod.string().min(1),
  resume: zod.number(),
  aptitude: zod.number(),
});

// 분석 전에 보여줄 간단한 하드코딩 키워드
const preAnalysisKeywords: string[] = [
  "리더십",
  "문제해결",
  "React",
  "Java",
  "Figma",
  "소통",
  "기획",
];

export default function MypageView() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["api", "v1", "auth", "me"],
    queryFn: async () => {
      const res = await client.GET("/api/v1/auth/me");
      if (res.error) {
        throw new Error("Failed to fetch user data");
      }
      return res.data;
    },
  });

  const { data: resumeData } = useQuery({
    queryKey: ["api", "v1", "resume"],
    queryFn: async () => {
      const res = await client.GET("/api/v1/resume/");
      if (res.error) {
        throw new Error("Failed to fetch resumes");
      }
      return res.data;
    },
  });

  const { data: aptitudeData } = useQuery<Aptitude[]>({
    queryKey: ["api", "v1", "jinro", "user"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/jinro/user`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch aptitude data");
      }
      const data = await response.json();
      return data as Aptitude[];
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: MypageSchemaType) => {
      const { resume: resume_id, link: jd_url, aptitude: jinro_id } = formData;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/jd/${resume_id}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ jd_url, resume_id, jinro_id }),
        }
      );
      if (!response.ok) {
        throw new Error("Analysis failed");
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Analysis successful:", data);
      setIsAnalyzed(true);
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
    },
  });

  const methods = useForm<MypageSchemaType>({
    resolver: zodResolver(MypageSchema),
    defaultValues: {
      link: "",
    },
  });
  const { watch, control, reset } = methods;
  const values = watch();

  const onSubmit = (formData: MypageSchemaType) => {
    mutate(formData);
  };

  const handleReset = () => {
    setIsAnalyzed(false);
    reset();
  };

  const handleLogout = async () => {
    try {
      await client.GET("/api/v1/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      router.push("/login");
    }
  };

  const renderCenterCircleContent = () => {
    if (isAnalyzed) {
      return (
        <article className="w-96 flex flex-col justify-center items-center gap-6">
          <section className="flex items-center gap-6">
            <div className="flex items-center gap-[5px]">
              <p className="text-gray-800 title_1">88</p>
              <p className="text-gray-600 title_3">/100점</p>
            </div>
            <p className="text-gray-800 title_2">우수</p>
          </section>

          <section className="flex flex-col justify-start items-center gap-4">
            <h3 className="text-center text-gray-500 title_3">
              기업과 나의 핵심 키워드
            </h3>
            <ul className="flex justify-center items-center gap-5">
              <li className="text-center text-gray-700 title_3">키워드</li>
              <li className="text-center text-gray-700 title_3">키워드</li>
              <li className="text-center text-gray-700 title_3">키워드</li>
            </ul>
          </section>

          <div className="w-full flex flex-col justify-start items-start gap-8">
            <section>
              <div className="flex items-start gap-6">
                <h4 className="px-2 py-1 bg-white rounded-[10px] outline-1 outline-offset-[-1px] outline-primary-500 flex justify-center items-center w-24 text-center text-primary-500 button_2">
                  장점
                </h4>
                <ul className="max-w-64 py-1.5 flex items-center gap-4 flex-wrap">
                  <li className="text-center text-gray-700 button">키워드</li>
                  <li className="text-center text-gray-700 button">키워드</li>
                  <li className="text-center text-gray-700 button">키워드</li>
                  <li className="text-center text-gray-700 button">키워드</li>
                </ul>
              </div>
            </section>
            <section>
              <div className="flex items-start gap-6">
                <h4 className="px-2 py-1 bg-white rounded-[10px] outline-1 outline-offset-[-1px] outline-gray-600 flex justify-center items-center w-24 text-center text-gray-500 button_2">
                  단점
                </h4>
                <ul className="max-w-64 py-1.5 flex items-center gap-4 flex-wrap">
                  <li className="text-center text-gray-700 button">키워드</li>
                  <li className="text-center text-gray-700 button">키워드</li>
                  <li className="text-center text-gray-700 button">키워드</li>
                  <li className="text-center text-gray-700 button">키워드</li>
                </ul>
              </div>
            </section>
          </div>
        </article>
      );
    }

    return (
      <div className="w-[384px]">
        <h2 className="title_2 text-gray-600 mb-8 text-center">
          기업과 나의 핵심 키워드 찾기
        </h2>
        <Controller
          name="link"
          control={control}
          render={({ field, fieldState }) => (
            <div className="mb-8">
              <div
                className={clsx(
                  "ring bg-white px-4 py-2 rounded-[10px] flex items-center mb-2",
                  fieldState.invalid ? "ring-error-500" : "ring-primary-400"
                )}
              >
                <SvgColor
                  src="/icons/icon-link.svg"
                  width={24}
                  height={24}
                  className="text-gray-400"
                />
                <Input
                  {...field}
                  className={clsx(
                    "focus-visible:border-none focus-visible:ring-0 border-none body_2 placeholder:body_2",
                    fieldState.invalid
                      ? "placeholder:text-error-500"
                      : "placeholder:text-gray-400"
                  )}
                  placeholder="채용공고 링크 입력"
                />
              </div>
              <p
                className={clsx(
                  "body_2",
                  fieldState.invalid ? "text-error-500" : "text-gray-400"
                )}
              >
                링크를 입력하고 이력서와 적성검사를 선택해 주세요
              </p>
            </div>
          )}
        />
        <Button
          variant={"default_primary"}
          size={"large"}
          className="w-full"
          type="submit"
          disabled={isPending}
        >
          <div className="flex items-center">
            <p>{isPending ? "분석 중..." : "채용공고와 비교하기"}</p>
            <SvgColor src="/icons/icon-search.svg" width={32} height={32} />
          </div>
        </Button>
      </div>
    );
  };

  return (
    <div>
      {/* 프로필 섹션 */}
      <div className="bg-[#F5F5F5] flex items-center justify-center px-8 py-6 rounded-2xl space-x-6 mb-20 text-gray-500">
        <div className="size-[112px] bg-white rounded-full"></div>
        <section className="flex flex-col gap-2 w-[318px]">
          <span className="title_1">{userData?.nickname}</span>
          <span className="body_2">
            {userData?.email ? userData?.email : "등록된 이메일이 없습니다."}
          </span>
          <div className="flex items-center justify-center text-gray-400">
            <Button
              variant={"link_default"}
              className="px-4 py-2 caption_1"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        </section>
        <div className="w-0.5 h-[106px] bg-gray-200"></div>
        <section className="w-[180px] flex flex-col gap-2 items-center">
          <span className="body_1">이력서</span>
          <span className="subtitle_1">
            {resumeData?.resumes.length ?? 0}건
          </span>
        </section>
        <div className="w-0.5 h-[106px] bg-gray-200"></div>
        <section className="w-[180px] flex flex-col gap-2 items-center">
          <span className="body_1">적성검사</span>
          <span className="subtitle_1">{aptitudeData?.length ?? 0}건</span>
        </section>
      </div>

      {/* 종합결과 섹션 */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <section className="space-y-[54px] mb-8">
            <h2 className="title_1 text-[#767676]">종합결과</h2>
            <AnalysisCircles
              leftCircleContent={
                <KeywordCloud
                  keywords={
                    isAnalyzed
                      ? mockCompanyKeywords.slice(0, 7)
                      : preAnalysisKeywords
                  }
                  isAnalyzed={isAnalyzed}
                />
              }
              centerCircleContent={renderCenterCircleContent()}
              rightCircleContent={
                <KeywordCloud
                  keywords={
                    isAnalyzed
                      ? mockMyKeywords.slice(0, 7)
                      : preAnalysisKeywords
                  }
                  isAnalyzed={isAnalyzed}
                />
              }
            />

            {isAnalyzed && (
              <section className="w-full p-8 rounded-[20px] shadow-shadow-2 outline-1 outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-start items-start gap-6">
                <header className="w-full h-20 flex flex-col justify-center items-center gap-1">
                  <h2 className="text-center text-gray-600 title_2">직무명</h2>
                  <p className="text-center text-gray-500 body_2">
                    담당하는 업무설명
                  </p>
                </header>
                <article className="flex flex-col justify-start items-start gap-6">
                  <section className="inline-flex justify-start items-start gap-6">
                    <h3 className="w-[232px] h-11 flex items-center text-gray-600 body_1 text-left">
                      이런능력을 가지고 있어요
                    </h3>
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <div className="flex justify-start items-center gap-4">
                        <strong className="px-4 py-2 bg-gray-25 rounded-[10px] flex justify-center items-center gap-2.5 w-20 text-center text-gray-500 ">
                          키워드
                        </strong>
                        <p className="flex-1 text-gray-500 text-xl font-normal leading-loose">
                          내용
                        </p>
                      </div>
                      <div className="flex justify-start items-center gap-4">
                        <strong className="px-4 py-2 bg-gray-25 rounded-[10px] flex justify-center items-center gap-2.5 w-20 text-center text-gray-500 ">
                          키워드
                        </strong>
                        <p className="flex-1 text-gray-500 text-xl font-normal leading-loose">
                          내용
                        </p>
                      </div>
                    </div>
                  </section>
                  <section className="inline-flex justify-start items-start gap-6">
                    <h3 className="w-[232px] h-11 flex items-center text-gray-600 body_1 text-left">
                      이런 능력이 필요해요
                    </h3>
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <div className="flex justify-start items-center gap-4">
                        <strong className="px-4 py-2 bg-gray-25 rounded-[10px] flex justify-center items-center gap-2.5 w-20 text-center text-gray-500 ">
                          키워드
                        </strong>
                        <p className="flex-1 text-gray-500 text-xl font-normal leading-loose">
                          내용
                        </p>
                      </div>
                      <div className="flex justify-start items-center gap-4">
                        <strong className="px-4 py-2 bg-gray-25 rounded-[10px] flex justify-center items-center gap-2.5 w-20 text-center text-gray-500 ">
                          키워드
                        </strong>
                        <p className="flex-1 text-gray-500 text-xl font-normal leading-loose">
                          내용
                        </p>
                      </div>
                    </div>
                  </section>
                </article>
              </section>
            )}
          </section>

          {!isAnalyzed && (
            <div className="flex gap-8 mb-[72px]">
              <SelectForm
                title="이력서 목록"
                name="resume"
                values={values}
                methods={methods}
                items={
                  resumeData?.resumes.map((resume) => ({
                    id: resume.id,
                    title: `${resume.version} 이력서입니다.`,
                    created_at: resume.created_at,
                  })) ?? []
                }
              />
              <SelectForm
                title="적성검사 목록"
                name="aptitude"
                values={values}
                methods={methods}
                items={
                  aptitudeData?.map((aptitude) => ({
                    id: aptitude.id,
                    title: `적성검사입니다.`,
                    created_at: aptitude.created_at,
                  })) ?? []
                }
              />
            </div>
          )}
        </form>
      </FormProvider>

      {isAnalyzed && (
        <div className="flex justify-end">
          <Button
            variant={"default"}
            size={"large"}
            onClick={handleReset}
            className="w-[384px]"
          >
            다시 선택하기
          </Button>
        </div>
      )}
    </div>
  );
}
