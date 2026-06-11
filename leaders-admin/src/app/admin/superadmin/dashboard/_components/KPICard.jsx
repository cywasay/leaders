"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  loading,
  className,
}) {
  return (
    <div
      className={cn(
        "bg-[#222222] border border-white/5 rounded-xl p-5 flex flex-col justify-between h-[108px] transition-all duration-200 hover:border-white/10 shadow-sm",
        className
      )}
    >
      {/* Top Row: Title & Icon */}
      <div className="flex items-center justify-between w-full">
        <span className="text-[13px] font-medium text-gray-400">
          {title}
        </span>
        <div className="text-gray-400">
          <Icon size={16} strokeWidth={1.5} />
        </div>
      </div>

      {/* Bottom Row: Value & Trend */}
      <div className="flex items-baseline justify-between w-full">
        {loading ? (
          <Skeleton className="h-7 w-20 bg-white/5 rounded" />
        ) : (
          <h3 className="text-xl font-semibold text-white tracking-tight font-outfit">
            {value}
          </h3>
        )}
        
        {trend && (
          <div
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              trend === "up" ? "text-emerald-400" : "text-red-400"
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight size={13} strokeWidth={2} />
            ) : (
              <ArrowDownRight size={13} strokeWidth={2} />
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
