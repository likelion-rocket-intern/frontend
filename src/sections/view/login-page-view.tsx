"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import client from "@/app/lib/client";
import { Button } from "@/components/ui/button";
import { SvgColor } from "@/components/svg-color";

// 카카오 로그인 콜백을 처리하는 컴포넌트
function KakaoCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    // 카카오 로그인 콜백으로 돌아왔을 때
    if (code) {
      client
        .GET("/api/v1/auth/kakao/callback", {
          params: { query: { code } },
        })
        .then(({ data, error }) => {
          if (error) {
            console.error("Login failed:", error);
            return;
          }
          if (data) {
            // 로그인 성공 시 메인 페이지로 리다이렉트
            window.location.href = "/"; // Hard redirect to trigger middleware
          }
        });
    }
  }, [code]);

  return null;
}

// 로그인 버튼 컴포넌트
function KakaoLoginButton() {
  const handleKakaoLogin = async () => {
    try {
      const { data, error } = await client.GET("/api/v1/auth/kakao/login", {});
      if (error) {
        console.error("Failed to get login URL:", error);
        return;
      }
      if (data?.authorization_url) {
        // 카카오 로그인 페이지로 리다이렉트
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Button
      onClick={handleKakaoLogin}
      size={"large"}
      className="bg-[#FFE300] text-gray-800 hover:bg-[#F0D600] active:bg-[#FFE300]"
    >
      <SvgColor src="/icons/icon-message-circle.svg" width={21} height={21} />
      카카오톡으로 시작하기
    </Button>
  );
}

// 메인 로그인 페이지 컴포넌트
export default function LoginPageView() {
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

        <Suspense fallback={<div>Loading...</div>}>
          <KakaoCallback />
        </Suspense>
        <KakaoLoginButton />
      </div>
    </div>
  );
}
