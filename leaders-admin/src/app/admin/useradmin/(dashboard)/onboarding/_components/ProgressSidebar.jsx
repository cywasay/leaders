"use client";

import React from "react";
import StepIndicator from "./common/StepIndicator";
import ProgressButtons from "./common/ProgressButtons";

const ProgressSidebar = ({ currentStep, onNext, onBack, isSaving }) => {
  const stepLabels = ["My Foundation", "My Story & Trust", "Website Features"];
  const steps = stepLabels.map((label, idx) => ({
    label,
    status:
      currentStep > idx + 1
        ? "completed"
        : currentStep === idx + 1
          ? "in-progress"
          : "pending",
  }));

  const completion =
    currentStep === 1 ? "33%" : currentStep === 2 ? "66%" : "100%";

  return (
    <div className="lg:col-span-4 h-fit lg:sticky lg:top-40">
      <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between font-outfit">
          Progress
          <span className="bg-[#3EC6EC] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            {completion} Ready
          </span>
        </h3>
        <StepIndicator steps={steps} />
        <ProgressButtons
          currentStep={currentStep}
          onNext={onNext}
          onBack={onBack}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default ProgressSidebar;
