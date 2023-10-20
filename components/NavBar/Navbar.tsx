"use client";

import { ArrowLeft, Menu } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ThemeButton } from "../themes/ThemeButton";
const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const isShow = pathName.split("/").length > 2;
  return (
    <div className="flex items-center justify-between theme-navbarRoutes border-b  p-2">
      <div className="flex items-center gap-x-5">
        <button className="block md:hidden ">
          <MobileSidebar>
            <Menu className="" />
          </MobileSidebar>
        </button>
        {isShow && (
          <ArrowLeft onClick={()=>router.back()} className="w-8 h-8 cursor-pointer transition text-themes text-gray-600  hover:bg-gray-200/40 rounded-full" />
        )}
      </div>

      <div className="ml-auto">
        <div className="flex items-center gap-x-5">
          <ThemeButton/>
        <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
