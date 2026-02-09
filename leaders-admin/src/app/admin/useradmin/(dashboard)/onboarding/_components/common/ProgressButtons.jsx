import React from "react";
import { ChevronLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProgressButtons = ({ currentStep, onNext, onBack, isSaving }) => {
  const getButtonText = () => {
    if (isSaving) return "Saving...";
    if (currentStep === 3) return "Submit & Finish";
    return "Save & Continue";
  };

  return (
    <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
      <Button
        onClick={() => onNext()}
        disabled={isSaving}
        className="w-full bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white font-bold h-14 rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#3EC6EC]/20"
      >
        {isSaving ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            {currentStep === 3 && <Sparkles size={18} />}
            {getButtonText()}
            {currentStep < 3 && <ArrowRight size={18} />}
          </>
        )}
      </Button>
      {currentStep > 1 && (
        <Button
          onClick={() => onBack()}
          variant="outline"
          className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-gray-400 font-bold hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft size={18} className="mr-1" /> Go Back
        </Button>
      )}
      <p className="text-xs text-center text-gray-500 leading-relaxed px-4 pt-2 font-medium">
        Takes about <span className="font-bold text-gray-400">5 minutes</span>{" "}
        to complete.
      </p>
    </div>
  );
};

export default ProgressButtons;
