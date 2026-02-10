import React from "react";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Section } from "./Shared";

const PurchaseHistory = ({ purchases }) => {
  return (
    <Section title="Purchase History" icon={ShoppingBag}>
      {purchases.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5"
            >
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">
                    {purchase.currency} {purchase.amount}
                  </span>
                  <Badge
                    className={cn(
                      "h-5 px-1.5 text-[9px] font-bold uppercase",
                      purchase.status === "succeeded"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20",
                    )}
                  >
                    {purchase.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span className="font-mono">#{purchase.id.slice(-8)}</span>
                  <span>•</span>
                  <span>{purchase.date}</span>
                </div>
              </div>
              <div className="p-0">
                {purchase.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center px-4 py-2 text-xs text-gray-300 border-b border-white/5 last:border-0"
                  >
                    <div className="flex-1 truncate pr-2">
                      {item.description}
                    </div>
                    <div className="w-16 text-right font-medium text-white">
                      ${parseFloat(item.amount || purchase.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No purchases found.</p>
      )}
    </Section>
  );
};

export default PurchaseHistory;
