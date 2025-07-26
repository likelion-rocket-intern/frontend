"use client";

import { useEffect, useState } from "react";
import client from "@/app/lib/client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Question {
  qitemNo: number;
  question: string;
  answer01: string;
  answer02: string;
  answer03: string;
  answer04: string;
  answerScore01: string;
  answerScore02: string;
}

interface TestResponse {
  SUCC_YN: string;
  ERROR_REASON: string;
  RESULT: Question[];
}

interface TestReportRequest {
  qestrnSeq: string;
  trgetSe: string;
  startDtm: number;
  answers: string;
}

interface TestReportResponse {
  success: boolean;
  result_id: number;
  message: string;
}

export default function AptitudeTestView() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data, error } = await (client.GET as any)(
          "/api/v1/jinro/test-questions-v1",
          {}
        );

        if (error) {
          setError("문제를 불러오는데 실패했습니다");
          return;
        }

        const response = data as TestResponse;

        if (response?.RESULT) {
          setQuestions(response.RESULT);
        }
      } catch (err) {
        setError("문제를 가져오는 중 오류가 발생했습니다");
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionNo: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNo]: value,
    }));
  };

  const formatAnswers = (answers: Record<number, string>): string => {
    return Object.entries(answers)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([qNo, score]) => `${qNo}=${score}`)
      .join(" ");
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const requestBody: TestReportRequest = {
        qestrnSeq: "6",
        trgetSe: "100208",
        startDtm: Date.now(),
        answers: formatAnswers(answers),
      };

      const { data, error } = (await client.POST(
        "/api/v1/jinro/test-report-v1",
        {
          body: requestBody,
        }
      )) as { data: TestReportResponse | undefined; error: any };

      if (data?.success && data.result_id) {
        router.push(`/aptitude/report/${data.result_id}`);
      } else {
        setError(data?.message || "결과 ID를 받지 못했습니다");
      }
    } catch (err) {
      setError("검사 결과 제출 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!questions.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        로딩중...
      </div>
    );
  }

  const isAllAnswered = questions.length === Object.keys(answers).length;

  return (
    <div className="container mx-auto py-8 bg-[#FBFBFB] min-h-screen">
      {/* 라디오 버튼 스타일 - 간단하게 수정 */}
      <style jsx global>{`
        /* 라디오 버튼 기본 설정 */
        button[role="radio"] {
          position: relative !important;
        }

        /* 기존 점들 숨기기 */
        button[role="radio"] > span {
          display: none !important;
        }

        /* 선택된 상태에서 중앙에 주황색 점 추가 */
        button[role="radio"][data-state="checked"]::before {
          content: "" !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          background-color: #ff9240 !important;
          display: block !important;
          z-index: 1 !important;
        }
      `}</style>

      <div className="w-[1200px] mx-auto mb-8 pl-2">
        <h1
          className="font-semibold"
          style={{ fontSize: "32px", color: "#404040" }}
        >
          직업 가치관 검사
        </h1>
        <p className="mt-4 text-base text-[#767676] text-[16px]">
          직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치를 선택해
          주세요.
        </p>
      </div>

      <div className="space-y-6 flex flex-col items-center">
        {questions.map((q) => {
          const selected = answers[q.qitemNo];

          return (
            <Card
              key={q.qitemNo}
              className="p-6 w-[1200px] h-[222px] border border-[#F5F5F5] shadow-sm"
            >
              <div className="mb-4">
                <h3 className="flex items-center pl-18">
                  <span
                    className="text-2xl font-semibold mr-2 font-bold text-[#505050]"
                    style={{ fontSize: "32px" }}
                  >
                    {String(q.qitemNo).padStart(2, "0")}.
                  </span>{" "}
                  <span
                    className="text-base text-[#767676]"
                    style={{ fontSize: "28px" }}
                  >
                    {q.question}
                  </span>
                </h3>
              </div>

              <RadioGroup
                value={selected}
                onValueChange={(value) => handleAnswerChange(q.qitemNo, value)}
                className="flex justify-center space-x-6"
              >
                {/* First Choice */}
                <Card
                  className={cn(
                    "flex-1 p-4 flex items-center cursor-pointer min-w-[486px] max-w-[486px] min-h-[92px] max-h-[92px] border shadow-sm",
                    selected === q.answerScore01
                      ? "bg-[#FFF1E7] border-[#FF9240]"
                      : "bg-[#FBFBFB] border-[#F5F5F5]"
                  )}
                  onClick={() => handleAnswerChange(q.qitemNo, q.answerScore01)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <RadioGroupItem
                      value={q.answerScore01}
                      id={`q${q.qitemNo}-1`}
                      className={cn(
                        "mt-1 border-2",
                        "border-gray-300",
                        "data-[state=checked]:bg-white",
                        "data-[state=checked]:border-[#FF9240]",
                        // 기본 설정만 유지
                        "relative"
                      )}
                    />
                    <Label
                      htmlFor={`q${q.qitemNo}-1`}
                      className="cursor-pointer text-left"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-[24px] text-[#404040] mb-1">
                          {q.answer01}
                        </span>
                        {q.answer03 && (
                          <span className="text-[16px] text-[#767676]">
                            {q.answer03}
                          </span>
                        )}
                      </div>
                    </Label>
                  </div>
                </Card>

                {/* Second Choice */}
                <Card
                  className={cn(
                    "flex-1 p-4 flex items-center cursor-pointer min-w-[486px] max-w-[486px] min-h-[92px] max-h-[92px] border shadow-sm",
                    selected === q.answerScore02
                      ? "bg-[#FFF1E7] border-[#FF9240]"
                      : "bg-[#FBFBFB] border-[#F5F5F5]"
                  )}
                  onClick={() => handleAnswerChange(q.qitemNo, q.answerScore02)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <RadioGroupItem
                      value={q.answerScore02}
                      id={`q${q.qitemNo}-2`}
                      className={cn(
                        "mt-1 border-2",
                        "border-gray-300",
                        "data-[state=checked]:bg-white",
                        "data-[state=checked]:border-[#FF9240]",
                        // 기본 설정만 유지
                        "relative"
                      )}
                    />
                    <Label
                      htmlFor={`q${q.qitemNo}-2`}
                      className="cursor-pointer text-left"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-[24px] text-[#404040] mb-1">
                          {q.answer02}
                        </span>
                        {q.answer04 && (
                          <span className="text-[16px] text-[#767676]">
                            {q.answer04}
                          </span>
                        )}
                      </div>
                    </Label>
                  </div>
                </Card>
              </RadioGroup>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!isAllAnswered || isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "검사 제출"}
        </Button>
      </div>

      {!isAllAnswered && (
        <p className="text-center mt-4 text-gray-500">
          모든 문항에 답변해주세요. ({Object.keys(answers).length}/
          {questions.length})
        </p>
      )}
    </div>
  );
}
