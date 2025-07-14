"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import client from "@/app/lib/client";
import { paths } from "@/routes/paths";
import { SvgColor } from "@/components/svg-color";
import { useKakaoCallback } from "@/hooks/useKakaoCallback";
import { KakaoLoginButton } from "@/components/ui/KakaoLoginButton";

// 메인 로그인 페이지 컴포넌트
export default function LoginPageView() {
  const router = useRouter();
  useKakaoCallback();

  useEffect(() => {
    // Check if already logged in by making a request to /api/v1/auth/me
    client.GET("/api/v1/auth/me", {}).then(({ data, error }) => {
      if (data && !error) {
        // If we get a successful response, we're logged in
        router.push(paths.root); // Hard redirect to trigger middleware
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[588px] rounded-[20px] bg-gray-25 pt-[72px] px-[102px] pb-[115px] flex flex-col items-center border border-gray-[200px] shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]">
        {/* 로고 */}
        <SvgColor
          src="/logo/logo_likelion_primary_24_ver3_color.svg"
          width={234}
          height={26}
          className="text-orange-500 mb-9"
        />

        {/* 설명 */}
        <p className="title_2 text-center text-gray-600">
          적성검사와 AI이력서분석으로
          <br />
          맞춤형 직무찾고 <br />
          취업까지!
        </p>

        <hr className="w-full border-gray-200 my-9" />

        <p className="body_1 text-gray-500 mb-6">1초만에 로그인</p>

        {/* 카카오 로그인 버튼 */}
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <KakaoLoginButton />
      </div>
    </div>
  );
}
