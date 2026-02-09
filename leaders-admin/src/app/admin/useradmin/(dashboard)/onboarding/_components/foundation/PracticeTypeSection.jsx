import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PracticeTypeSection = ({ formData, updateFormData, def }) => {
  const fieldName = def.typeField || "practice_type";
  const isMulti = fieldName === "practice_type";

  const selectedValues = Array.isArray(formData[fieldName])
    ? formData[fieldName]
    : formData[fieldName]
      ? [formData[fieldName]]
      : [];

  const toggleValue = (value) => {
    if (isMulti) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      updateFormData({ [fieldName]: newValues });
    } else {
      // Single select for years_experience or other non-multi fields
      updateFormData({ [fieldName]: value });
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
        {def.typeLabel}
      </Label>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
        {def.typeOptions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleValue(item)}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all font-bold text-sm h-12",
              selectedValues.includes(item)
                ? "border-[#3EC6EC] bg-[#3EC6EC]/10 text-[#3EC6EC]"
                : "border-white/5 bg-white/5 text-gray-500 hover:border-white/10 hover:text-white",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PracticeTypeSection;
