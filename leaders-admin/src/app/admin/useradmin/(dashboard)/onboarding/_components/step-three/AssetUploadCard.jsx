import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const AssetUploadCard = ({
  id,
  title,
  subtitle,
  icon,
  file,
  path,
  onFileChange,
  onRemove,
  accept,
}) => (
  <div
    className={cn(
      "border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all relative group",
      file || path
        ? "border-[#3EC6EC] bg-[#3EC6EC]/10"
        : "border-white/10 bg-white/5 hover:border-[#3EC6EC]/50",
    )}
  >
    {(file || path) && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    )}
    <div
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
        file || path ? "bg-[#3EC6EC] text-white" : "bg-white/10 text-gray-500",
      )}
    >
      {icon}
    </div>
    <div className="text-center">
      <p className="font-bold text-white text-sm">{title}</p>
      <p className="text-[10px] text-gray-500 mb-3">{subtitle}</p>
      <label
        htmlFor={id}
        className="cursor-pointer px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all block"
      >
        {file || path ? "Replace File" : "Select File"}
        <input
          id={id}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => onFileChange(e.target.files[0])}
        />
      </label>
    </div>
    {file && (
      <div className="mt-2 text-[9px] text-[#3EC6EC] truncate max-w-full italic">
        {file.name}
      </div>
    )}
  </div>
);

export default AssetUploadCard;
