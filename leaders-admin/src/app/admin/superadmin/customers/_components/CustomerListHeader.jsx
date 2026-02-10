import React from "react";
import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CustomerListHeader = ({ isSyncing, onSync }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold font-outfit text-white">Customers</h1>
        <p className="text-gray-400 text-sm mt-1">
          View and manage healthcare practitioners.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onSync}
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
  );
};

export default CustomerListHeader;
