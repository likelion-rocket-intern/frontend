"use client";

import React, { Suspense } from "react";
import client from "@/app/lib/client";
import { useParams } from "next/navigation";
import { MOCK_RESUME_RESULT } from "@/constants/resume";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import PulseLoader from "react-spinners/ClipLoader";

type JobFitness = {
  name: string;
  score: number;
  skill: string;
};

type ResumeEvaluation = {
  strengths: {
    score: number;
    category: string;
    attribute: string;
    description: string;
  }[];
  weaknesses: {
    score: number;
    category: string;
    attribute: string;
    description: string;
  }[];
};

type AnalysisResult = {
  job_fitness: JobFitness[];
  resume_evaluation: ResumeEvaluation;
};

type ResumeDetailResponse = {
  id: number;
  user_id: number;
  version: string;
  original_filename?: string;
  upload_filename?: string;
  file_url?: string;
  file_path?: string;
  analysis_result: string | AnalysisResult;
  created_at: string;
  keywords?: {
    keyword: string;
    similar_to: string;
    similarity: number;
    frequency: number;
  }[];
};

export default function ResumeReportView() {
  const params = useParams();
  const resume_id = Number(params.id);

  // 현재 유저 정보
  const { data: currentUser } = useQuery({
    queryKey: ["api", "v1", "auth", "me"],
    queryFn: async () => {
      try {
        const { data, error } = await client.GET("/api/v1/auth/me", {});
        if (error) throw new Error("유저 정보 가져오기 실패");
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  // 이력서 분석 상세 정보
  const { data: resumeDetail, isLoading } = useQuery<
    ResumeDetailResponse | undefined
  >({
    queryKey: ["api", "v1", "resume", resume_id],
    queryFn: async () => {
      try {
        const { data, error } = await client.GET("/api/v1/resume/{resume_id}", {
          params: {
            path: {
              resume_id,
            },
          },
        });
        if (error) throw new Error("이력서 분석 상세 정보 가져오기 실패");
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    enabled: typeof resume_id === "number",
  });

  // 로딩 상태 관리
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <PulseLoader
          color="#ff7710" // 스피너 색상
          loading={true} // 로딩 여부
          size={70} // 크기(px)
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  // 반환된 데이터가 string일 경우 파싱
  const parsedResult: AnalysisResult =
    typeof resumeDetail?.analysis_result === "string"
      ? JSON.parse(resumeDetail.analysis_result)
      : resumeDetail?.analysis_result;

  // 시간 포매팅
  const getFormattedDate = (isoString: string | undefined) => {
    if (isoString) {
      const date = new Date(isoString);
      const formatted = date
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, ". ");
      return formatted;
    }
  };

  // 직무 적합성 그래프 색상
  const graphStyle = [
    "bg-primary-500",
    "bg-primary-400",
    "bg-primary-300",
    "bg-primary-200",
    "bg-primary-100",
    "bg-primary-50",
  ];

  // 적합 직무 렌더링
  const renderJobFit = () => {
    const jobFit = parsedResult?.job_fitness
      .filter((_, index) => index < 6)
      .map((job, index) => {
        const firstFitScore = parsedResult?.job_fitness[0].score;

        return (
          <article
            key={job.name}
            className="group flex items-start gap-6 justify-between"
          >
            <div className="flex items-center h-full pt-[6px]">
              <span className="text-gray-500 subtitle_1 size-8 mr-8">
                {index + 1}
              </span>
              <span className="text-gray-600 body_1 w-40 text-center mr-6">
                {job.name}
              </span>
              <div className="w-[338px]">
                <div
                  style={
                    index === 0
                      ? { width: "100%" }
                      : { width: `${(job.score / firstFitScore) * 338}px` }
                  }
                  className={clsx(
                    "flex items-center px-6 py-4 rounded text-gray-600",
                    graphStyle[index]
                  )}
                >
                  <span
                    className={clsx("button", index === 0 && "text-gray-25")}
                  >
                    {job.score}
                  </span>
                </div>
              </div>
            </div>
            <Accordion type="single" className="w-full h-full" collapsible>
              <AccordionItem
                value={`item-${index}`}
                className="group flex flex-col flex-1 p-4 items-stretch rounded-[10px] border border-gray-200 h-full"
              >
                <AccordionTrigger className="cursor-pointer body_1 text-gray-500">
                  직무 설명
                </AccordionTrigger>
                <AccordionContent className="body_2 text-gray-600">
                  {job.skill}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </article>
        );
      });

    if (jobFit.length > 0) {
      return jobFit;
    } else {
      <div className="h-[138px] bg-error-50 border border-error-500 flex justify-center items-center">
        <p className="subtitle_1 text-error-500">분석할 내용이 부족합니다.</p>
        <p className="body_2 text-error-500">새로운 이력서를 등록해주세요.</p>
      </div>;
    }
  };

  // 장점 렌더링
  const renderStrengths = () => {
    const strengths = parsedResult?.resume_evaluation.strengths
      .filter((_, index) => index < 6)
      .map((item, i) => (
        <article
          key={i}
          className="bg-white rounded-lg px-4 py-6 space-y-4 shadow-shadow-2"
        >
          <h4 className="subtitle_1 text-gray-700">{item.attribute}</h4>
          <p className="text-gray-500 body_1 min-h-[124px] mb-[26px]">
            {item.description}
          </p>
        </article>
      ));

    if (strengths.length > 0) {
      return strengths;
    } else {
      <div className="h-[138px] bg-error-50 border border-error-500 flex justify-center items-center">
        <p className="subtitle_1 text-error-500">분석할 내용이 부족합니다.</p>
        <p className="body_2 text-error-500">새로운 이력서를 등록해주세요.</p>
      </div>;
    }
  };

  // 단점 렌더링
  const renderWeekness = () => {
    const weekness = parsedResult?.resume_evaluation.weaknesses
      .filter((_, index) => index < 6)
      .map((item, i) => (
        <article key={i} className="bg-gray-25 rounded-[10px] p-4 space-y-3">
          <h4 className="subtitle_1 text-gray-600">{item.attribute}</h4>
          <p className="text-gray-500 body_1">{item.description}</p>
        </article>
      ));

    if (weekness.length > 0) {
      return weekness;
    } else {
      <div className="h-[138px] bg-error-50 border border-error-500 flex justify-center items-center">
        <p className="subtitle_1 text-error-500">분석할 내용이 부족합니다.</p>
        <p className="body_2 text-error-500">새로운 이력서를 등록해주세요.</p>
      </div>;
    }
  };

  return (
    <div className="flex flex-col gap-20">
      {/* 이력서 요약 */}
      <section className="space-y-8">
        <h2 className="title_2 text-gray-500">이력서</h2>
        <div className="space-y-6">
          <h3 className="title_1 text-gray-500 mb-1">
            {currentUser?.nickname}
          </h3>

          {/* 요약 */}
          <div className="flex flex-col gap-6 justify-center items-center w-full p-6 rounded-[10px] border border-gray-200 shadow-shadow-2 bg-white">
            {/* 제목 */}
            <div className="text-center">
              <h2 className="title_1 text-gray-500">
                {resumeDetail?.original_filename}
              </h2>
              <p className="text-gray-400 body_2">{`업로드 완료 ${getFormattedDate(
                resumeDetail?.created_at
              )}`}</p>
            </div>

            {/* 키워드 리스트 */}
            <div className="flex flex-wrap justify-center gap-3">
              {resumeDetail?.keywords?.slice(0, 6).map((keyword, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-primary-100 text-gray-600 button"
                  // title={`유사 키워드: ${keyword.similar_to} (유사도: ${(keyword.similarity * 100).toFixed(1)}%)`}
                >
                  {keyword.keyword} ({keyword.frequency})
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 직무 추천 순위 */}
      <section className="space-y-8">
        <h2 className="title_2 text-gray-500">직무 추천 순위</h2>
        <div className="space-y-4">{renderJobFit()}</div>
        <p className="p-6 body_1 text-gray-500 bg-gray-25 rounded-[20px] min-h-[138px]">
          이외 직무추천 내용
        </p>
      </section>

      {/* 이력서 분석 결과 */}
      <section className="space-y-6">
        <h2 className="title_2 mb-8 text-gray-500">이력서 분석 결과</h2>
        {/* 장점 */}
        <div className="space-y-4">
          <h3 className="subtitle_1 text-gray-500">장점</h3>
          <div className="grid grid-cols-3 gap-4">{renderStrengths()}</div>
        </div>

        {/* 단점 */}
        <div className="space-y-4">
          <h3 className="subtitle_1 text-gray-500">단점</h3>
          <div className="space-y-6">{renderWeekness()}</div>
        </div>
      </section>

      {/* 개선 제안 섹션 제거 - API에서 제공하지 않는 데이터 */}
    </div>
  );
}
