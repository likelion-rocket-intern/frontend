import React from "react";
import CapabilityCircle from "./CapabilityCircle";

interface AnalysisCirclesProps {
  leftCircleContent: React.ReactNode;
  centerCircleContent: React.ReactNode;
  rightCircleContent: React.ReactNode;
}

export default function AnalysisCircles({ leftCircleContent, centerCircleContent, rightCircleContent }: AnalysisCirclesProps) {
  return (
    <div className="relative flex justify-center items-center h-[588px]">
      <CapabilityCircle
        title="기업이 원하는 역량"
        className="absolute left-1/6 translate-x-[-50%] flex flex-col items-center"
      >
        {leftCircleContent}
      </CapabilityCircle>

      <CapabilityCircle
        title="나의 역량"
        className="absolute right-1/6 translate-x-[50%] flex flex-col items-center"
      >
        {rightCircleContent}
      </CapabilityCircle>

      {/* 가운데 큰 원 */}
      <div className="relative size-[588px] rounded-full border border-orange-500 bg-orange-300/15 flex justify-center items-center">
        {centerCircleContent}
      </div>
    </div>
  );
}
