"use client";

import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between h-20 w-full px-40 border-b border-gray-300">
      {/* left section */}
      <section className="flex gap-[70px]">
        <Link href={paths.root} className="flex items-center">
          <SvgColor
            src="/logo/logo_likelion_primary_24_ver3_color.svg"
            width={234}
            height={26}
            className="text-primary-500"
          />
        </Link>
        <div className="flex gap-8 font-semibold">
          <Button asChild variant="link_default" size={"fit"}>
            <Link href={paths.root}>홈</Link>
          </Button>
          <Button asChild variant="link_default" size={"fit"}>
            <Link href={paths.aptitude.test}>적성검사</Link>
          </Button>
          <Button asChild variant="link_default" size={"fit"}>
            <Link href={paths.resume.upload}>이력서분석</Link>
          </Button>
          <Button asChild variant="link_default" size={"fit"}>
            <Link href={paths.mypage}>마이페이지</Link>
          </Button>
        </div>
      </section>

      {/* right section */}
      <section className="flex items-center gap-6">
        {pathname !== "/login" && (
          <Link
            href={paths.mypage}
            className="size-7 rounded-full bg-slate-300"
          ></Link>
        )}
      </section>
    </header>
  );
}
