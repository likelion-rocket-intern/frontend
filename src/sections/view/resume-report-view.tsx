"use client";

import React, { useEffect, useState } from "react";
import client from "@/app/lib/client";
import { useParams } from "next/navigation";

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

async function getResumeDetail(resumeId: number): Promise<ResumeDetailResponse> {
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
  const [resumeDetail, setResumeDetail] = useState<ResumeDetailResponse | null>(null);
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
  const analysisResult = typeof resumeDetail?.analysis_result === 'string'
    ? JSON.parse(resumeDetail.analysis_result) as AnalysisResult
    : resumeDetail?.analysis_result as AnalysisResult;

  if (loading) return <div className="text-center py-10">불러오는 중...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!resumeDetail || !analysisResult) return <div className="text-center py-10">데이터가 없습니다.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8">이력서 결과 리포트</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-5">직무 적합도 TOP 8</h2>
        <ul className="space-y-6">
          {analysisResult.job_fitness.slice(0, 8).map((job, idx) => (
            <li
              key={job.name}
              className={`p-5 rounded-xl ${idx === 0 ? "bg-blue-50 shadow-md" : "bg-gray-100"}`}
            >
              <div className="flex items-center mb-2">
                <span
                  className={`font-bold text-lg ${idx === 0 ? "text-blue-600" : "text-gray-800"}`}
                >
                  {idx + 1}. {job.name}
                </span>
                <span className="ml-auto font-semibold text-blue-600 text-base">
                  {job.score.toFixed(2)}점
                </span>
              </div>
              <div className="text-gray-600 text-sm">{job.skill}</div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-5">이력서 평가</h2>
        <ul className="space-y-5">
          {analysisResult.resume_evaluation.map((item) => (
            <li
              key={item.attribute}
              className={`p-4 rounded-lg ${item.category === "장점" ? "bg-blue-50 border border-blue-200" : "bg-red-50 border border-red-200"
                }`}
            >
              <div className={`font-bold text-base ${item.category === "장점" ? "text-blue-600" : "text-red-600"
                } mb-1`}>
                {item.attribute}
                <span className="font-normal text-gray-500 text-sm ml-2">
                  ({item.score.toFixed(2)}점)
                </span>
              </div>
              <div className="text-gray-700 text-sm">{item.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
