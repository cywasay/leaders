import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const FoundationStepFooter = ({ onSave, isSaving }) => {
  return (
    <div className="bg-white/5 px-5 sm:px-8 py-5 border-t border-white/5 flex justify-end">
      <Button
        onClick={() => onSave()}
        disabled={isSaving}
        className="w-full sm:w-auto bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white px-8 py-6 sm:py-2 rounded-xl sm:rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-[#3EC6EC]/20"
      >
        <Save size={18} />
        {isSaving ? "Saving..." : "Save Progress"}
      </Button>
    </div>
  );
};

export default FoundationStepFooter;
