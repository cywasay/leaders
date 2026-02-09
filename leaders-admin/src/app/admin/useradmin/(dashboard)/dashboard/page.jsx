"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  FileText,
  LayoutDashboard,
  Receipt,
  ChevronRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { apiRequest } from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [onboarding, setOnboarding] = useState(null);
  const [purchasedForms, setPurchasedForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [onboardingRes, formsRes] = await Promise.all([
          apiRequest("/onboarding"),
          apiRequest("/onboarding/purchased-forms"),
        ]);
        setOnboarding(onboardingRes.onboarding);
        setPurchasedForms(formsRes.forms || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64 bg-white/5" />
            <Skeleton className="h-4 w-96 bg-white/5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#2D2D2D] p-8 rounded-2xl border border-white/5 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-start">
                <Skeleton className="h-12 w-12 rounded-2xl bg-white/5" />
                <Skeleton className="h-6 w-24 rounded-full bg-white/5" />
              </div>
              <div className="space-y-2 pt-4">
                <Skeleton className="h-3 w-20 bg-white/5" />
                <Skeleton className="h-8 w-48 bg-white/5" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#2D2D2D] rounded-2xl border border-white/5 shadow-2xl h-[400px] p-8">
              <div className="flex justify-between items-center mb-10">
                <Skeleton className="h-6 w-40 bg-white/5" />
                <Skeleton className="h-4 w-20 bg-white/5" />
              </div>
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <Skeleton className="h-24 w-24 rounded-full bg-white/5" />
                <Skeleton className="h-6 w-48 bg-white/5" />
                <Skeleton className="h-4 w-64 bg-white/5" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[250px] w-full rounded-2xl bg-white/5" />
            <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  const isOnboardingComplete = onboarding?.current_step === 3;
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-outfit">
            Welcome back, {firstName}!
          </h1>
          <p className="text-gray-400 mt-2 font-medium">
            Here's what's happening with your practice portal today.
          </p>
        </div>
        <div className="hidden xs:flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>

      {/* Purchased Forms Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2 flex items-center gap-2">
          <span>Required Onboarding Forms</span>
          <span className="w-4 h-px bg-white/10 grow"></span>
          <Badge className="bg-white/5 text-gray-400 border-none px-2 py-0 h-5">
            {purchasedForms.length} Total
          </Badge>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedForms.map((form) => {
            const isDone = form.status === "completed";
            const catLabel =
              form.category.charAt(0).toUpperCase() + form.category.slice(1);

            return (
              <Link
                key={form.charge_id}
                href={`/admin/useradmin/onboarding?charge_id=${form.charge_id}&category=${form.category}`}
                className={cn(
                  "p-6 sm:p-8 rounded-2xl border shadow-2xl flex flex-col justify-between group transition-all relative overflow-hidden",
                  isDone
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-[#2D2D2D] border-white/5 hover:border-[#3EC6EC]/20",
                )}
              >
                <div className="flex items-start justify-between relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center",
                      isDone
                        ? "bg-white/10 text-emerald-400 shadow-sm"
                        : "bg-white/10 text-white",
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2
                        size={20}
                        className="sm:size-6"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <FileText
                        size={20}
                        className="sm:size-6"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                  <Badge
                    className={cn(
                      "font-bold text-[9px] sm:text-[10px] px-2 sm:px-3 py-0.5 sm:py-1 uppercase tracking-tight",
                      isDone
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-[#3EC6EC] text-white border-none animate-pulse",
                    )}
                  >
                    {isDone ? "Completed" : "Action Required"}
                  </Badge>
                </div>

                <div className="mt-8 relative z-10">
                  <p
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider mb-1",
                      isDone ? "text-emerald-400/70" : "text-gray-500",
                    )}
                  >
                    {catLabel} Profile
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={cn(
                        "text-xl sm:text-2xl font-bold tracking-tight font-outfit line-clamp-2 min-h-[4rem]",
                        isDone ? "text-emerald-400" : "text-white",
                      )}
                    >
                      {form.item_name}
                    </h3>
                    <ChevronRight
                      size={18}
                      className="text-gray-600 group-hover:text-[#3EC6EC] transition-all"
                    />
                  </div>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#3EC6EC]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            );
          })}

          {/* If no items purchased yet */}
          {purchasedForms.length === 0 && (
            <div className="md:col-span-2 lg:col-span-3 bg-white/5 border border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                <HelpCircle size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-400">
                  No Purchased Forms Found
                </h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Items might still be syncing. Check back shortly or contact
                  support.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 border-t border-white/5 mt-10 pt-10 px-2">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
          Portal Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website Stat Card (Original Stat 1) */}
        <div className="bg-[#2D2D2D] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col justify-between group hover:border-[#3EC6EC]/20 transition-all">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#3EC6EC]/10 flex items-center justify-center text-[#3EC6EC]">
              <LayoutDashboard
                size={20}
                className="sm:size-6"
                strokeWidth={2.5}
              />
            </div>
            <Badge
              className={cn(
                "font-semibold text-[9px] sm:text-[10px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-tight",
                isOnboardingComplete
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20",
              )}
              variant="none"
            >
              {isOnboardingComplete ? "In Pipeline" : "Information Needed"}
            </Badge>
          </div>
          <div className="mt-6 sm:mt-8">
            <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1">
              General Status
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-outfit">
              {isOnboardingComplete ? "Processing" : "Forms Outstanding"}
            </h3>
          </div>
        </div>

        {/* Payments Stat Card (Original Stat 2) */}
        <Link
          href="/admin/useradmin/invoices"
          className="bg-[#2D2D2D] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col justify-between group hover:border-[#3EC6EC]/20 transition-all relative overflow-hidden"
        >
          <div className="flex items-start justify-between relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Receipt size={20} className="sm:size-6" strokeWidth={2.5} />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-[#3EC6EC]/10 group-hover:text-[#3EC6EC] transition-all">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <div className="mt-6 sm:mt-8 relative z-10">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Billing
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-outfit">
              Invoices & Receipts
            </h3>
          </div>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Notifications / Updates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#2D2D2D] rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col h-full min-h-[400px]">
            <div className="px-6 sm:px-8 py-4 sm:py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                  <Activity
                    size={16}
                    className="sm:size-[18px] text-[#3EC6EC]"
                  />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base tracking-tight font-outfit">
                  Recent Activity
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-[#3EC6EC] hover:bg-transparent"
              >
                View All
              </Button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full flex items-center justify-center relative">
                <Clock size={32} className="sm:size-10 text-gray-700" />
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#2D2D2D] rounded-full flex items-center justify-center border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#3EC6EC]"></span>
                </div>
              </div>
              <div className="max-w-xs scale-90 sm:scale-95">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  Staying on Schedule
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed">
                  We'll notify you here once our design team starts the first
                  draft of your landing page.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-xl border-white/10 text-gray-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mt-2 sm:mt-4 hover:bg-white/5 hover:text-white"
              >
                Check Timeline
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Support & Resources */}
        <div className="space-y-6">
          <div className="bg-[#3EC6EC]/5 p-6 sm:p-8 rounded-2xl border border-[#3EC6EC]/20 relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#3EC6EC] border border-white/10 shadow-lg shadow-[#3EC6EC]/10">
                <HelpCircle size={24} className="sm:size-7" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-outfit">
                  Need Support?
                </h3>
                <p className="text-gray-400 mt-2 text-xs sm:text-sm font-medium leading-relaxed">
                  Our team of healthcare brand strategists is ready to help you
                  craft your story.
                </p>
              </div>
              <Button className="w-full h-12 sm:h-14 bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-[#3EC6EC]/20 transition-all flex items-center justify-between px-5 sm:px-6 group">
                <span className="text-sm sm:text-base">Contact Team</span>
                <ChevronRight
                  size={18}
                  className="sm:size-5 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl text-white/5" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl text-white/5" />
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📖</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Resource
              </p>
              <h4 className="font-bold text-white text-sm">
                Practice Launch Guide
              </h4>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-gray-500 hover:text-[#3EC6EC]"
            >
              <ArrowUpRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
