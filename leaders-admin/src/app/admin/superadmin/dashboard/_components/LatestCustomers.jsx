"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CustomerTable from "../../customers/_components/CustomerTable";

export default function LatestCustomers({ customers, loading }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Latest Customers
          <span className="text-xs font-normal text-gray-500 ml-2 uppercase tracking-widest bg-white/5 py-1 px-2 rounded-lg">
            Last 5
          </span>
        </h2>
        <Link href="/admin/superadmin/customers">
          <Button
            variant="link"
            className="text-[#3EC6EC] hover:text-[#3EC6EC]/80 font-bold p-0 flex items-center gap-2"
          >
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      <div className="bg-[#2D2D2D] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-white/5" />
            ))}
          </div>
        ) : (
          <CustomerTable customers={customers || []} />
        )}
      </div>
    </div>
  );
}
