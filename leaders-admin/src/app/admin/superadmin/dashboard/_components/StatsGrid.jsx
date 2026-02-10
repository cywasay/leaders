"use client";

import React from "react";
import { Users, TrendingUp, CreditCard, Activity } from "lucide-react";
import KPICard from "./KPICard";

export default function StatsGrid({ stats, loading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Total Customers"
        value={stats?.total_customers?.toLocaleString() || "0"}
        icon={Users}
        trend="up"
        trendValue="12%"
        loading={loading}
        colorClass="text-blue-400"
      />
      <KPICard
        title="Total Revenue"
        value={`$${stats?.total_revenue?.toLocaleString() || "0"}`}
        icon={TrendingUp}
        trend="up"
        trendValue="8.4%"
        loading={loading}
        colorClass="text-emerald-400"
      />
      <KPICard
        title="Total Payments"
        value={stats?.total_payments?.toLocaleString() || "0"}
        icon={CreditCard}
        trend="up"
        trendValue="5.2%"
        loading={loading}
        colorClass="text-purple-400"
      />
      <KPICard
        title="Active Users"
        value={stats?.active_users?.toLocaleString() || "0"}
        icon={Activity}
        loading={loading}
        colorClass="text-amber-400"
      />
    </div>
  );
}
