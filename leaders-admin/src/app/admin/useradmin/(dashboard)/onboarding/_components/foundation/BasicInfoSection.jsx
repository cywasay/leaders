import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const BasicInfoSection = ({ formData, updateFormData, def }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-2">
        <Label
          htmlFor="practice_name"
          className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1"
        >
          {def.practiceLabel}
        </Label>
        <Input
          id="practice_name"
          value={formData.practice_name || ""}
          onChange={(e) => updateFormData({ practice_name: e.target.value })}
          placeholder={def.practicePlaceholder}
          className="bg-[#111111] border-white/10 focus-visible:ring-[#3EC6EC] h-11 text-white placeholder:text-gray-400"
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="practitioner_name"
          className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1"
        >
          {def.nameLabel}
        </Label>
        <Input
          id="practitioner_name"
          value={formData.practitioner_name || ""}
          onChange={(e) =>
            updateFormData({ practitioner_name: e.target.value })
          }
          placeholder={def.namePlaceholder}
          className="bg-[#111111] border-white/10 focus-visible:ring-[#3EC6EC] h-11 text-white placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
