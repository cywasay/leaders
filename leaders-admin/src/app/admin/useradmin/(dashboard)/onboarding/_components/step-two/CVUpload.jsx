import React from "react";
import { FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const CVUpload = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
        <FileText size={16} className="text-[#3EC6EC]" /> Upload CV (Optional)
      </Label>
      <div
        className={cn(
          "p-6 border-2 border-dashed rounded-2xl transition-all",
          formData.cv || formData.cv_path
            ? "border-[#3EC6EC] bg-[#3EC6EC]/10"
            : "border-white/10 bg-white/5 hover:border-[#3EC6EC]/50",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              formData.cv || formData.cv_path
                ? "bg-[#3EC6EC] text-white"
                : "bg-gray-200 text-gray-500",
            )}
          >
            <FileText size={24} />
          </div>
          <div className="flex-1 text-white text-sm truncate">
            {formData.cv
              ? formData.cv.name
              : formData.cv_path
                ? "CV Uploaded"
                : "No file selected"}
          </div>
          <label
            htmlFor="cv-upload"
            className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:bg-white/10 hover:text-white"
          >
            {formData.cv || formData.cv_path ? "Replace" : "Select File"}
            <input
              id="cv-upload"
              type="file"
              className="hidden"
              onChange={(e) => updateFormData({ cv: e.target.files[0] })}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CVUpload;
