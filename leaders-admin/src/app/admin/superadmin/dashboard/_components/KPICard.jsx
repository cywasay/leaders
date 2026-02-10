"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  loading,
  colorClass,
  className,
}) {
  return (
    <Card
      className={cn(
        "bg-[#2D2D2D] h-[175  px] border-white/5 overflow-hidden group",
        className,
      )}
    >
      <CardContent>
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "p-3 rounded-xl bg-white/5 text-gray-400 group-hover:scale-110 transition-transform duration-300",
              colorClass,
            )}
          >
            <Icon size={24} />
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                trend === "up"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400",
              )}
            >
              {trend === "up" ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {trendValue}
            </div>
          )}
        </div>
        <div className="mt-4">
          {loading ? (
            <Skeleton className="h-8 w-24 bg-white/5" />
          ) : (
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {value}
            </h3>
          )}
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
