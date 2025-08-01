"use client";

import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between h-20 w-full px-40 border-b border-gray-300">
      {/* left section */}
      <section className="flex gap-[70px]">
        <Link href={paths.root} className="flex items-center">
          <SvgColor
            src="/logo/tech_fit.svg"
            width={180}
            height={48}
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
          <Button
            variant="link_default"
            size={"fit"}
            onClick={() => router.push(paths.resume.upload)}
          >
            이력서분석
          </Button>
          <Button asChild variant="link_default" size={"fit"}>
            <Link href={paths.mypage}>마이페이지</Link>
          </Button>
        </div>
      </section>

      {/* right section */}
      <section className="flex items-center gap-6">
        {pathname !== "/login" && (
          <Link href={paths.mypage}>
            <Image
              src="/logo/favicon.png"
              alt="profile"
              width={28}
              height={28}
              className="rounded-full"
            />
          </Link>
        )}
      </section>
    </header>
  );
}
