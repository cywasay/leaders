"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import MobileSidebar from "./sidebar/MobileSidebar";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const DashboardTopbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials for the avatar if no image
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="w-full h-[64px] lg:h-[75px] flex items-end">
      <header className="w-full h-[64px] lg:h-[72px] bg-transparent flex items-center justify-between px-3 md:px-6 relative">
        <div className="flex items-center gap-1 md:gap-4">
          {/* Mobile Menu Button - Only visible on mobile */}
          <MobileSidebar />

          {/* Portal Indicator - Small on mobile */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-semibold uppercase tracking-tight md:tracking-widest border",
                user?.role === "superadmin"
                  ? "bg-orange-500/10 text-[#FF7300] border-orange-500/20"
                  : "bg-[#3EC6EC]/10 text-[#3EC6EC] border-[#3EC6EC]/20",
              )}
            >
              <span className="inline md:hidden">
                {user?.role === "superadmin" ? "Admin" : "User"}
              </span>
              <span className="hidden md:inline">
                {user?.role === "superadmin"
                  ? "Superadmin Portal"
                  : "Practitioner Portal"}
              </span>
            </span>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Notification Bell - Smaller on mobile */}
          <button className="bg-transparent border-0 cursor-pointer rounded-xl transition-all duration-300 hover:bg-white/5 flex items-center justify-center p-1.5 md:p-2 text-gray-400 hover:text-white">
            <Bell size={20} className="md:hidden" />
            <Bell size={24} className="hidden md:block" />
          </button>

          {/* Vertical Divider - Hidden on very small screens */}
          <div className="hidden xs:block h-8 md:h-10 w-px bg-white/10"></div>

          {/* User Profile Section with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 md:gap-3 cursor-pointer group outline-none"
            >
              <div className="relative w-8 h-8 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#3EC6EC] transition-all bg-white/5 flex items-center justify-center text-[#3EC6EC] font-bold text-base md:text-lg">
                {user?.avatar_url || user?.avatar ? (
                  <Image
                    src={user?.avatar_url || user?.avatar}
                    alt={user?.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>{userInitials}</span>
                )}
              </div>

              {/* Name - Hidden on very small screens */}
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-medium text-[13px] md:text-[14px] leading-tight text-white group-hover:text-[#3EC6EC] transition-colors">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] md:text-[11px] text-gray-400 leading-tight truncate max-w-[120px]">
                  {user?.email}
                </span>
              </div>

              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#2D2D2D] rounded-2xl shadow-xl border border-white/10 py-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-white/5 mb-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href={
                    user?.role === "superadmin"
                      ? "/admin/superadmin/settings"
                      : "/admin/useradmin/settings"
                  }
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#3EC6EC] transition-colors"
                >
                  <UserIcon size={18} />
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashboardTopbar;
