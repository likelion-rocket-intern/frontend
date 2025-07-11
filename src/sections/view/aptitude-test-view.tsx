'use client';

import { useEffect, useState } from 'react';
import client from '@/app/lib/client';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

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

export default function AptitudeTestView() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data, error } = await (client.GET as any)('/api/v1/jinro/test-questions-v1', {});

        if (error) {
          setError('문제를 불러오는데 실패했습니다');
          return;
        }

        const response = data as TestResponse;
        if (response?.RESULT) {
          setQuestions(response.RESULT);
        }
      } catch (err) {
        setError('문제를 가져오는 중 오류가 발생했습니다');
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionNo: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNo]: value
    }));
  };

  const formatAnswers = (answers: Record<number, string>): string => {
    return Object.entries(answers)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([qNo, score]) => `${qNo}=${score}`)
      .join(' ');
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // 백엔드 구현 전까지는 API 호출 없이 바로 결과 페이지로 이동
      // router.push('/aptitude/report/test-report-1');

      const requestBody: TestReportRequest = {
        qestrnSeq: "6",
        trgetSe: "100208",
        startDtm: Date.now(),
        answers: formatAnswers(answers)
      };

      // const { data, error } = await (client.POST as any)('/api/v1/jinro/test-report-v1', {
      //   body: requestBody
      // });

      const { data, error } = await client.POST('/api/v1/jinro/test-report-v1', {
        body: requestBody
      });

      if (error) {
        setError('검사 결과 제출에 실패했습니다');
        return;
      }

      if (data?.result_id) {
        router.push(`/aptitude/report/${data.result_id}`);
      } else {
        setError('결과 ID를 받지 못했습니다');
      }

    } catch (err) {
      setError('검사 결과 제출 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!questions.length) {
    return <div className="flex justify-center items-center min-h-screen">로딩중...</div>;
  }

  const isAllAnswered = questions.length === Object.keys(answers).length;

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-8 text-center">직업 가치관 검사</h1>

      <div className="space-y-6">
        {questions.map((q) => (
          <Card key={q.qitemNo} className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {q.qitemNo}. {q.question}
              </h3>
            </div>

            <RadioGroup
              value={answers[q.qitemNo]}
              onValueChange={(value) => handleAnswerChange(q.qitemNo, value)}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={q.answerScore01} id={`q${q.qitemNo}-1`} />
                <Label htmlFor={`q${q.qitemNo}-1`} className="leading-tight">
                  <div className="font-medium">{q.answer01}</div>
                  <div className="text-sm text-gray-500">{q.answer03}</div>
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <RadioGroupItem value={q.answerScore02} id={`q${q.qitemNo}-2`} />
                <Label htmlFor={`q${q.qitemNo}-2`} className="leading-tight">
                  <div className="font-medium">{q.answer02}</div>
                  <div className="text-sm text-gray-500">{q.answer04}</div>
                </Label>
              </div>
            </RadioGroup>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!isAllAnswered || isSubmitting}
          className="px-8 py-2"
        >
          {isSubmitting ? '제출 중...' : '검사 제출'}
        </Button>
      </div>

      {!isAllAnswered && (
        <p className="text-center mt-4 text-gray-500">
          모든 문항에 답변해주세요. ({Object.keys(answers).length}/{questions.length})
        </p>
      )}
    </div>
  );
}
