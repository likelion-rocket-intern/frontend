import DashboardFooter from "@/components/DashboardFooter";
import DashboardHeader from "@/components/DashboardHeader";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <DashboardHeader />
      <main className="pt-18 w-[1200px] mb-[186px]">{children}</main>
      <DashboardFooter />
    </div>
  );
}
