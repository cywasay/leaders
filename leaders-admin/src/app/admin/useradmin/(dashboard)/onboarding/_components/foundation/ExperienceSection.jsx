import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ExperienceSection = ({ formData, updateFormData, role, def }) => {
  const isHealthcare = role === "healthcare";
  const useTextarea = !isHealthcare; // Use textarea for more descriptive roles

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className={isHealthcare ? "space-y-2" : "md:col-span-2 space-y-2"}>
        <Label
          htmlFor="credentials"
          className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1"
        >
          {def?.experienceLabel || "Credentials"}
        </Label>
        {useTextarea ? (
          <Textarea
            id="credentials"
            value={formData.credentials || ""}
            onChange={(e) => updateFormData({ credentials: e.target.value })}
            placeholder={
              def?.experiencePlaceholder || "Describe your background..."
            }
            className="bg-[#111111] border-white/10 text-white min-h-[100px] placeholder:text-gray-400"
          />
        ) : (
          <Input
            id="credentials"
            value={formData.credentials || ""}
            onChange={(e) => updateFormData({ credentials: e.target.value })}
            placeholder={def?.experiencePlaceholder || "e.g. MD, PhD"}
            className="bg-[#111111] border-white/10 text-white h-11 placeholder:text-gray-400"
          />
        )}
      </div>
      {isHealthcare && (
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
            Years of Experience
          </Label>
          <Select
            value={formData.years_experience || "0-2"}
            onValueChange={(v) => updateFormData({ years_experience: v })}
          >
            <SelectTrigger className="w-full h-11 bg-[#111111] border-white/10 text-white">
              <SelectValue placeholder="Select years" />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2D2D] border-white/10 text-white">
              {["0-2 years", "3-5 years", "5-10 years", "10+ years"].map(
                (y) => (
                  <SelectItem key={y} value={y.replace(" years", "")}>
                    {y}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
export default ExperienceSection;
