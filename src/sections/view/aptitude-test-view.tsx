"use client";

import { useEffect, useState } from "react";
import client from "@/app/lib/client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    // 최상위 div 배경색 변경: 전체 배경을 #FBFBFB로 채웁니다.
    <div className="container mx-auto py-8 bg-[#FBFBFB] min-h-screen">
      {/* 제목과 설명을 감싸는 div 추가 (질문 카드와 동일한 너비) */}
      <div className="w-[1200px] mx-auto mb-8 pl-2">
        {/* w-[1200px]로 고정하고, mx-auto로 가운데 정렬 */}
        <h1
          className="font-semibold"
          style={{ fontSize: "32px", color: "#404040" }}
        >
          직업 가치관 검사
        </h1>
        {/* 설명 텍스트 추가 및 스타일 적용 */}
        <p
          className="mt-4 text-base"
          style={{ color: "#767676", fontSize: "16px" }}
        >
          직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치를 선택해
          주세요.
        </p>
      </div>

      <div className="space-y-6 flex flex-col items-center">
        {questions.map((q) => (
          // 문제 박스 (질문 카드) 테두리 색상 변경
          <Card
            key={q.qitemNo}
            className="p-6 w-[1200px] h-[222px] border border-[#F5F5F5]" // border와 border-[#F5F5F5] 추가
          >
            <div className="mb-4">
              <h3 className="flex items-center pl-18">
                <span
                  className="text-2xl font-semibold mr-2 font-bold"
                  style={{ color: "#505050", fontSize: "32px" }}
                >
                  {String(q.qitemNo).padStart(2, "0")}.
                </span>{" "}
                <span
                  className="text-base"
                  style={{ color: "#767676", fontSize: "28px" }}
                >
                  {q.question}
                </span>
              </h3>
            </div>

            <RadioGroup
              value={answers[q.qitemNo]}
              onValueChange={(value) => handleAnswerChange(q.qitemNo, value)}
              className="flex justify-center space-x-6"
            >
              {/* 첫 번째 선택지 카드 배경색 유지 */}
              <Card
                className="flex-1 p-4 flex items-center cursor-pointer min-w-[486px] max-w-[486px] min-h-[92px] max-h-[92px] bg-[#FBFBFB]"
                onClick={() => handleAnswerChange(q.qitemNo, q.answerScore01)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <RadioGroupItem
                    value={q.answerScore01}
                    id={`q${q.qitemNo}-1`}
                    className="mt-1"
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

              {/* 두 번째 선택지 카드 배경색 유지 */}
              <Card
                className="flex-1 p-4 flex items-center cursor-pointer min-w-[486px] max-w-[486px] min-h-[92px] max-h-[92px] bg-[#FBFBFB]"
                onClick={() => handleAnswerChange(q.qitemNo, q.answerScore02)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <RadioGroupItem
                    value={q.answerScore01}
                    id={`q${q.qitemNo}-1`}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`q${q.qitemNo}-1`}
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
        ))}
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
