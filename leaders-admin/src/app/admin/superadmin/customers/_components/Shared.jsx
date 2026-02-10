import React from "react";
import { Badge } from "@/components/ui/badge";

export const Section = ({ title, icon: Icon, children, className = "" }) => (
  <div
    className={`bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-xl mb-6 ${className}`}
  >
    <div className="p-5 border-b border-white/5 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#3EC6EC]/10 flex items-center justify-center">
        <Icon size={20} className="text-[#3EC6EC]" />
      </div>
      <h3 className="font-bold text-white max-w-[calc(100%-3rem)]">{title}</h3>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

export const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
      {label}
    </p>
    <p className="text-white font-medium break-words">
      {value || <span className="text-gray-500">Not provided</span>}
    </p>
  </div>
);

export const ArrayField = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-2">
      {label}
    </p>
    {Array.isArray(value) && value.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {value.map((item, idx) => (
          <Badge
            key={idx}
            className="bg-[#3EC6EC]/10 text-[#3EC6EC] border-none font-semibold"
          >
            {typeof item === "object"
              ? item.name || JSON.stringify(item)
              : item}
          </Badge>
        ))}
      </div>
    ) : (
      <span className="text-gray-500 text-sm">Not provided</span>
    )}
  </div>
);
