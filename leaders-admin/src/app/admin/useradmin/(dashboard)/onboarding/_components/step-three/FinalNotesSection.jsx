import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FinalNotesSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
}) => {
  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-5 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def?.notesHeading || "Final Notes"}
        </h2>
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
            Anything else we should know?
          </Label>
          <Textarea
            value={formData.final_notes || ""}
            onChange={(e) => updateFormData({ final_notes: e.target.value })}
            placeholder="Any special requests or details..."
            className="bg-[#111111] border-white/10 text-white min-h-[80px] placeholder:text-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              Competitors you admire
            </Label>
            <Textarea
              value={formData.competitors_admired || ""}
              onChange={(e) =>
                updateFormData({ competitors_admired: e.target.value })
              }
              placeholder="Links or names..."
              className="bg-[#111111] border-white/10 text-white min-h-[60px] placeholder:text-gray-400"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              Deadline expectations
            </Label>
            <Textarea
              value={formData.deadline_expectations || ""}
              onChange={(e) =>
                updateFormData({ deadline_expectations: e.target.value })
              }
              placeholder="e.g. Next month"
              className="bg-[#111111] border-white/10 text-white min-h-[60px] placeholder:text-gray-400"
              rows={2}
            />
          </div>
        </div>
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end">
        <Button
          onClick={() => onSave({}, true)}
          disabled={isSaving}
          className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white px-12 py-6 rounded-xl font-bold"
        >
          {isSaving ? "Completing..." : "Submit & Finish"}
        </Button>
      </div>
    </section>
  );
};
export default FinalNotesSection;
