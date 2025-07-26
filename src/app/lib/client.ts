import createClient from "openapi-fetch";
import type { paths } from "./schema";
import { ResumeUploadSchemaType } from "@/sections/view/resume-upload-view";
import type { components } from "./schema";

// 나중에 http://192.168.56.109:8000로 바꾸셈
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const client = createClient<paths>({
  baseUrl,
  credentials: "include",
});
export async function startAnalysis(formData: ResumeUploadSchemaType) {
  const multipartForm = new FormData();
  if (formData.file) {
    multipartForm.append("file", formData.file);
  }
  if (formData.manualResume) {
    multipartForm.append("manualResume", formData.manualResume);
  }

  const { data, error } = await client.POST("/api/v1/resume/analysis", {
    body: multipartForm as any, // FormData 타입 문제 해결
  });

  if (error) throw error;
  return data as {
    message: string;
    filename: string;
    status: string;
    task_id: string;
  };
}
// 분석 상태 확인 (GET)
export async function getTaskStatus(task_id: string) {
  const { data, error } = await client.GET("/api/v1/resume/task/{task_id}", {
    params: { path: { task_id } },
  });
  if (error) throw error;
  return data as components["schemas"]["TaskStatusResponse"];
}

export default client;
