import AptitudeTestView from "@/sections/view/aptitude-test-view";

export const metadata = {
  title: "적성검사 테스트",
};

export default function AptitudePage() {
  return (
    <>
      {/* 페이지 전체를 덮는 회색 배경 */}
      <div className="fixed inset-0 bg-[#FBFBFB] -z-10" />
      {/* 실제 콘텐츠 */}
      <div className="relative z-10">
        <AptitudeTestView />
      </div>
    </>
  );
}
