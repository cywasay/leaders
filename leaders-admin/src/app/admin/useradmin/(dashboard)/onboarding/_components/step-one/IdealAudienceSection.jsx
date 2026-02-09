import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const IdealAudienceSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
}) => {
  const selectedAudiences = formData.ideal_audience || [];

  const toggleAudience = (tag) => {
    const newAudiences = selectedAudiences.includes(tag)
      ? selectedAudiences.filter((t) => t !== tag)
      : [...selectedAudiences, tag];
    updateFormData({ ideal_audience: newAudiences });
  };

  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def.audienceTitle}
        </h2>
        <p className="text-gray-400 text-sm font-medium">{def.audienceDesc}</p>
        <div className="space-y-3">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
            {def.audienceQuestion}
          </Label>
          <div className="flex flex-wrap gap-2">
            {def.audienceOptions.map((tag) => (
              <span
                key={tag}
                onClick={() => toggleAudience(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer",
                  selectedAudiences.includes(tag)
                    ? "bg-[#3EC6EC]/10 border-[#3EC6EC] text-[#3EC6EC]"
                    : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20 hover:text-white",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
            {def.problemLabel}
          </Label>
          <Textarea
            value={formData.patient_problem || ""}
            onChange={(e) =>
              updateFormData({ patient_problem: e.target.value })
            }
            rows={3}
            placeholder={def.problemPlaceholder}
            className="bg-[#111111] border-white/10 text-white min-h-[100px] placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
            {def.nicheLabel}
          </Label>
          <Input
            value={formData.niche_focus || ""}
            onChange={(e) => updateFormData({ niche_focus: e.target.value })}
            placeholder={def.nichePlaceholder}
            className="bg-[#111111] border-white/10 text-white h-11 placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end">
        <Button
          onClick={() => onSave()}
          disabled={isSaving}
          className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white px-8 font-bold"
        >
          <Save size={18} className="mr-2" /> Save Progress
        </Button>
      </div>
    </section>
  );
};

export default IdealAudienceSection;
