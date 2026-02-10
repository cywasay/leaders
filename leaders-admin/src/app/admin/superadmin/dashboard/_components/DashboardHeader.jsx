"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardHeader({ onSync, isSyncing }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white font-outfit">
          Superadmin Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Real-time overview of your leaders platform.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => onSync(true)}
        disabled={isSyncing}
        className="flex items-center gap-2 border-[#3EC6EC]/20 text-[#3EC6EC] hover:text-white hover:bg-[#3EC6EC] bg-[#3EC6EC]/5 rounded-xl transition-all h-11 px-5"
      >
        <RefreshCw size={18} className={cn(isSyncing && "animate-spin")} />
        {isSyncing ? "Syncing..." : "Sync Stripe Data"}
      </Button>
    </div>
  );
}
