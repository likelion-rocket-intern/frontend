"use client";

import { useEffect, useState, use } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import client from "@/app/lib/client";
import { ChevronDown, ChevronUp } from "lucide-react";
import mockData from "./mock";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface TestResult {
  id: number;
  user_id: number;
  version: string;
  created_at: string;
  jinro_results: Array<{
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
    first_job: {
      id: number;
      job_type: string;
      job_name_ko: string;
      description: string | null;
      stability: number;
      creativity: number;
      social_service: number;
      ability_development: number;
      conservatism: number;
      social_recognition: number;
      autonomy: number;
      self_improvement: number;
    };
    first_job_score: number;
    second_job_id: number;
    second_job: {
      id: number;
      job_type: string;
      job_name_ko: string;
      description: string | null;
      stability: number;
      creativity: number;
      social_service: number;
      ability_development: number;
      conservatism: number;
      social_recognition: number;
      autonomy: number;
      self_improvement: number;
    };
    second_job_score: number;
    third_job_id: number;
    third_job: {
      id: number;
      job_type: string;
      job_name_ko: string;
      description: string | null;
      stability: number;
      creativity: number;
      social_service: number;
      ability_development: number;
      conservatism: number;
      social_recognition: number;
      autonomy: number;
      self_improvement: number;
    };
    third_job_score: number;
    created_at: string;
  }>;
}

interface DevRole {
  name: string;
  rank: number;
  similarity: number;
  description: string | null;
  job_type: string;
  characteristics: {
    category: string;
    value: number;
  }[];
}

const ROLE_COLORS = {
  1: {
    stroke: "#ff6b00",
    fill: "#ff6b00",
  },
  2: {
    stroke: "#22c55e",
    fill: "#22c55e",
  },
  3: {
    stroke: "#eab308",
    fill: "#eab308",
  },
} as const;

// TODO: 이미지 추가 예정
/*const JOB_IMAGES: { [key: string]: string } = {
  'marketer': '/images/job-icons/marketer.png',
  'app_developer': '/images/job-icons/app-developer.png',
  'embedded_developer': '/images/job-icons/embedded-developer.png',
  // 다른 직군 이미지들도 추가
};*/

