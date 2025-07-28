"use client";

import { useEffect, useState, useRef } from "react";
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

const ITEMS_PER_PAGE = 10;

export default function AptitudeTestView() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlightUnanswered, setHighlightUnanswered] = useState<Set<number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 페이지 관련 계산
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);

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

    // 답변을 선택하면 하이라이트에서 제거
    setHighlightUnanswered((prev) => {
      const newSet = new Set(prev);
      newSet.delete(questionNo);
      return newSet;
    });
  };

  const formatAnswers = (answers: Record<number, string>): string => {
    return Object.entries(answers)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([qNo, score]) => `${qNo}=${score}`)
      .join(" ");
  };

  const handleNextPage = () => {
    // 현재 페이지의 미답변 문항 확인
    const currentPageUnanswered = currentQuestions
      .filter((q) => !answers[q.qitemNo])
      .map((q) => q.qitemNo);

    if (currentPageUnanswered.length > 0) {
      setHighlightUnanswered(new Set(currentPageUnanswered));

      // 가장 위에 있는 미답변 문항으로 스크롤
      const firstUnansweredQuestion = Math.min(...currentPageUnanswered);
      const targetElement = questionRefs.current[firstUnansweredQuestion];
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // 페이지 변경 시 스크롤을 최상단으로
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // 페이지 변경 시 스크롤을 최상단으로
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    // 전체 미답변 문항 확인
    const unansweredQuestions = questions
      .filter((q) => !answers[q.qitemNo])
      .map((q) => q.qitemNo);

    if (unansweredQuestions.length > 0) {
      // 미답변 문항이 있는 페이지로 이동
      const firstUnansweredQuestion = Math.min(...unansweredQuestions);
      const targetPage = Math.ceil(firstUnansweredQuestion / ITEMS_PER_PAGE);
      setCurrentPage(targetPage);

      setHighlightUnanswered(new Set(unansweredQuestions));

      // 잠시 후에 해당 문항으로 스크롤
      setTimeout(() => {
        const targetElement = questionRefs.current[firstUnansweredQuestion];
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

      return;
    }

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

  // 현재 페이지의 답변 완료 상태 확인
  const currentPageAnswered = currentQuestions.filter(
    (q) => answers[q.qitemNo]
  ).length;
  const isCurrentPageComplete = currentPageAnswered === currentQuestions.length;
  const isAllAnswered = questions.length === Object.keys(answers).length;

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

  return (
    <div className="container mx-auto py-8 bg-[#FBFBFB] min-h-screen">
      {/* 라디오 버튼 스타일 */}
      <style jsx global>{`
        button[role="radio"] {
          position: relative !important;
        }

        button[role="radio"] > span {
          display: none !important;
        }

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
        <h1 className="title_2 text-gray-600">직업 가치관 검사</h1>
      </div>

      <div className="space-y-6 flex flex-col items-center">
        {currentQuestions.map((q) => {
          const selected = answers[q.qitemNo];
          const isUnanswered = highlightUnanswered.has(q.qitemNo);

          return (
            <Card
              key={q.qitemNo}
              ref={(el) => {
                questionRefs.current[q.qitemNo] = el;
              }}
              className={cn(
                "p-6 w-[1200px] h-[222px] shadow-sm",
                isUnanswered
                  ? "border-2 border-[#FF6161] bg-[#FFF7F7]"
                  : "border border-[#F5F5F5]"
              )}
            >
              <div className="mb-4">
                <h3 className="flex items-center pl-18">
                  <span
                    className={cn(
                      "title_2 text-gray-600 mr-2",
                      isUnanswered ? "text-[#FF6161]" : ""
                    )}
                  >
                    {String(q.qitemNo).padStart(2, "0")}.
                  </span>{" "}
                  <span
                    className={cn(
                      "title_3 text-gray-500",
                      isUnanswered ? "text-[#FF6161]" : ""
                    )}
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
                    "flex-1 p-4 flex items-center cursor-pointer min-w-[486px] max-w-[486px] min-h-[92px] max-h-[92px] border",
                    isUnanswered
                      ? "bg-[#FFF7F7] border-[#FF6161]"
                      : selected === q.answerScore01
                      ? "bg-[#FFF1E7] border-[#FF9240]"
                      : "bg-[#FBFBFB] border-[#D9D9D9]"
                  )}
                  onClick={() => handleAnswerChange(q.qitemNo, q.answerScore01)}
                >
                  <div className="flex items-start space-x-4 w-full">
                    <RadioGroupItem
                      value={q.answerScore01}
                      id={`q${q.qitemNo}-1`}
                      className={cn(
                        "mt-1 border-2",
                        isUnanswered ? "border-[#FF6161]" : "border-gray-300",
                        "data-[state=checked]:bg-white",
                        "data-[state=checked]:border-[#FF9240]",
                        "relative"
                      )}
                    />
                    <Label
                      htmlFor={`q${q.qitemNo}-1`}
                      className="cursor-pointer text-left"
                    >
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "button_3 text-gray-700 mb-3",
                            isUnanswered ? "text-[#FF6161]" : ""
                          )}
                        >
                          {q.answer01}
                        </span>
                        {q.answer03 && (
                          <span
                            className={cn(
                              "body_2 text-gray-500",
                              isUnanswered ? "text-[#FF6161]" : ""
                            )}
                          >
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
                    "flex-1 p-4 flex items-center cursor-pointer min-w-[486px] max-w-[486px] min-h-[92px] max-h-[92px] border",
                    isUnanswered
                      ? "bg-[#FFF7F7] border-[#FF6161]"
                      : selected === q.answerScore02
                      ? "bg-[#FFF1E7] border-[#FF9240]"
                      : "bg-[#FBFBFB] border-[#D9D9D9]"
                  )}
                  onClick={() => handleAnswerChange(q.qitemNo, q.answerScore02)}
                >
                  <div className="flex items-start space-x-4 w-full">
                    <RadioGroupItem
                      value={q.answerScore02}
                      id={`q${q.qitemNo}-2`}
                      className={cn(
                        "mt-1 border-2",
                        isUnanswered ? "border-[#FF6161]" : "border-gray-300",
                        "data-[state=checked]:bg-white",
                        "data-[state=checked]:border-[#FF9240]",
                        "relative"
                      )}
                    />
                    <Label
                      htmlFor={`q${q.qitemNo}-2`}
                      className="cursor-pointer text-left"
                    >
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "button_3 text-gray-700 mb-3",
                            isUnanswered ? "text-[#FF6161]" : ""
                          )}
                        >
                          {q.answer02}
                        </span>
                        {q.answer04 && (
                          <span
                            className={cn(
                              "body_2 text-gray-500",
                              isUnanswered ? "text-[#FF6161]" : ""
                            )}
                          >
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

      {/* 상태 표시 바 */}
      <div className="w-[1200px] mx-auto mt-8 mb-4 flex items-center justify-between">
        {/* 이전 버튼 */}
        {currentPage > 1 ? (
          <Button
            onClick={handlePrevPage}
            className="bg-[#FF9240] hover:bg-[#e8823a] text-white rounded"
            style={{ width: "262px", height: "72px", fontSize: "24px" }}
          >
            ← 이전문항
          </Button>
        ) : (
          <div style={{ width: "262px" }}></div>
        )}

        <div className="flex items-center">
          <div className="text-[18px] text-[#767676] mr-4">
            <span
              className="font-bold"
              style={{ fontSize: "32px", color: "#505050" }}
            >
              {String(currentPageAnswered).padStart(2, "0")}
            </span>
            <span className="text-[#767676]" style={{ fontSize: "28px" }}>
              /{String(currentQuestions.length).padStart(2, "0")} 문항
            </span>
          </div>

          {currentPage < totalPages ? (
            <Button
              onClick={handleNextPage}
              className="bg-[#FF9240] hover:bg-[#e8823a] text-white rounded"
              style={{ width: "262px", height: "72px", fontSize: "24px" }}
            >
              다음문항 →
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#FF9240] hover:bg-[#e8823a] text-white rounded"
              style={{ width: "262px", height: "72px", fontSize: "24px" }}
            >
              {isSubmitting ? "제출 중..." : "검사 제출"}
            </Button>
          )}
        </div>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-[1200px] mx-auto mb-4" style={{ marginTop: "80px" }}>
        <div className="flex justify-center">
          <div className="flex" style={{ gap: "24px" }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-full",
                  index + 1 === currentPage ? "bg-[#FF9240]" : "bg-[#E5E5E5]"
                )}
                style={{
                  width: "180px",
                  height: "24px",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 - 더 이상 사용하지 않음 */}

      {/* 진행 상황 표시 */}
      <div className="text-center" style={{ marginTop: "40px" }}>
        <p className="text-gray-500">
          전체 진행률: {Object.keys(answers).length}/{questions.length}(
          {Math.round((Object.keys(answers).length / questions.length) * 100)}%)
        </p>
      </div>
    </div>
  );
}
