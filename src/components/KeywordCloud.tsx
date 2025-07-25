import clsx from "clsx";

interface KeywordCloudProps {
  keywords: string[];
  isAnalyzed: boolean;
}

// 최대 7개의 키워드를 위한 고정 위치 및 글자 크기 스타일
const keywordStyles = [
  { top: "20%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "2.25rem" }, // 36px, 제일 큰 키워드 (중앙 상단)
  { top: "45%", left: "25%", transform: "translate(-50%, -50%)", fontSize: "1.5rem" },  // 24px (왼쪽 중간)
  { top: "45%", left: "75%", transform: "translate(-50%, -50%)", fontSize: "1.5rem" },  // 24px (오른쪽 중간)
  { top: "70%", left: "35%", transform: "translate(-50%, -50%)", fontSize: "1.25rem" }, // 20px (왼쪽 하단)
  { top: "70%", left: "65%", transform: "translate(-50%, -50%)", fontSize: "1.25rem" }, // 20px (오른쪽 하단)
  { top: "25%", left: "15%", transform: "translate(-50%, -50%)", fontSize: "1.125rem" },// 18px (왼쪽 상단)
  { top: "25%", left: "85%", transform: "translate(-50%, -50%)", fontSize: "1.125rem" },// 18px (오른쪽 상단)
];

export default function KeywordCloud({ keywords, isAnalyzed }: KeywordCloudProps) {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className={clsx(
            "absolute transition-all duration-500 font-semibold",
            isAnalyzed ? "opacity-100 filter-none" : "opacity-50 blur-[2px]"
          )}
          style={keywordStyles[index]}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}