export default function AptitudeReportPage({ params }: PageProps) {
  const { id } = use(params);
  const [report, setReport] = useState<TestResult | null>(null);
  const [devRoles, setDevRoles] = useState<DevRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<DevRole | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const { data, error } = await (client.GET as any)(
          `/api/v1/jinro/${id}`,
          {}
        );

        if (error) {
          setError("결과를 불러오는데 실패했습니다");
          return;
        }

        setReport(data);
      } catch (err) {
        setError("결과를 가져오는 중 오류가 발생했습니다");
      }
    }

    fetchReport();
  }, [id]);

  useEffect(() => {
    if (report) {
      const result = report.jinro_results[0];
      const roles: DevRole[] = [
        {
          name: result.first_job.job_name_ko,
          rank: 1,
          similarity: result.first_job_score,
          description: result.first_job.description,
          job_type: result.first_job.job_type,
          characteristics: [
            {
              category: "능력발휘",
              value: result.first_job.ability_development,
            },
            { category: "자율성", value: result.first_job.autonomy },
            { category: "보수", value: result.first_job.conservatism },
            { category: "안정성", value: result.first_job.stability },
            {
              category: "사회적 인정",
              value: result.first_job.social_recognition,
            },
            { category: "사회봉사", value: result.first_job.social_service },
            { category: "자기계발", value: result.first_job.self_improvement },
            { category: "창의성", value: result.first_job.creativity },
          ],
        },
        {
          name: result.second_job.job_name_ko,
          rank: 2,
          similarity: result.second_job_score,
          description: result.second_job.description,
          job_type: result.second_job.job_type,
          characteristics: [
            {
              category: "능력발휘",
              value: result.second_job.ability_development,
            },
            { category: "자율성", value: result.second_job.autonomy },
            { category: "보수", value: result.second_job.conservatism },
            { category: "안정성", value: result.second_job.stability },
            {
              category: "사회적 인정",
              value: result.second_job.social_recognition,
            },
            { category: "사회봉사", value: result.second_job.social_service },
            { category: "자기계발", value: result.second_job.self_improvement },
            { category: "창의성", value: result.second_job.creativity },
          ],
        },
        {
          name: result.third_job.job_name_ko,
          rank: 3,
          similarity: result.third_job_score,
          description: result.third_job.description,
          job_type: result.third_job.job_type,
          characteristics: [
            {
              category: "능력발휘",
              value: result.third_job.ability_development,
            },
            { category: "자율성", value: result.third_job.autonomy },
            { category: "보수", value: result.third_job.conservatism },
            { category: "안정성", value: result.third_job.stability },
            {
              category: "사회적 인정",
              value: result.third_job.social_recognition,
            },
            { category: "사회봉사", value: result.third_job.social_service },
            { category: "자기계발", value: result.third_job.self_improvement },
            { category: "창의성", value: result.third_job.creativity },
          ],
        },
      ];

      setDevRoles(roles);
    }
  }, [report]);

  // 기본값으로 첫 번째 직군 선택
  useEffect(() => {
    if (devRoles.length > 0 && !selectedRole) {
      setSelectedRole(devRoles[0]);
    }
  }, [devRoles, selectedRole]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!report) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        로딩중...
      </div>
    );
  }

  // 가치관 점수 순으로 정렬
  const result = report.jinro_results[0];
  const sortedValues = [
    {
      code: "ability",
      name: "능력발휘",
      score: result.ability_development_score,
    },
    { code: "autonomy", name: "자율성", score: result.autonomy_score },
    { code: "conservatism", name: "보수", score: result.conservatism_score },
    { code: "stability", name: "안정성", score: result.stability_score },
    {
      code: "social",
      name: "사회적 인정",
      score: result.social_recognition_score,
    },
    { code: "service", name: "사회봉사", score: result.social_service_score },
    {
      code: "improvement",
      name: "자기계발",
      score: result.self_improvement_score,
    },
    { code: "creativity", name: "창의성", score: result.creativity_score },
  ].sort((a, b) => b.score - a.score);

  // 레이더 차트 데이터 준비
  const chartData = sortedValues.map((value) => ({
    category: value.name,
    user: value.score,
    role:
      selectedRole?.characteristics.find((c) => c.category === value.name)
        ?.value || 0,
  }));

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* 추천직군 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">추천직군</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1위 직무 이미지 */}
          <div className="bg-gray-600 rounded-lg p-6 text-center">
            <h3 className="text-white text-xl mb-4">
              {selectedRole ? `${selectedRole.rank}위 직무` : "1위 직무"}
            </h3>
            <div className="w-48 h-48 mx-auto bg-[#FAF6E9] rounded-lg p-4 relative">
              <Image
                src="/images/lion.png"
                alt={`${selectedRole?.name || '직무'} 아이콘`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 추천 직군 리스트 */}
          <div className="bg-white rounded-lg shadow-sm min-h-[380px]">
            <div className="p-4">
              <h3 className="text-xl font-medium mb-2">추천직군</h3>
              <p className="text-gray-500 text-sm">
                가치관 유사도 기반 추천 순위입니다.
              </p>
            </div>
            <div className="divide-y">
              {devRoles.map((role, index) => (
                <div key={role.name}>
                  <div
                    className={`flex items-center justify-between px-6 py-3 hover:bg-gray-50 cursor-pointer ${
                      selectedRole?.name === role.name ? "bg-gray-50" : ""
                    }`}
                    onClick={() => {
                      setSelectedRole(role);
                      setExpandedRole(expandedRole === index ? null : index);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xl ${
                          index === 0
                            ? "text-[#ff6b00]"
                            : index === 1
                            ? "text-[#22c55e]"
                            : "text-[#eab308]"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-gray-900">{role.name}</span>
                    </div>
                    {expandedRole === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div
                    className={`px-6 bg-gray-50 transition-all duration-300 ease-in-out ${
                      expandedRole === index ? "py-3 h-[90px]" : "h-0"
                    } overflow-hidden`}
                  >
                    <h4 className="text-sm text-gray-500 mb-1">직무설명</h4>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 적성검사 결과 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">적성검사 결과</h2>
        <div className="bg-white rounded-lg p-6">
          <div className="w-full h-[400px]">
            {" "}
            {/* 높이 고정값으로 변경 */}
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis domain={[0, 5]} tickCount={6} tick={false} />
                <Radar
                  name="검사결과"
                  dataKey="user"
                  stroke="#4A72FF"
                  fill="#4A72FF"
                  fillOpacity={0.3}
                />
                <Radar
                  name={selectedRole?.name || "직군평균"}
                  dataKey="role"
                  stroke={
                    selectedRole
                      ? ROLE_COLORS[
                          selectedRole.rank as keyof typeof ROLE_COLORS
                        ].stroke
                      : "#FF8F5C"
                  }
                  fill={
                    selectedRole
                      ? ROLE_COLORS[
                          selectedRole.rank as keyof typeof ROLE_COLORS
                        ].fill
                      : "#FF8F5C"
                  }
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4 h-[40px] items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4A72FF]" />
              <span>본인결과</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: selectedRole
                    ? ROLE_COLORS[selectedRole.rank as keyof typeof ROLE_COLORS]
                        .fill
                    : "#FF8F5C",
                }}
              />
              <span>{selectedRole?.name || "직군평균"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 가치관 설명 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">가치관 설명</h2>
        {/* 요약 박스 */}
        <div className="bg-gray-50 rounded-lg p-8 mb-6">
          <p className="text-center text-lg">
            직업생활과 관련하여
            <span className="text-[#ff6b00] font-medium">
              {sortedValues[0].name}
            </span>
            (와)과
            <span className="text-[#ff6b00] font-medium">
              {sortedValues[1].name}
            </span>
            (을)를 가장 중요하게 생각합니다.
            <br />
            반면에
            <span className="text-[#4A72FF] font-medium">
              {sortedValues[6].name}
            </span>
            ,
            <span className="text-[#4A72FF] font-medium">
              {sortedValues[7].name}
            </span>
            은 상대적으로 덜 중요하게 생각합니다.
          </p>
        </div>

        {/* 가치관 카드 리스트 */}
        <div className="space-y-4">
          {sortedValues.map((value, index) => {
            const realmData = mockData.realms.find(
              (realm) => realm.name === value.name
            );
            if (!realmData) return null;

            return (
              <div
                key={value.code}
                className={`border rounded-lg ${
                  index < 2
                    ? "border-[#FFA172]" // 상위 2개는 오렌지색
                    : index >= sortedValues.length - 2
                    ? "border-[#4A72FF]" // 하위 2개는 파란색
                    : "border-gray-200" // 나머지는 기본 회색
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xl font-medium">{index + 1}</span>
                    <span className="text-xl">{value.name}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex">
                      <div className="bg-gray-50 w-[100px] p-3 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">특징</span>
                      </div>
                      <div className="flex-1 p-3">
                        <span>{realmData.dc}</span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-gray-50 w-[100px] p-3 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">직업선택</span>
                      </div>
                      <div className="flex-1 p-3">
                        <span>{realmData.choice}</span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-gray-50 w-[100px] p-3 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">직업생활</span>
                      </div>
                      <div className="flex-1 p-3">
                        <span>{realmData.life}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
