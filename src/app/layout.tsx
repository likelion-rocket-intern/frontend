import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TansckQueryProvider from "@/providers/TanstackQueryProvider";
import DashboardHeader from "@/components/layouts/DashboardHeader";
import DashboardFooter from "@/components/layouts/DashboardFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 접두사 정의
const TITLE_PREFIX = "테크핏 | ";

export const metadata: Metadata = {
  title: { default: "테크핏", template: `${TITLE_PREFIX}%s` },
  description: "AI로 이력서를 분석하여 적합한 직무를 찾아드립니다.",
  icons: {
    icon: "/logo/favicon.png", // ✅ png도 가능
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TansckQueryProvider>
          <div className="flex flex-col items-center">
            <DashboardHeader />
            <main className="pt-18 w-[1200px] mb-[132px]">{children}</main>
            <DashboardFooter />
          </div>
        </TansckQueryProvider>
      </body>
    </html>
  );
}
