import DashboardHeader from "@/components/DashboardHeader";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
