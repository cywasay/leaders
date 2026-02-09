"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Search,
  Download,
  Filter,
  Eye,
  RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/api";
import Link from "next/link";

// Utility Functions - Moved outside to prevent re-creation on render
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getCustomerStatus = (customer) => {
  if (customer.status === "completed") return "Completed";
  if (customer.status === "active") return "Active";
  if (customer.user?.onboarding) {
    const step = customer.user.onboarding.current_step || 1;
    return step === 3 ? "Completed" : `Step ${step} of 3`;
  }
  return "Pending";
};

const getStatusColor = (customer) => {
  if (
    customer.status === "completed" ||
    customer.user?.onboarding?.current_step === 3
  )
    return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  if (customer.status === "active")
    return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
  return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
};

const getCategoryLabel = (category) => {
  if (!category) return "—";
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchCustomers = async (sync = false) => {
    try {
      if (sync) setIsSyncing(true);
      const data = await apiRequest(`/admin/customers${sync ? "?sync=1" : ""}`);
      setCustomers(data.customers || []);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSync = () => {
    fetchCustomers(true);
  };

  // Optimized filtering logic
  const filteredCustomers = React.useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(lowerSearch) ||
        customer.email?.toLowerCase().includes(lowerSearch),
    );
  }, [customers, searchTerm]);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <Skeleton className="h-10 w-[120px]" />
        </div>

        <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 flex justify-between gap-4">
            <Skeleton className="h-11 w-[350px] rounded-xl bg-white/5" />
            <Skeleton className="h-11 w-[100px] rounded-xl bg-white/5" />
          </div>

          <div className="p-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center p-4 border-b border-white/5 gap-4"
              >
                <div className="flex items-center gap-3 w-[300px]">
                  <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-[120px] bg-white/5" />
                    <Skeleton className="h-2 w-[180px] bg-white/5" />
                  </div>
                </div>
                <Skeleton className="h-4 w-[150px] flex-1 bg-white/5" />
                <Skeleton className="h-6 w-[100px] rounded-full bg-white/5" />
                <Skeleton className="h-4 w-[100px] bg-white/5" />
                <Skeleton className="h-8 w-8 rounded-full bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-outfit text-white">
            Customers
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View and manage healthcare practitioners.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 border-[#3EC6EC]/20 text-[#3EC6EC] hover:text-white hover:bg-[#3EC6EC] bg-[#3EC6EC]/5 rounded-xl transition-all"
          >
            <RefreshCw size={18} className={cn(isSyncing && "animate-spin")} />
            {isSyncing ? "Syncing..." : "Sync from Stripe"}
          </Button>
          <Button
            variant="outline"
            className="hidden sm:flex items-center gap-2 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 bg-white/5 rounded-xl"
          >
            <Download size={18} /> Export
          </Button>
        </div>
      </div>

      <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            className="border-white/10 bg-white/5 text-gray-400 rounded-xl h-11 flex items-center gap-2"
          >
            <Filter size={18} /> Filters
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5">
              <TableHead className="w-[300px] text-gray-400">
                Customer
              </TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Added</TableHead>
              <TableHead className="text-right pr-6 text-gray-400">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="border-white/5 hover:bg-white/5 group"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarFallback className="bg-[#3EC6EC]/10 text-[#3EC6EC] font-bold text-xs uppercase">
                          {customer.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || customer.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col truncate">
                        <span className="font-bold text-white leading-none">
                          {customer.name || "No name"}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          {customer.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full px-2.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase">
                      {getCategoryLabel(customer.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-2.5 text-[10px] font-bold uppercase",
                        getStatusColor(customer),
                      )}
                    >
                      {getCustomerStatus(customer)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-400 font-medium">
                    {formatDate(customer.created_at)}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-white/10 text-gray-400 rounded-full"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-[180px] border-white/10 bg-[#2D2D2D]"
                      >
                        <DropdownMenuLabel className="text-xs text-gray-400">
                          Manage Customer
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <Link
                          href={`/admin/superadmin/customers/${customer.id}`}
                        >
                          <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/5 text-gray-300">
                            <Eye size={16} className="text-gray-400" />
                            <span className="font-semibold text-sm">
                              View Details
                            </span>
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-gray-500 font-medium"
                >
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="p-5 border-t border-white/5 bg-white/5 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {filteredCustomers.length} of {customers.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled
              size="sm"
              className="rounded-lg h-9 font-bold text-xs uppercase border-white/10 text-gray-500"
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg h-9 font-bold text-xs uppercase border-[#3EC6EC]/50 text-[#3EC6EC] bg-[#3EC6EC]/10"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
