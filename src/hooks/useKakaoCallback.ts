import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import client from "@/app/lib/client";
import { paths } from "@/routes/paths";

// 카카오 로그인 콜백을 처리하는 커스텀 훅
export function useKakaoCallback() {
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
          }
        });
    }
  }, [code, router]);
}
