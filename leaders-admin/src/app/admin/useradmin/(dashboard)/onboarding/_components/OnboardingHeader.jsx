"use client";

import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ROLE_TITLES } from "./common/header-constants";

const OnboardingHeader = ({ currentStep, role }) => {
  const { user } = useAuth();
  const title =
    ROLE_TITLES[role || user?.role || "healthcare"] || ROLE_TITLES.healthcare;

  return (
    <div className="bg-[#2D2D2D]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        <div className="flex flex-col justify-center h-full min-w-0">
          <div className="flex items-baseline gap-2 overflow-hidden">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate shrink-0">
              {title}
            </h1>
            <p className="text-gray-400 text-sm hidden lg:block truncate font-medium">
              Fill in details to generate your curated website.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden sm:flex items-center gap-1.5 text-[#3EC6EC] font-bold text-sm">
            <CheckCircle2 size={16} /> Get started
          </span>
          <ChevronRight size={14} className="text-gray-600 hidden md:block" />
          <span className="bg-[#3EC6EC]/10 text-[#3EC6EC] px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap border border-[#3EC6EC]/20">
            Step {currentStep} of 3
          </span>
        </div>
      </div>
      <div className="w-full bg-white/5 h-[2px]">
        <div
          className="bg-[#3EC6EC] h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(62,198,236,0.5)]"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default OnboardingHeader;
