"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import NavItems from "./NavItems";
import Image from "next/image";
import SidebarLogout from "./SidebarLogout";
import { ChevronLeft } from "lucide-react";

/**
 * DashboardSidebar - A premium, collapsible sidebar for the admin dashboard.
 */
const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "min-h-full flex-col bg-gradient-to-b from-[#2D2D2D] to-[#1A1A1A] transition-all duration-300 hidden lg:flex border-r border-white/5 shadow-2xl relative",
        isCollapsed ? "w-[80px]" : "w-[264px]",
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "h-[120px] flex items-center transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-center px-6",
        )}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={160}
            height={60}
            className={cn(
              "object-contain transition-all duration-300",
              isCollapsed ? "w-10 h-10" : "w-40 h-auto",
            )}
          />
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#3EC6EC] flex items-center justify-center text-white hover:bg-[#2FB0D3] transition-all duration-300 shadow-lg border border-white/10 z-50",
            isCollapsed && "rotate-180",
          )}
        >
          <ChevronLeft size={14} />
        </button>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isCollapsed ? "pt-6" : "pt-2",
        )}
      >
        <div
          className={cn(
            "px-6 py-4 transition-all duration-200",
            isCollapsed
              ? "opacity-0 h-0 p-0 overflow-hidden"
              : "opacity-100 h-auto",
          )}
        >
          <p className="font-bold text-[10px] text-gray-500 tracking-[0.15em] uppercase">
            Main Menu
          </p>
        </div>

        <NavItems isCollapsed={isCollapsed} />

        <SidebarLogout isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
