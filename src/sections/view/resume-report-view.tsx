"use client";

import React, { useEffect, useState } from "react";
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

type JobFitness = {
  name: string;
  score: number;
  skill: string;
};

type ResumeEvaluation = {
  score: number;
  category: string;
  attribute: string;
  description: string;
};

type AnalysisResult = {
  job_fitness: JobFitness[];
  resume_evaluation: ResumeEvaluation[];
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
};

async function getResumeDetail(
  resumeId: number
): Promise<ResumeDetailResponse> {
  const { data, error } = await client.GET("/api/v1/resume/{resume_id}", {
    params: {
      path: {
        resume_id: resumeId,
      },
    },
  });
  if (error) throw new Error("API 요청 실패");
  return data as ResumeDetailResponse;
}

export default function ResumeReportView() {
  const params = useParams();
  const resumeId = params?.id ? Number(params.id) : undefined;
  const [resumeDetail, setResumeDetail] = useState<ResumeDetailResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resumeId) return;
    setLoading(true);
    getResumeDetail(resumeId)
      .then((data) => setResumeDetail(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [resumeId]);

  // analysis_result가 문자열이면 파싱
  const analysisResult =
    typeof resumeDetail?.analysis_result === "string"
      ? (JSON.parse(resumeDetail.analysis_result) as AnalysisResult)
      : (resumeDetail?.analysis_result as AnalysisResult);

  // if (loading) return <div className="text-center py-10">불러오는 중...</div>;
  // if (error)
  //   return <div className="text-center py-10 text-red-500">{error}</div>;
  // if (!resumeDetail || !analysisResult)
  //   return <div className="text-center py-10">데이터가 없습니다.</div>;

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
  const renderJobFit = MOCK_RESUME_RESULT.job_fitness
    .filter((_, index) => index < 6)
    .map((job, index) => {
      const firstFitScore = MOCK_RESUME_RESULT.job_fitness[0].score;

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
                <span className={clsx("button", index === 0 && "text-gray-25")}>
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

  // 장점 렌더링
  const renderStrengths = MOCK_RESUME_RESULT.resume_evaluation.strengths
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

  // 단점 렌더링
  const renderWeekness = MOCK_RESUME_RESULT.resume_evaluation.weaknesses
    .filter((_, index) => index < 6)
    .map((item, i) => (
      <article key={i} className="bg-gray-25 rounded-[10px] p-4 space-y-3">
        <h4 className="subtitle_1 text-gray-600">{item.attribute}</h4>
        <p className="text-gray-500 body_1">{item.description}</p>
      </article>
    ));

  return (
    <div className="flex flex-col gap-20">
      {/* 이력서 요약 */}
      <section className="space-y-8">
        <h2 className="title_2 text-gray-500">이력서</h2>
        <div className="flex gap-6">
          {/* 프로필 */}
          <article className="w-45 flex flex-col gap-4">
            <div className="size-38 bg-gray-300"></div>
            <div>
              <h3 className="title_1 text-gray-500 mb-1">
                고구마 오억오천개먹기
              </h3>
              <p className="body_2 text-gray-400">dlsmdfur37@email.com</p>
            </div>
          </article>

          {/* 요약 */}
          <article className="flex-1 bg-gray-25 rounded-[10px] p-6 space-y-[10px]">
            <blockquote className="body_1 text-center text-gray-500 h-[84px] mt-[30px]">
              “이력서 요약”
            </blockquote>
            <p className="text-gray-500 body_1">
              강점: 성능 최적화, 문제 해결, 자기주도 학습, 책임감 등
            </p>
            <p className="text-gray-500 body_1">약점: 이러한 요약1줄</p>
          </article>
        </div>
      </section>

      {/* 직무 추천 순위 */}
      <section className="space-y-8">
        <h2 className="title_2 text-gray-500">직무 추천 순위</h2>
        <div className="space-y-4">{renderJobFit}</div>
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
          <div className="grid grid-cols-3 gap-4">{renderStrengths}</div>
        </div>

        {/* 단점 */}
        <div className="space-y-4">
          <h3 className="subtitle_1 text-gray-500">단점</h3>
          <div className="space-y-6">{renderWeekness}</div>
        </div>
      </section>

      {/* 개선 제안 */}
      <section className="space-y-8">
        <h2 className="title_2 text-gray-500">개선제안</h2>
        <div className="grid grid-cols-2 gap-6">
          {MOCK_RESUME_RESULT.resume_suggestion.map((item, i) => (
            <article
              key={i}
              className="bg-white rounded-lg shadow-shadow-2 px-4 pt-6 pb-20 space-y-4"
            >
              <h4 className="subtitle_1 text-gray-700">{item.title}</h4>
              <p className="text-gray-500 body_1">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
