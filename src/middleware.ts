import { paths } from "@/routes/paths";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");

  const isLoggedIn = !!token;
  const isAuthPage = request.nextUrl.pathname === paths.auth.login;

  // 비로그인 상태에서 로그인 페이지가 아닌 다른 페이지에 접근하려고 할 때
  if (!isLoggedIn && !isAuthPage) {
    // 로그인 페이지로 리디렉션합니다.
    return NextResponse.redirect(new URL(paths.auth.login, request.url));
  }

  // 로그인 상태에서 로그인 페이지에 접근하려고 할 때
  if (isLoggedIn && isAuthPage) {
    // 메인 페이지로 리디렉션합니다.
    return NextResponse.redirect(new URL(paths.root, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // API, Next.js 내부 파일, 정적 파일을 제외한 모든 경로에서 미들웨어를 실행합니다.
    "/((?!api|_next|favicon.ico|.*\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};