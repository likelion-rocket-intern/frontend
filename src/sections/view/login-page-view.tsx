"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import client from "@/app/lib/client";
import { paths } from "@/routes/paths";

// 카카오 로그인 콜백을 처리하는 컴포넌트
function KakaoCallback() {
  const router = useRouter();
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
            router.push(paths.root);
            window.location.href = "/"; // Hard redirect to trigger middleware
          }
        });
    }
  }, [code, router]);

  return null;
}

// 로그인 버튼 컴포넌트
function LoginButton() {
  const router = useRouter();

  const handleKakaoLogin = async () => {
    try {
      const { data, error } = await client.GET("/api/v1/auth/kakao/login", {});
      if (error) {
        console.error("Failed to get login URL:", error);
        return;
      }
      if (data?.authorization_url) {
        // 카카오 로그인 페이지로 리다이렉트
        router.push(data.authorization_url);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full bg-yellow-300 text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors"
    >
      카카오로 로그인
    </button>
  );
}

// 메인 로그인 페이지 컴포넌트
export default function LoginPageView() {
  const router = useRouter();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <KakaoCallback />
        </Suspense>
        <LoginButton />
      </div>
    </div>
  );
}
