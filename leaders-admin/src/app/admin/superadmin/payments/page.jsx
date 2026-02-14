"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Search,
  Filter,
  Receipt,
  FileText,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  AlertTriangle,
  Hash,
  Tag,
  X,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api";

const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    hasMore: false,
    firstId: null,
    lastId: null,
  });
  const [cursorHistory, setCursorHistory] = useState([]);
  const [currentCursor, setCurrentCursor] = useState({
    startingAfter: null,
    endingBefore: null,
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  const fetchPayments = useCallback(
    async (params = {}, forceRefresh = false) => {
      try {
        if (forceRefresh) setIsSyncing(true);
        setIsLoading(true);
        setError(null);

        const queryParams = new URLSearchParams();
        queryParams.append("limit", 8);
        if (params.startingAfter)
          queryParams.append("starting_after", params.startingAfter);
        if (params.endingBefore)
          queryParams.append("ending_before", params.endingBefore);

        const cacheKey = `payments_cache_${queryParams.toString()}`;

        // Check cache if not forcing refresh
        if (!forceRefresh) {
          const cached = sessionStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            // Check if cache is older than 30 minutes (optional "session" expiration)
            const isExpired = Date.now() - parsed.timestamp > 30 * 60 * 1000;
            if (!isExpired) {
              setPayments(parsed.data);
              setPaginationInfo(parsed.pagination);
              setLastSynced(new Date(parsed.timestamp));
              setIsLoading(false);
              return;
            }
          }
        }

        const response = await apiRequest(
          `/admin/payments?${queryParams.toString()}`,
        );

        if (response.status === "success") {
          const paginationData = {
            hasMore: response.has_more,
            firstId: response.first_id,
            lastId: response.last_id,
          };

          setPayments(response.data);
          setPaginationInfo(paginationData);

          // Save to cache
          const timestamp = Date.now();
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: response.data,
              pagination: paginationData,
              timestamp,
            }),
          );
          setLastSynced(new Date(timestamp));
        } else {
          setError("Failed to fetch payments");
        }
      } catch (err) {
        setError(err.message || "Something went wrong while fetching payments");
      } finally {
        setIsLoading(false);
        setIsSyncing(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPayments(currentCursor);
  }, [fetchPayments, currentCursor]);

  const handleNextPage = () => {
    if (paginationInfo.lastId) {
      // Save current firstId to history before moving forward
      setCursorHistory((prev) => [...prev, paginationInfo.firstId]);
      setCurrentCursor({
        startingAfter: paginationInfo.lastId,
        endingBefore: null,
      });
    }
  };

  const handlePrevPage = () => {
    const prevEntry = cursorHistory[cursorHistory.length - 1];
    if (prevEntry) {
      // Remove last entry from history
      setCursorHistory((prev) => prev.slice(0, -1));
      setCurrentCursor({
        startingAfter: null,
        endingBefore: prevEntry,
      });
    } else {
      // Back to first page
      setCurrentCursor({
        startingAfter: null,
        endingBefore: null,
      });
    }
  };

  const filteredPayments = (payments || []).filter(
    (payment) =>
      (payment.customer?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (payment.customer?.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "succeeded":
        return <CheckCircle2 size={14} className="mr-1.5" />;
      case "pending":
      case "processing":
        return <Clock size={14} className="mr-1.5" />;
      case "failed":
      case "canceled":
        return <XCircle size={14} className="mr-1.5" />;
      default:
        return null;
    }
  };

  const openDetails = (payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const DetailRow = ({ icon: Icon, label, value, className = "" }) => {
    if (!value && value !== 0) return null;
    return (
      <div className={cn("flex items-start gap-3 py-2", className)}>
        <Icon size={16} className="text-gray-400 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            {label}
          </p>
          <p className="text-sm text-gray-900 font-medium break-all">{value}</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
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
                <Skeleton className="h-4 w-[60px] bg-white/5" /> {/* ID */}
                <div className="flex items-center gap-3 w-[200px]">
                  <Skeleton className="h-8 w-8 rounded-full bg-white/5" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-[100px] bg-white/5" />
                    <Skeleton className="h-2 w-[140px] bg-white/5" />
                  </div>
                </div>
                <Skeleton className="h-4 w-[150px] flex-1 bg-white/5" />{" "}
                {/* Item */}
                <Skeleton className="h-4 w-[100px] bg-white/5" /> {/* Amount */}
                <Skeleton className="h-6 w-[80px] rounded-full bg-white/5" />{" "}
                {/* Status */}
                <Skeleton className="h-4 w-[100px] bg-white/5" /> {/* Date */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <div className="bg-red-500/10 text-red-500 p-6 rounded-2xl border border-red-500/20 max-w-lg mx-auto">
          <h2 className="text-lg font-bold mb-2">Error Connecting to Stripe</h2>
          <p className="text-sm opacity-90">{error}</p>
          <Button
            onClick={fetchPayments}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Try Again
          </Button>
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
            Payments
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-gray-400 text-sm">
              Track transactions, subscriptions, and billing history.
            </p>
            {lastSynced && (
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter bg-white/5 px-2 py-0.5 rounded-full">
                Last Synced: {lastSynced.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => fetchPayments(currentCursor, true)}
            disabled={isLoading || isSyncing}
            className="bg-[#3EC6EC]/10 hover:bg-[#3EC6EC]/20 text-[#3EC6EC] border border-[#3EC6EC]/20 font-bold rounded-xl h-11 px-6 flex items-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw
              size={18}
              className={cn(isSyncing && "animate-spin-slow")}
            />
            {isSyncing ? "Syncing..." : "Sync from Stripe"}
          </Button>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-[350px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by customer, email or ID..."
              className="pl-10 border-white/10 bg-white focus-visible:ring-[#3EC6EC] rounded-xl h-11 text-white placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 flex items-center gap-2 rounded-xl h-11"
            >
              <Filter size={18} />
              Filters
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-white/5 text-gray-400 uppercase text-[10px] font-semibold tracking-wider">
            <TableRow className="hover:bg-transparent border-white/5 font-outfit">
              <TableHead className="w-[80px] h-10 pl-6 text-gray-400">
                ID
              </TableHead>
              <TableHead className="h-10 text-gray-400">Customer</TableHead>
              <TableHead className="h-10 text-gray-400">
                Product / Item
              </TableHead>
              <TableHead className="h-10 text-gray-400">Amount</TableHead>
              <TableHead className="h-10 text-gray-400">Status</TableHead>
              <TableHead className="text-right h-10 pr-6 text-gray-400">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  onClick={() => openDetails(payment)}
                  className="border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <TableCell className="py-3 pl-6">
                    <span
                      className="font-mono text-[10px] font-medium text-gray-500 group-hover:text-[#3EC6EC] transition-colors"
                      title={payment.id}
                    >
                      {payment.id.substring(0, 8)}...
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-white/10 shrink-0">
                        <AvatarFallback className="bg-[#3EC6EC]/10 text-[#3EC6EC] font-bold text-[9px] uppercase">
                          {(payment.customer?.name || "??")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden max-w-[140px]">
                        <span className="font-semibold text-white truncate text-xs">
                          {payment.customer?.name}
                        </span>
                        <span className="text-[10px] text-gray-500 truncate">
                          {payment.customer?.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col max-w-[200px]">
                      <span
                        className="text-xs font-semibold text-white truncate"
                        title={payment.items?.[0]?.description}
                      >
                        {payment.items?.[0]?.description ||
                          payment.description ||
                          "—"}
                      </span>
                      {payment.items?.length > 1 && (
                        <span className="text-[9px] font-medium text-gray-500">
                          +{payment.items.length - 1} more items
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">
                        {payment.currency} {payment.amount.toFixed(2)}
                      </span>
                      <span className="text-[9px] font-medium text-gray-500 uppercase tracking-tight">
                        {payment.card_brand
                          ? payment.card_brand
                          : payment.method}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-medium uppercase flex items-center w-fit",
                        payment.status?.toLowerCase() === "succeeded"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : ["pending", "processing"].includes(
                                payment.status?.toLowerCase(),
                              )
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20",
                      )}
                      variant="none"
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-right pr-6">
                    <span className="text-xs text-gray-500 font-medium font-outfit">
                      {payment.date}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-gray-400 font-medium"
                >
                  No transactions found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="p-5 border-t border-white/5 bg-white/5 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {isLoading
              ? "Loading..."
              : `Showing ${payments.length} Transactions`}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={
                isLoading ||
                (cursorHistory.length === 0 &&
                  !currentCursor.endingBefore &&
                  !currentCursor.startingAfter)
              }
              size="sm"
              className="rounded-lg h-9 font-bold text-xs uppercase border-white/10 bg-white/5 text-gray-500 hover:text-white"
            >
              Prev
            </Button>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={isLoading || !paginationInfo.hasMore}
              size="sm"
              className="rounded-lg h-9 font-bold text-xs uppercase border-[#3EC6EC]/50 text-[#3EC6EC] bg-[#3EC6EC]/10 hover:bg-[#3EC6EC]/20 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl p-0 bg-[#2D2D2D] border border-white/10 shadow-2xl">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-white/5 sticky top-0 bg-[#2D2D2D] z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold font-outfit text-white">
                Payment Details
              </DialogTitle>
            </div>
            {selectedPayment && (
              <div className="flex items-center gap-3 mt-3">
                <Badge
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold uppercase",
                    selectedPayment.status?.toLowerCase() === "succeeded"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : ["pending", "processing"].includes(
                            selectedPayment.status?.toLowerCase(),
                          )
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20",
                  )}
                >
                  {selectedPayment.status}
                </Badge>
                <span className="text-2xl font-bold text-white">
                  {selectedPayment.currency} {selectedPayment.amount.toFixed(2)}
                </span>
              </div>
            )}
          </DialogHeader>

          {selectedPayment && (
            <div className="px-6 py-4 space-y-6">
              {/* Items Purchased Section */}
              {selectedPayment.items && selectedPayment.items.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#3EC6EC] mb-3">
                    Items Purchased
                  </h3>
                  <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                    <Table>
                      <TableHeader className="bg-white/5">
                        <TableRow className="hover:bg-transparent border-none">
                          <TableHead className="h-9 text-[10px] font-bold uppercase text-gray-400">
                            Item
                          </TableHead>
                          <TableHead className="h-9 text-[10px] font-bold uppercase text-right text-gray-400">
                            Qty
                          </TableHead>
                          <TableHead className="h-9 text-[10px] font-bold uppercase text-right pr-4 text-gray-400">
                            Price
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPayment.items.map((item, idx) => (
                          <TableRow
                            key={idx}
                            className="hover:bg-transparent border-white/5"
                          >
                            <TableCell className="py-2 text-sm font-medium text-white">
                              {item.description}
                            </TableCell>
                            <TableCell className="py-2 text-sm text-gray-400 text-right">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="py-2 text-sm font-bold text-white text-right pr-4">
                              {selectedPayment.currency}{" "}
                              {item.amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {/* Transaction Info */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#3EC6EC] mb-3">
                  Transaction Info
                </h3>
                <div className="bg-white/5 rounded-xl p-4 space-y-1">
                  <DetailRow
                    icon={Hash}
                    label="Charge ID"
                    value={selectedPayment.id}
                  />
                  <DetailRow
                    icon={Hash}
                    label="Payment Intent"
                    value={selectedPayment.payment_intent}
                  />
                  <DetailRow
                    icon={Calendar}
                    label="Date"
                    value={selectedPayment.date}
                  />
                  <DetailRow
                    icon={FileText}
                    label="Description"
                    value={selectedPayment.description}
                  />
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#3EC6EC] mb-3">
                  Customer Info
                </h3>
                <div className="bg-white/5 rounded-xl p-4 space-y-1">
                  <DetailRow
                    icon={User}
                    label="Name"
                    value={selectedPayment.customer?.name}
                  />
                  <DetailRow
                    icon={Mail}
                    label="Email"
                    value={selectedPayment.customer?.email}
                  />
                  <DetailRow
                    icon={Phone}
                    label="Phone"
                    value={selectedPayment.customer?.phone}
                  />
                </div>
              </div>

              {/* Billing Address */}
              {selectedPayment.billing_address &&
                (selectedPayment.billing_address.line1 ||
                  selectedPayment.billing_address.city) && (
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#3EC6EC] mb-3">
                      Billing Address
                    </h3>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="text-gray-400 mt-0.5 shrink-0"
                        />
                        <div>
                          {selectedPayment.billing_address.line1 && (
                            <p className="text-sm text-white">
                              {selectedPayment.billing_address.line1}
                            </p>
                          )}
                          {selectedPayment.billing_address.line2 && (
                            <p className="text-sm text-white">
                              {selectedPayment.billing_address.line2}
                            </p>
                          )}
                          <p className="text-sm text-white">
                            {[
                              selectedPayment.billing_address.city,
                              selectedPayment.billing_address.state,
                              selectedPayment.billing_address.postal_code,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                          {selectedPayment.billing_address.country && (
                            <p className="text-sm text-gray-400">
                              {selectedPayment.billing_address.country}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Payment Method */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#3EC6EC] mb-3">
                  Payment Method
                </h3>
                <div className="bg-white/5 rounded-xl p-4 space-y-1">
                  <DetailRow
                    icon={CreditCard}
                    label="Card"
                    value={
                      selectedPayment.card_brand && selectedPayment.card_last4
                        ? `${selectedPayment.card_brand.toUpperCase()} •••• ${selectedPayment.card_last4}`
                        : selectedPayment.method
                    }
                  />
                  {selectedPayment.card_exp_month &&
                    selectedPayment.card_exp_year && (
                      <DetailRow
                        icon={Calendar}
                        label="Expiry"
                        value={`${selectedPayment.card_exp_month}/${selectedPayment.card_exp_year}`}
                      />
                    )}
                  <DetailRow
                    icon={Tag}
                    label="Card Type"
                    value={selectedPayment.card_funding}
                  />
                  <DetailRow
                    icon={MapPin}
                    label="Card Country"
                    value={selectedPayment.card_country}
                  />
                </div>
              </div>

              {/* Risk & Security */}
              {(selectedPayment.risk_level ||
                selectedPayment.seller_message) && (
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#3EC6EC] mb-3">
                    Risk & Security
                  </h3>
                  <div className="bg-white/5 rounded-xl p-4 space-y-1">
                    <DetailRow
                      icon={Shield}
                      label="Risk Level"
                      value={selectedPayment.risk_level}
                    />
                    <DetailRow
                      icon={AlertTriangle}
                      label="Risk Score"
                      value={selectedPayment.risk_score}
                    />
                    <DetailRow
                      icon={CheckCircle2}
                      label="Outcome"
                      value={selectedPayment.seller_message}
                    />
                  </div>
                </div>
              )}

              {/* Refund Status */}
              {selectedPayment.refunded && (
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-3">
                    Refund Info
                  </h3>
                  <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-500/20">
                    <p className="text-sm text-rose-400 font-medium">
                      Refunded: {selectedPayment.currency}{" "}
                      {selectedPayment.amount_refunded.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {/* Metadata */}
              {selectedPayment.metadata &&
                Object.keys(selectedPayment.metadata).length > 0 && (
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#3EC6EC] mb-3">
                      Metadata
                    </h3>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="space-y-2">
                        {Object.entries(selectedPayment.metadata).map(
                          ([key, value]) => (
                            <div key={key} className="flex items-start gap-3">
                              <Tag
                                size={14}
                                className="text-gray-500 mt-1 shrink-0"
                              />
                              <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                  {key}
                                </p>
                                <p className="text-sm text-white font-medium">
                                  {String(value)}
                                </p>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {selectedPayment.receipt_url && (
                  <Button
                    onClick={() =>
                      window.open(selectedPayment.receipt_url, "_blank")
                    }
                    className="flex-1 bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white font-bold rounded-xl"
                  >
                    <Receipt size={16} className="mr-2" />
                    View Receipt
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsOpen(false)}
                  className="flex-1 border-white/10 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 font-bold rounded-xl"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsPage;
