import { SvgColor } from "@/components/svg-color";

export default function DashboardFooter() {
  return (
    <footer className="w-full px-40 py-20 bg-gray-500 flex flex-col items-start gap-12">
      <SvgColor
        src="/logo/tech_fit_white.svg"
        width={144}
        height={28}
        className="text-white"
      />

      <div className="flex flex-col items-start gap-4">
        <address className="flex flex-col items-start gap-2 not-italic">
          <p className="text-gray-300 subtitle_1">상호명 : 멋쟁이사자처럼</p>

          <div className="inline-flex items-center gap-6">
            <span className="text-gray-300 subtitle_1">대표 : 나성영</span>
            <div className="w-px h-4 bg-gray-400" />
            <span className="text-gray-300 subtitle_1">
              contact@likelion.net
            </span>
          </div>

          <div className="inline-flex items-center gap-6">
            <span className="text-gray-300 subtitle_1">
              사업자 번호 : 264-88-01106
            </span>
            <div className="w-px h-4 bg-gray-400" />
            <span className="text-gray-300 subtitle_1">
              통신판매업 신고번호 : 2022-서울종로-1534
            </span>
          </div>

          <p className="text-gray-300 subtitle_1">
            주소 : 서울 종로구 종로3길17, 광화문D타워 D1동 16층, 17층
          </p>
        </address>

        <p className="text-gray-300 subtitle_1">
          Copyright © 2024 멋쟁이사자처럼 All rights reserved
        </p>
      </div>
    </footer>
  );
}
