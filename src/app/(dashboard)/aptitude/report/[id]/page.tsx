'use client';

import { useEffect, useState, use } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip, ResponsiveContainer } from "recharts";
import client from '@/app/lib/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface TestResult {
  id: number;
  user_id: number;
  version: string;
  test: {
    SUCC_YN: string;
    ERROR_REASON: string;
    RESULT: Array<{
      question: string;
      answer01: string;
      answer02: string;
      answer03: string;
      answer04: string;
      answerScore01: string;
      answerScore02: string;
      qitemNo: number;
    }>;
  };
  test_result: {
    inspctseq: string;
    qestnrseq: string;
    target: string;
    targetcd: string;
    comptdtm: string;
    code1: string;
    code1nm: string;
    w1: number;
    code2: string;
    code2nm: string;
    w2: number;
    code3: string;
    code3nm: string;
    w3: number;
    code4: string;
    code4nm: string;
    w4: number;
    code5: string;
    code5nm: string;
    w5: number;
    code6: string;
    code6nm: string;
    w6: number;
    code7: string;
    code7nm: string;
    w7: number;
    code8: string;
    code8nm: string;
    w8: number;
    report6_data: {
      realms: Array<{
        code: string;
        name: string;
        dc: string;
        choice: string;
        life: string;
        class: string;
      }>;
    };
  };
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
  characteristics: {
    category: string;
    value: number;
  }[];
}

const ROLE_COLORS = {
  1: "#ff6b00", // 주황색
  2: "#22c55e", // 초록색
  3: "#eab308", // 노란색
} as const;

export default function AptitudeReportPage({ params }: PageProps) {
  const { id } = use(params);
  const [report, setReport] = useState<TestResult | null>(null);
  const [devRoles, setDevRoles] = useState<DevRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<DevRole | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const { data, error } = await (client.GET as any)(`/api/v1/jinro/${id}`, {});

        if (error) {
          setError('결과를 불러오는데 실패했습니다');
          return;
        }

        setReport(data);
      } catch (err) {
        setError('결과를 가져오는 중 오류가 발생했습니다');
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
          characteristics: [
            { category: "능력발휘", value: result.first_job.ability_development },
            { category: "자율성", value: result.first_job.autonomy },
            { category: "보수", value: result.first_job.conservatism },
            { category: "안정성", value: result.first_job.stability },
            { category: "사회적 인정", value: result.first_job.social_recognition },
            { category: "사회봉사", value: result.first_job.social_service },
            { category: "자기계발", value: result.first_job.self_improvement },
            { category: "창의성", value: result.first_job.creativity }
          ]
        },
        {
          name: result.second_job.job_name_ko,
          rank: 2,
          similarity: result.second_job_score,
          characteristics: [
            { category: "능력발휘", value: result.second_job.ability_development },
            { category: "자율성", value: result.second_job.autonomy },
            { category: "보수", value: result.second_job.conservatism },
            { category: "안정성", value: result.second_job.stability },
            { category: "사회적 인정", value: result.second_job.social_recognition },
            { category: "사회봉사", value: result.second_job.social_service },
            { category: "자기계발", value: result.second_job.self_improvement },
            { category: "창의성", value: result.second_job.creativity }
          ]
        },
        {
          name: result.third_job.job_name_ko,
          rank: 3,
          similarity: result.third_job_score,
          characteristics: [
            { category: "능력발휘", value: result.third_job.ability_development },
            { category: "자율성", value: result.third_job.autonomy },
            { category: "보수", value: result.third_job.conservatism },
            { category: "안정성", value: result.third_job.stability },
            { category: "사회적 인정", value: result.third_job.social_recognition },
            { category: "사회봉사", value: result.third_job.social_service },
            { category: "자기계발", value: result.third_job.self_improvement },
            { category: "창의성", value: result.third_job.creativity }
          ]
        }
      ];

      setDevRoles(roles);
      setSelectedRole(roles[0]); // 기본값으로 1순위 선택
    }
  }, [report]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!report) {
    return <div className="flex justify-center items-center min-h-screen">로딩중...</div>;
  }

  // 가치관 점수 순으로 정렬
  const result = report.jinro_results[0];
  const sortedValues = [
    { code: "ability", name: "능력발휘", score: result.ability_development_score },
    { code: "autonomy", name: "자율성", score: result.autonomy_score },
    { code: "conservatism", name: "보수", score: result.conservatism_score },
    { code: "stability", name: "안정성", score: result.stability_score },
    { code: "social", name: "사회적 인정", score: result.social_recognition_score },
    { code: "service", name: "사회봉사", score: result.social_service_score },
    { code: "improvement", name: "자기계발", score: result.self_improvement_score },
    { code: "creativity", name: "창의성", score: result.creativity_score }
  ].sort((a, b) => b.score - a.score);

  // 레이더 차트 데이터 준비
  const chartData = sortedValues.map(value => ({
    category: value.name,
    user: value.score,
    role: selectedRole?.characteristics.find(c => c.category === value.name)?.value || 0
  }));

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-8 text-center">직업 가치관 검사 결과</h1>

      <div className="space-y-8">
        {/* 가치관 레이더 차트 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 왼쪽: 레이더 차트 */}
          <Card>
            <CardContent className="">
              <div className="w-full aspect-square max-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 5]} tickCount={6} tick={false} />
                    <Radar
                      name="내 가치관 점수"
                      dataKey="user"
                      stroke="#2563eb"
                      fill="transparent"
                      strokeWidth={2}
                    />
                    <Radar
                      name={selectedRole?.name}
                      dataKey="role"
                      stroke={selectedRole ? ROLE_COLORS[selectedRole.rank as keyof typeof ROLE_COLORS] : "#2563eb"}
                      fill="transparent"
                      strokeWidth={2}
                    />
                    <Tooltip
                      formatter={(value: number) => value.toFixed(1) + '점'}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 오른쪽: 개발자 직군 순위 */}
          <Card className="p-3">
            <CardHeader className="p-2">
              <CardTitle className="text-lg font-bold">추천 개발자 직군</CardTitle>
              <CardDescription>가치관 유사도 기반 추천 순위입니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-2">
              {devRoles.map((role) => (
                <div
                  key={role.name}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all hover:bg-slate-50 ${selectedRole?.name === role.name ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                    }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium" style={{ color: ROLE_COLORS[role.rank as keyof typeof ROLE_COLORS] }}>{role.rank}.</span>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{role.name}</span>
                        {role.rank === 1 && <span className="text-yellow-500">★</span>}
                      </div>
                      <span className="text-sm text-gray-500">유사도 {role.similarity.toFixed(1)}%</span>
                    </div>
                  </div>
                  {selectedRole?.name === role.name && (
                    <span className="text-xs text-blue-500">차트에 표시 중</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 가치관 설명 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">가치관 설명</h2>
          <div className="space-y-4">
            {report.test_result.report6_data.realms.map((realm) => (
              <div key={realm.code} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-2">{realm.name}</h3>
                <div className="space-y-2 text-gray-600">
                  <p>{realm.dc}</p>
                  <p>{realm.choice}</p>
                  <p>{realm.life}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 