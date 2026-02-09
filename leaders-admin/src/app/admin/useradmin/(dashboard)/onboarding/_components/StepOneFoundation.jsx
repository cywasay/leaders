"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ROLE_DEFS as STEP_ONE_DEFS } from "./step-one/constants";
import { ROLE_DEFS as FOUNDATION_DEFS } from "./foundation/constants";
import BasicInfoSection from "./foundation/BasicInfoSection";
import ExperienceSection from "./foundation/ExperienceSection";
import SpecialtiesSection from "./foundation/SpecialtiesSection";
import PracticeTypeSection from "./foundation/PracticeTypeSection";
import ContactSection from "./foundation/ContactSection";
import IdealAudienceSection from "./step-one/IdealAudienceSection";
import BrandVoiceStep from "./BrandVoiceStep";

const StepOneFoundation = ({
  formData,
  updateFormData,
  onSave,
  isSaving,
  onNext,
}) => {
  const { user } = useAuth();
  const role = formData.category || user?.role || "healthcare";
  const defF = FOUNDATION_DEFS[role] || FOUNDATION_DEFS.healthcare;
  const defS1 = STEP_ONE_DEFS[role] || STEP_ONE_DEFS.healthcare;
  const props = { formData, updateFormData, onSave, isSaving };

  return (
    <div className="space-y-8">
      <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white font-outfit">
          {defF.basicHeading || "Basic Info"}
        </h2>
        <BasicInfoSection {...props} def={defF} />
        <ExperienceSection {...props} def={defF} role={role} />
        <SpecialtiesSection {...props} def={defF} />
        <PracticeTypeSection {...props} def={defF} />
      </section>
      <ContactSection {...props} def={defF} />
      <IdealAudienceSection {...props} def={defS1} />
      <BrandVoiceStep {...props} def={defS1} role={role} onNext={onNext} />
    </div>
  );
};
export default StepOneFoundation;
