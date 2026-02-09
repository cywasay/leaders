"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Receipt, Info, ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";

const InvoicesPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href="/admin/useradmin/dashboard">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl sm:rounded-2xl border-white/10 bg-white/5 hover:border-[#3EC6EC] hover:text-[#3EC6EC] text-gray-400 transition-all h-10 w-10 sm:h-12 sm:w-12"
            >
              <ArrowLeft size={18} className="sm:size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-outfit">
              Invoices
            </h1>
            <p className="text-gray-400 mt-1 font-medium text-sm sm:text-base">
              Manage your billing history and service receipts.
            </p>
          </div>
        </div>
        <Button className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white rounded-xl sm:rounded-2xl font-bold px-5 sm:px-6 h-11 sm:h-12 shadow-lg shadow-[#3EC6EC]/20 flex items-center gap-2 w-full sm:w-auto justify-center">
          <FileText size={16} className="sm:size-[18px]" />
          <span className="text-sm sm:text-base">Download Summary</span>
        </Button>
      </div>

      {/* Stats/Quick Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#2D2D2D] p-6 rounded-2xl border border-white/5 shadow-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Receipt size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Active Plan
            </p>
            <h4 className="font-bold text-white">Healthcare Premium</h4>
          </div>
        </div>
        <div className="bg-[#2D2D2D] p-6 rounded-2xl border border-white/5 shadow-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Info size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Next Billing
            </p>
            <h4 className="font-bold text-white">Pending Development</h4>
          </div>
        </div>
      </div>

      {/* Empty State / Coming Soon */}
      <div className="bg-[#2D2D2D] rounded-2xl border border-white/5 p-8 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden group">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#3EC6EC]/10 rounded-2xl flex items-center justify-center mx-auto mb-2 text-[#3EC6EC] transform group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-[#3EC6EC]/10 border border-white/5">
          <Receipt size={32} className="sm:size-10" strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit">
            No invoices yet
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto font-medium leading-relaxed">
            Your project is currently in the onboarding stage. Invoices will
            appear here once development begins.
          </p>
        </div>
        <div className="pt-2 sm:pt-4">
          <Button
            variant="outline"
            className="rounded-xl sm:rounded-2xl font-bold px-6 sm:px-8 h-11 sm:h-12 border-white/10 bg-white/5 text-gray-400 uppercase text-[10px] sm:text-xs tracking-widest hover:border-[#3EC6EC] hover:text-[#3EC6EC] transition-all gap-2 w-full sm:w-auto"
          >
            <Info size={16} className="sm:size-[18px]" />
            Billing Support
          </Button>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none text-white">
          <Receipt size={200} />
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
