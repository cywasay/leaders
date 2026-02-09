import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SpecialtiesSection = ({ formData, updateFormData, def }) => {
  const selectedSpecialties = formData.specialties || [];

  const toggleSpecialty = (specialty) => {
    const newSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter((s) => s !== specialty)
      : [...selectedSpecialties, specialty];
    updateFormData({ specialties: newSpecialties });
  };

  return (
    <div className="space-y-3">
      <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
        {def.specialtyLabel} (Select all that apply)
      </Label>
      <div className="flex flex-wrap gap-2">
        {def.specialtyOptions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleSpecialty(item)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer",
              selectedSpecialties.includes(item)
                ? "bg-[#3EC6EC]/10 border-[#3EC6EC] text-[#3EC6EC]"
                : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20 hover:text-white",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialtiesSection;
