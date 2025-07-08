"use client";

import SplitCard from "@/components/SplitCard";
import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";

export default function HomepageView() {
  const router = useRouter();

  return (
    <div className="flex gap-6">
      <SplitCard
        cardTitle="적성검사"
        cardDescription={
          <p>
            나는 어떤 능력의 사람일까요? <br />
            적성검사를 통해 나를 알아보아요~
          </p>
        }
        cardActionText="적성검사하기"
        cardAction={() => router.push(paths.aptitude.test)}
      />
      <SplitCard
        cardTitle="이력서 분석"
        cardDescription={
          <p>
            이력서를 자동 분석하여 <br />
            나와 맞는 직무를 추천해 드려요!
          </p>
        }
        cardActionText="이력서 분석하기"
        cardAction={() => router.push(paths.resume.upload)}
      />
    </div>
  );
}
