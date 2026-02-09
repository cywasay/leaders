import React from "react";
import { cn } from "@/lib/utils";

const ToneOption = ({ title, desc, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 sm:p-5 border-2 rounded-2xl cursor-pointer transition-all group relative",
        isActive
          ? "border-[#3EC6EC] bg-[#3EC6EC]/10"
          : "border-white/5 bg-white/5 hover:border-white/10",
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <h3
          className={cn(
            "font-bold transition-colors text-sm sm:text-base",
            isActive ? "text-[#3EC6EC]" : "text-white",
          )}
        >
          {title}
        </h3>
        <div
          className={cn(
            "w-4 h-4 rounded border flex items-center justify-center transition-all mt-0.5",
            isActive ? "bg-[#3EC6EC] border-[#3EC6EC]" : "border-white/20",
          )}
        >
          {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
        </div>
      </div>
      <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-2">
        {desc}
      </p>
    </div>
  );
};

export default ToneOption;
