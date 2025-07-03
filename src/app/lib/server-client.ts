import { paths } from "@/app/lib/schema";
import { cookies } from "next/headers";
import createClient from "openapi-fetch";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function createServerClient(cookie?: string) {
  return createClient<paths>({
    baseUrl,
    fetch: async (request: Request) => {
      const headers = new Headers(request.headers);
      const cookieHeader = (await cookies()).toString();
      // 요청시 쿠키 필요하면 추가
      if (cookieHeader) {
        headers.set("Cookie", cookieHeader);
      }

      const newRequest = new Request(request, { headers });

      return fetch(newRequest);
    },
  });
}
