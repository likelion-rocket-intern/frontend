import { paths } from "@/routes/paths";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const token = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("access_token="))
    ?.split("=")[1];

  const isLoggedIn = !!token;
  const isAuthPage = request.nextUrl.pathname === paths.auth.login;

  // 비로그인인데 로그인 페이지가 아니면
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL(paths.auth.login, request.url));
  }

  // 로그인했는데 로그인 페이지 들어오면
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL(paths.root, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};
