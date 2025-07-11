"use client";

import React, { useEffect, useState } from "react";
import client from "@/app/lib/client";
import { useParams } from "next/navigation";

const mockData = {
  job_fitness: [
    {
      name: "데이터 엔지니어",
      score: 22.14,
      skill:
        "데이터가 원활하게 흐르는 파이프라인을 구축하고 관리하여, 방대한 양의 원석 같은 데이터를 분석가나 AI 모델이 사용할 수 있는 보석으로 가공하는 데이터의 연금술사입니다.",
    },
    {
      name: "앱 개발자",
      score: 16.33,
      skill:
        "Kotlin, Swift, Flutter 등 다양한 기술을 사용하여 사용자의 손안에 있는 스마트폰 세상에서 가장 직관적이고 빠른 경험을 제공하는 모바일 전문가입니다.",
    },
    {
      name: "클라우드 엔지니어",
      score: 14.14,
      skill:
        "AWS Well-Architected Framework를 기반으로 기존 클라우드 아키텍처를 진단하고, 보안, 안정성, 비용 효율성 측면에서 개선 과제를 도출하고 실행했습니다.",
    },
    {
      name: "사업개발 매니저",
      score: 12.9,
      skill:
        "SaaS 제품의 가격 정책(Pricing)을 재설계하고, 세일즈 파이프라인을 구축하여 B2B 고객 확보 및 월간 반복 매출(MRR)을 200% 성장시켰습니다.",
    },
    {
      name: "프론트엔드 개발자",
      score: 9.39,
      skill:
        "PWA(Progressive Web App) 기술을 적용하여 웹 애플리케이션에 오프라인 기능과 푸시 알림을 구현, 네이티브 앱 수준의 사용자 경험을 제공했습니다.",
    },
    {
      name: "데브옵스 & 인프라",
      score: 9.19,
      skill:
        "Docker를 사용하여 애플리케이션을 컨테이너화하고, Kubernetes를 통해 컨테이너 오케스트레이션을 수행하여 MSA 환경을 관리합니다.",
    },
    {
      name: "AI 개발자",
      score: 7.98,
      skill:
        "OpenCV를 활용하여 실시간 영상 스트림에서 특정 객체를 추적하거나, 이미지 전처리 파이프라인을 구축하여 모델 학습 데이터의 품질을 향상시킵니다.",
    },
    {
      name: "마케터",
      score: 7.92,
      skill:
        "검색 엔진 최적화(SEO)를 통해 오가닉 트래픽을 증대시키고, 콘텐츠 마케팅을 통해 잠재 고객을 발굴합니다.",
    },
  ],
  resume_evaluation: [
    {
      score: 12.03,
      category: "단점",
      attribute: "경험의 구체성 및 깊이 부족",
      description:
        "사용한 기술을 단순 나열하는 데 그쳐, 각 기술을 '어떤 문제를 해결하기 위해', '어느 정도 깊이로' 사용했는지에 대한 구체적인 경험과 고민이 드러나지 않습니다.",
    },
    {
      score: 10.84,
      category: "단점",
      attribute: "반복적인 표현 사용",
      description:
        "유사한 경험이나 역량을 여러 항목에서 반복적으로 기술하여, 이력서 전반의 임팩트가 약화되고 강점이 명확하게 드러나지 않습니다.",
    },
    {
      score: 10.3,
      category: "단점",
      attribute: "안정성 및 운영 경험 부족",
      description:
        "실제 사용자가 있는 서비스를 상용 환경에서 운영하며 장애 대응, 성능 모니터링, 데이터 백업 등을 경험해 본 사례가 부족하여 안정성에 대한 신뢰가 부족합니다.",
    },
    {
      score: 9.89,
      category: "단점",
      attribute: "비즈니스 이해도",
      description:
        "기술 구현 자체에 집중한 나머지, 해당 기능이 비즈니스 목표에 어떻게 기여하는지에 대한 이해와 고민이 부족했던 경우가 있습니다.",
    },
    {
      score: 9.56,
      category: "단점",
      attribute: "실무 운영 경험 부족",
      description:
        "개인 프로젝트나 토이 프로젝트 경험은 다수 있으나, 실제 사용자가 있는 서비스를 상용 환경에서 배포하고 운영해 본 경험이 부족합니다.",
    },
    {
      score: 9.45,
      category: "단점",
      attribute: "경험 구체성 부족",
      description:
        "이력서에 다양한 기술 스택을 나열했지만, 각 기술을 어떤 문제 해결을 위해, 어느 정도 깊이로 사용했는지에 대한 구체적인 경험 서술이 미흡합니다.",
    },
    {
      score: 7.87,
      category: "단점",
      attribute: "성장에 대한 의지 부족",
      description:
        "과거의 경험을 통해 무엇을 배웠고, 어떤 점이 부족했으며, 앞으로 어떻게 성장하고 싶은지에 대한 성찰과 포부가 드러나지 않습니다.",
    },
    {
      score: 7.85,
      category: "단점",
      attribute: "성과 강조 부족",
      description:
        "프로젝트의 결과나 성과를 제시할 때, '매출 N% 상승' 이나 '응답 시간 Xms 단축'과 같은 수치적, 구체적 표현이 부족한 경향이 있습니다.",
    },
    {
      score: 7.8,
      category: "단점",
      attribute: "기술 스택의 편향성",
      description:
        "하나의 언어나 프레임워크에 대한 경험만 강조되어, 새로운 기술에 대한 학습 능력이나 다양한 문제 상황에 대한 유연한 대처 능력이 부족해 보일 수 있습니다.",
    },
    {
      score: 7.37,
      category: "단점",
      attribute: "성과 정량화 미흡",
      description:
        "프로젝트의 결과가 '성공적으로 완료함'과 같이 추상적으로 서술되어, 기여도를 객관적으로 파악할 수 있는 구체적인 수치나 데이터가 부족합니다.",
    },
    {
      score: 7.05,
      category: "단점",
      attribute: "자기소개서 내용 미흡",
      description:
        "자기소개서의 내용이 추상적이거나 일반적인 이야기 위주로 구성되어, 지원자 본인의 차별화된 강점과 직무에 대한 기여 의지가 잘 드러나지 않습니다.",
    },
  ],
};

