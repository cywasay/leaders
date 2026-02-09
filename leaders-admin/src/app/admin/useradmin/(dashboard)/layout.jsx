"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const UserDashboardLayout = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/admin/login");
      } else if (user.role === "superadmin") {
        router.push("/admin/superadmin/dashboard");
      } else {
        setIsChecking(false);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || isChecking) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#1A1A1A]">
        {/* Sidebar Skeleton */}
        <aside className="w-[264px] min-h-full bg-gradient-to-b from-[#2D2D2D] to-[#1A1A1A] border-r border-white/5 hidden lg:flex flex-col p-6 space-y-8">
          <Skeleton className="h-10 w-32 mx-auto mb-10" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        </aside>
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          {/* Topbar Skeleton */}
          <header className="h-[72px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent">
            <Skeleton className="h-6 w-40" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-32" />
              </div>
            </div>
          </header>
          {/* Content Skeleton */}
          <main className="flex-1 p-6 lg:p-10 space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
            <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl p-6 h-[400px]">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#1A1A1A]">
      <DashboardSidebar />
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <DashboardTopbar title="User Panel" />
        <main className="flex-1 min-w-0 overflow-y-auto bg-[#1A1A1A]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
