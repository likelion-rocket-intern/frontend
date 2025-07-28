import { paths } from "@/routes/paths";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("--- Middleware Start ---");
  console.log("Request Path:", request.nextUrl.pathname);

  const cookieHeader = request.headers.get("cookie") || "";
  console.log("Cookie Header:", cookieHeader);

  const token = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("access_token="))
    ?.split("=")[1];
  console.log("Access Token:", token);

  const isLoggedIn = !!token;
  console.log("Is Logged In:", isLoggedIn);

  const isAuthPage = request.nextUrl.pathname === paths.auth.login;
  console.log("Is Auth Page:", isAuthPage);

  // 비로그인인데 로그인 페이지가 아니면
  if (!isLoggedIn && !isAuthPage) {
    console.log("Redirecting to login page...");
    return NextResponse.redirect(new URL(paths.auth.login, request.url));
  }

  // 로그인했는데 로그인 페이지 들어오면
  if (isLoggedIn && isAuthPage) {
    console.log("Redirecting to root page...");
    return NextResponse.redirect(new URL(paths.root, request.url));
  }

  console.log("--- Middleware End ---");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};