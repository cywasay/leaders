"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "./NavItems";
import SidebarLogout from "./SidebarLogout";
import Image from "next/image";

const MobileSidebar = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:text-[#3EC6EC]">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 border-r-0 w-[280px] bg-[#1A1A1A] border-white/5 text-white"
        >
          <div className="flex flex-col h-full bg-[#1A1A1A]">
            <SheetHeader className="h-[120px] flex flex-row items-center justify-center px-6 border-b border-white/5 space-y-0">
              <SheetTitle className="sr-only">
                Mobile Navigation Menu
              </SheetTitle>
              <SheetDescription className="sr-only">
                Access your dashboard and manage your account from your mobile
                device.
              </SheetDescription>
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={140}
                  height={50}
                  className="object-contain w-36 h-auto"
                />
              </div>
            </SheetHeader>

            <div className="flex-1 flex flex-col pt-4 overflow-y-auto">
              <div className="px-6 py-4">
                <p className="font-bold text-[10px] text-gray-500 tracking-[0.15em] uppercase">
                  Main Menu
                </p>
              </div>
              <NavItems isCollapsed={false} />
              <div className="mt-auto border-t border-white/5">
                <SidebarLogout isCollapsed={false} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
