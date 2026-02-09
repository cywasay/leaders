"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ROLE_DEFS } from "./step-two/constants";
import CredentialsSection from "./step-two/CredentialsSection";
import AboutJourneySection from "./step-two/AboutJourneySection";
import ServicesSection from "./step-two/ServicesSection";
import TestimonialsSection from "./step-two/TestimonialsSection";

const StepTwoAuthority = ({
  formData,
  updateFormData,
  onSave,
  isSaving,
  onNext,
}) => {
  const { user } = useAuth();
  const role = formData.category || user?.role || "healthcare";
  const def = ROLE_DEFS[role] || ROLE_DEFS.healthcare;
  const props = { formData, updateFormData, def, onSave, isSaving, role };

  return (
    <div className="space-y-8 pb-10 sm:pb-0">
      <AboutJourneySection {...props} />
      <CredentialsSection {...props} />
      <ServicesSection {...props} />
      <TestimonialsSection {...props} onNext={onNext} />
    </div>
  );
};

export default StepTwoAuthority;
