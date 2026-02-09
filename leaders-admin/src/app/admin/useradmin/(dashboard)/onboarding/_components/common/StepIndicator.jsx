import React from "react";
import { cn } from "@/lib/utils";

const StepIndicator = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all",
              step.status === "completed"
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                : step.status === "in-progress"
                  ? "bg-[#3EC6EC] border-[#3EC6EC] text-white shadow-[0_0_10px_rgba(62,198,236,0.3)]"
                  : "bg-white/5 border-white/10 text-gray-600",
            )}
          >
            {step.status === "completed" ? "✓" : idx + 1}
          </div>
          <span
            className={cn(
              "text-sm font-bold transition-all",
              step.status === "pending" ? "text-gray-600" : "text-white",
            )}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
