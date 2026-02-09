"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ROLE_DEFS } from "./step-three/constants";
import WebsiteGoalsSection from "./step-three/WebsiteGoalsSection";
import SitemapSection from "./step-three/SitemapSection";
import IntegrationsSection from "./step-three/IntegrationsSection";
import AssetsSection from "./step-three/AssetsSection";
import ComplianceSection from "./step-three/ComplianceSection";
import FinalNotesSection from "./step-three/FinalNotesSection";

const StepThreeFinal = ({ formData, updateFormData, onSave, isSaving }) => {
  const { user } = useAuth();
  const role = formData.category || user?.role || "healthcare";
  const def = ROLE_DEFS[role] || ROLE_DEFS.healthcare;
  const props = { formData, updateFormData, def, onSave, isSaving, role };

  return (
    <div className="space-y-8 pb-10 sm:pb-0">
      <WebsiteGoalsSection {...props} />
      <SitemapSection {...props} />
      <IntegrationsSection {...props} />
      <AssetsSection {...props} />
      <ComplianceSection {...props} />
      <FinalNotesSection {...props} />
    </div>
  );
};
export default StepThreeFinal;
