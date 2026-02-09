"use client";

import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import OnboardingHeader from "./_components/OnboardingHeader";
import StepOneFoundation from "./_components/StepOneFoundation";
import StepTwoAuthority from "./_components/StepTwoAuthority";
import StepThreeFinal from "./_components/StepThreeFinal";
import ProgressSidebar from "./_components/ProgressSidebar";
import SuccessDialog from "./_components/SuccessDialog";
import { apiRequest } from "@/lib/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const OnboardingPage = () => {
  const searchParams = useSearchParams();
  const chargeId = searchParams.get("charge_id");
  const category = searchParams.get("category") || "healthcare";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ category, charge_id: chargeId });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const url = chargeId
          ? `/onboarding?charge_id=${chargeId}`
          : `/onboarding?category=${category}`;

        const progressRes = await apiRequest(url);
        if (progressRes.onboarding) {
          setFormData({
            ...progressRes.onboarding,
            category: progressRes.onboarding.category || category,
            charge_id: chargeId,
          });
          setCurrentStep(progressRes.onboarding.current_step || 1);
        } else {
          setFormData({ category, charge_id: chargeId });
        }
      } catch (error) {
        console.error("Failed to initialize onboarding:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [category, chargeId]);

  // Reset scroll to top of the main container when step changes
  useEffect(() => {
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const saveProgress = async (stepData = {}, next = false) => {
    setIsSaving(true);
    const updatedData = {
      ...formData,
      ...stepData,
      category, // Keep the resemblance category
      charge_id: chargeId, // Unique for this purchase
      current_step: next ? Math.min(currentStep + 1, 3) : currentStep,
    };

    try {
      let body = updatedData;
      let method = "POST";

      // Check for file uploads
      const hasFiles = Object.values(updatedData).some(
        (val) => val instanceof File,
      );

      if (hasFiles) {
        const formData = new FormData();

        // Helper to handle nested files
        const appendNested = (data, prefix = "") => {
          Object.keys(data).forEach((key) => {
            const fullKey = prefix ? `${prefix}[${key}]` : key;
            const value = data[key];

            if (value instanceof File) {
              formData.append(fullKey, value);
            } else if (Array.isArray(value)) {
              // If it's an array, we'll stringify it but also look for files inside it
              // We'll send the array as JSON, and the files separately with a special naming convention
              formData.append(
                fullKey,
                JSON.stringify(
                  value.map((item) => {
                    // If the item is an object, remove File objects so they don't break JSON.stringify
                    if (typeof item === "object" && item !== null) {
                      const cleanItem = { ...item };
                      Object.keys(cleanItem).forEach((k) => {
                        if (cleanItem[k] instanceof File) delete cleanItem[k];
                      });
                      return cleanItem;
                    }
                    return item;
                  }),
                ),
              );

              // Also find files inside the array and append them with a convention like testimonials_0_video
              value.forEach((item, index) => {
                if (typeof item === "object" && item !== null) {
                  Object.keys(item).forEach((k) => {
                    if (item[k] instanceof File) {
                      formData.append(`${key}_${index}_${k}`, item[k]);
                    }
                  });
                }
              });
            } else if (typeof value === "object" && value !== null) {
              formData.append(fullKey, JSON.stringify(value));
            } else if (value !== null && value !== undefined) {
              formData.append(fullKey, value);
            }
          });
        };

        appendNested(updatedData);
        body = formData;
      }

      const data = await apiRequest("/onboarding", {
        method,
        body,
      });
      setFormData(data.onboarding);
      if (next) {
        if (currentStep < 3) {
          nextStep();
          toast.success("Progress saved successfully");
        } else {
          setShowSuccessDialog(true);
        }
      } else {
        toast.success("Progress saved successfully");
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save progress");
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] animate-in fade-in duration-700">
        <header className="h-[200px] bg-[#2D2D2D]/80 border-b border-white/5 flex flex-col items-center justify-center space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-2 w-96 rounded-full" />
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Skeleton className="h-16 w-full rounded-xl" />
              <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl p-8 space-y-8">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-3 w-24 bg-white/5" />
                      <Skeleton className="h-11 w-full rounded-xl bg-white/5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl p-6 space-y-6">
                <Skeleton className="h-10 w-full rounded-xl" />
                <div className="space-y-4 pt-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onSave: saveProgress,
      isSaving,
    };

    switch (currentStep) {
      case 1:
        return (
          <StepOneFoundation
            {...stepProps}
            onNext={() => saveProgress({}, true)}
          />
        );
      case 2:
        return (
          <StepTwoAuthority
            {...stepProps}
            onNext={() => saveProgress({}, true)}
          />
        );
      case 3:
        return (
          <StepThreeFinal
            {...stepProps}
            onNext={() => saveProgress({}, true)}
          />
        );
      default:
        return (
          <StepOneFoundation
            {...stepProps}
            onNext={() => saveProgress({}, true)}
          />
        );
    }
  };

  return (
    <div className="min-h-full bg-[#1A1A1A] pb-10 sm:pb-20 font-outfit">
      <OnboardingHeader currentStep={currentStep} role={formData.category} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-8 order-last lg:order-first space-y-4 sm:space-y-6">
            {/* ALERT - Save Message */}
            <div className="bg-[#3EC6EC]/5 border border-[#3EC6EC]/20 rounded-xl p-3 sm:p-4 flex gap-3 text-xs sm:text-sm text-[#3EC6EC]">
              <Info size={18} className="shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Your responses are saved securely only when you click{" "}
                <span className="font-bold">Save Progress</span> on each
                section.
              </p>
            </div>

            <div className="pb-6 sm:pb-10 lg:pb-0">{renderStep()}</div>
          </div>

          <div className="lg:col-span-4 order-first lg:order-last">
            <ProgressSidebar
              currentStep={currentStep}
              onNext={() => saveProgress({}, true)}
              onBack={prevStep}
              formData={formData}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  );
};

export default OnboardingPage;
