"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ROLE_DEFS } from "./foundation/constants";
import BasicInfoSection from "./foundation/BasicInfoSection";
import ExperienceSection from "./foundation/ExperienceSection";
import SpecialtiesSection from "./foundation/SpecialtiesSection";
import PracticeTypeSection from "./foundation/PracticeTypeSection";
import ContactSection from "./foundation/ContactSection";
import FoundationStepFooter from "./foundation/FoundationStepFooter";

const FoundationStep = ({ formData, updateFormData, onSave, isSaving }) => {
  const { user } = useAuth();
  const role = user?.role || "healthcare";
  const def = ROLE_DEFS[role] || ROLE_DEFS.healthcare;

  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-white leading-tight font-outfit">
            {def.title}
          </h2>
        </div>

        <div className="space-y-6">
          <BasicInfoSection
            formData={formData}
            updateFormData={updateFormData}
            def={def}
          />
          <ExperienceSection
            formData={formData}
            updateFormData={updateFormData}
            role={role}
          />
          <SpecialtiesSection
            formData={formData}
            updateFormData={updateFormData}
            def={def}
          />
          <PracticeTypeSection
            formData={formData}
            updateFormData={updateFormData}
            def={def}
          />
        </div>
      </div>

      <ContactSection
        formData={formData}
        updateFormData={updateFormData}
        def={def}
      />

      <FoundationStepFooter onSave={onSave} isSaving={isSaving} />
    </section>
  );
};

export default FoundationStep;
