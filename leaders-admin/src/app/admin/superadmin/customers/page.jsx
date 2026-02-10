"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import CustomerListHeader from "./_components/CustomerListHeader";
import CustomerTable from "./_components/CustomerTable";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchCustomers = useCallback(async (sync = false) => {
    try {
      if (sync) setIsSyncing(true);
      const data = await apiRequest(`/admin/customers${sync ? "?sync=1" : ""}`);
      setCustomers(data.customers || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) =>
          c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [customers, searchTerm],
  );

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      <CustomerListHeader
        isSyncing={isSyncing}
        onSync={() => fetchCustomers(true)}
      />
      <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-[350px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <Input
              placeholder="Search..."
              className="pl-10 border-white/10 bg-white/5 rounded-xl h-11 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-gray-400 rounded-xl h-11 items-center gap-2 flex"
          >
            <Filter size={18} /> Filters
          </Button>
        </div>
        <CustomerTable customers={filtered} />
        <div className="p-5 border-t border-white/5 bg-white/5 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {filtered.length} of {customers.length}
          </p>
        </div>
      </div>
    </div>
  );
}
