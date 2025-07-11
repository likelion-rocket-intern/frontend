"use client";

import ResumeReportView from "@/sections/view/resume-report-view";
import { useParams } from "next/navigation";

export default function ResumeReportPage() {
  const params = useParams();
  const resumeId = params?.id ? Number(params.id) : undefined;

  return <ResumeReportView />;
}
