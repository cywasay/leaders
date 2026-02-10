"use client";

import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import DashboardHeader from "./_components/DashboardHeader";
import StatsGrid from "./_components/StatsGrid";
import LatestCustomers from "./_components/LatestCustomers";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStats = async (sync = false) => {
    try {
      if (sync) setIsSyncing(true);
      const data = await apiRequest(`/admin/stats${sync ? "?sync=1" : ""}`);
      setStats(data.stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
      <DashboardHeader onSync={fetchStats} isSyncing={isSyncing} />

      <StatsGrid stats={stats} loading={loading} />

      <LatestCustomers
        customers={stats?.recent_customers || []}
        loading={loading}
      />
    </div>
  );
}