type ResumeDetailResponse = {
  id: number;
  user_id: number;
  version: string;
  original_filename?: string;
  upload_filename?: string;
  file_url?: string;
  file_path?: string;
  analysis_result: string | Record<string, any>;
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

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8">이력서 결과 리포트</h1>

      {resumeId && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            서버 이력서 상세 정보
          </h2>
          {loading && <div className="text-blue-500">불러오는 중...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {resumeDetail && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2">
              <div className="text-sm text-gray-600">ID: {resumeDetail.id}</div>
              <div className="text-sm text-gray-600">
                User ID: {resumeDetail.user_id}
              </div>
              <div className="text-sm text-gray-600">
                Version: {resumeDetail.version}
              </div>
              <div className="text-sm text-gray-600">
                File Path: {resumeDetail.file_path || resumeDetail.file_url}
              </div>
              <div className="text-sm text-gray-600">
                Created At: {resumeDetail.created_at}
              </div>
              <div className="text-sm text-gray-800 mt-2">
                분석 결과: {typeof resumeDetail.analysis_result === 'string'
                  ? resumeDetail.analysis_result
                  : JSON.stringify(resumeDetail.analysis_result, null, 2)}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-5">직무 적합도 TOP 8</h2>
        <ul className="space-y-6">
          {mockData.job_fitness.map((job, idx) => (
            <li
              key={job.name}
              className={`p-5 rounded-xl ${idx === 0 ? "bg-blue-50 shadow-md" : "bg-gray-100"
                }`}
            >
              <div className="flex items-center mb-2">
                <span
                  className={`font-bold text-lg ${idx === 0 ? "text-blue-600" : "text-gray-800"
                    }`}
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
        <h2 className="text-xl font-semibold mb-5">이력서 평가 (단점)</h2>
        <ul className="space-y-5">
          {mockData.resume_evaluation.map((item) => (
            <li
              key={item.attribute}
              className="p-4 rounded-lg bg-red-50 border border-red-200"
            >
              <div className="font-bold text-base text-red-600 mb-1">
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
