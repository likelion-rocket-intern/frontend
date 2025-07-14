import client from "@/app/lib/client";
import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// 로그인 버튼 컴포넌트
export function KakaoLoginButton() {
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
    <Button
      onClick={handleKakaoLogin}
      size={"large"}
      className="bg-[#FFE300] text-gray-800 hover:bg-[#F0D600]"
    >
      <SvgColor src="/icons/icon-message-circle.svg" width={21} height={21} />
      카카오톡으로 시작하기
    </Button>
  );
}
