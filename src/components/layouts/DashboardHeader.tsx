import { SvgColor } from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { paths } from "@/routes/paths";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between h-20 w-full px-40 border-b border-gray-300">
      {/* left section */}
      <section className="flex gap-[70px]">
        <SvgColor
          src="/logo/logo_likelion_primary_24_ver3_color.svg"
          width={234}
          className="text-primary-500"
        />
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8 *:cursor-pointer font-semibold">
            <NavigationMenuItem>
              <NavigationMenuLink>홈</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>적성검사</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>이력서분석</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>마이페이지</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      {/* right section */}
      <section className="flex items-center gap-6">
        <Link
          href={paths.mypage}
          className="size-7 rounded-full bg-slate-300"
        ></Link>
        <p>회원가입</p>
        <Button className="px-5 py-[10px] rounded-[8px] bg-[#FB923C]">
          로그인
        </Button>
      </section>
    </header>
  );
}
