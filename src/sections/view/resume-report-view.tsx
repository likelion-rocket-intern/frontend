"use client";

import React, { useEffect, useState } from "react";
import client from "@/app/lib/client";
import { useParams } from "next/navigation";
import Link from "next/link";

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
    </div>
  );
}
