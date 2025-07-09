import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { paths } from "@/routes/paths";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between h-20 w-full px-40 bg-yellow-100">
      {/* left section */}
      <section className="flex gap-[70px]">
        <div className="size-[42px] bg-[#FB923C]"></div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8 *:cursor-pointer">
            <NavigationMenuItem>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Link</NavigationMenuLink>
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
