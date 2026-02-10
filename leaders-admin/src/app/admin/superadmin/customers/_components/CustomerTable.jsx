import React from "react";
import Link from "next/link";
import { MoreHorizontal, Eye } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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

const CustomerTable = ({ customers }) => {
  return (
    <Table>
      <TableHeader className="bg-white/5">
        <TableRow className="border-white/5">
          <TableHead className="w-[300px] text-gray-400">Customer</TableHead>
          <TableHead className="text-gray-400">Category</TableHead>
          <TableHead className="text-gray-400">Status</TableHead>
          <TableHead className="text-gray-400">Added</TableHead>
          <TableHead className="text-right pr-6 text-gray-400">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.length > 0 ? (
          customers.map((customer) => (
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
                  {customer.category || "—"}
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
                    <Link href={`/admin/superadmin/customers/${customer.id}`}>
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
  );
};

export default CustomerTable;
