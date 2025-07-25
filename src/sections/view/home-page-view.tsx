"use client";

import SplitCard from "@/components/SplitCard";
import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";

export default function HomepageView() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-8">
      {/* Added responsive flex and centering */}
      <SplitCard
        cardTitle="적성검사"
        cardDescription={
          <p>
            나는 어떤 능력의 사람일까요? <br />
            적성검사를 통해 나를 알아보아요~
          </p>
        }
        cardActionText="적성검사 바로 가기"
        cardAction={() => router.push(paths.aptitude.test)}
        cardIconSrc="/images/home_jinro.svg" // Path to the aptitude test icon
      />
      <SplitCard
        cardTitle="이력서 분석"
        cardDescription={
          <p>
            이력서를 자동 분석하여 <br />
            나와 맞는 직무를 추천해 드려요!
          </p>
        }
        cardActionText="이력서 분석 바로 가기"
        cardAction={() => router.push(paths.resume.upload)}
        cardIconSrc="/images/home_resume.svg" // Path to the resume analysis icon
      />
    </div>
  );
}
