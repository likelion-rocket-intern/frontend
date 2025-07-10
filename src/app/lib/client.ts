import createClient from "openapi-fetch";
import type { paths } from "./schema";
import { ResumeUploadSchemaType } from "@/sections/view/resume-upload-view";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const client = createClient<paths>({
  baseUrl,
  credentials: "include",
});

// 이력서 분석 요청 (POST)
export async function startAnalysis(formData: ResumeUploadSchemaType) {
  const multipartForm = new FormData();
  multipartForm.append("file", formData.file);
  multipartForm.append("manualResume", formData.manualResume);

  const { data, error } = await client.POST("/api/v1/resume/analysis", {
    body: multipartForm,
  });

  if (error) throw error;
  return data!; // undefined가 아닌 경우에만 반환
}

// 분석 상태 확인 (GET)
export async function getTaskStatus(task_id: string) {
  const { data, error } = await client.GET(`/api/v1/resume/task/${task_id}`);

  if (error) throw error;
  return data!;
}

export default client;
