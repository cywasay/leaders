"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToneOption from "./brand-voice/ToneOption";
import BrandVoiceDetails from "./brand-voice/BrandVoiceDetails";

const ROLE_CONFIG = {
  healthcare: {
    showTones: true,
    tones: [
      { title: "Professional", desc: "Clean, corporate, and authoritative." },
      {
        title: "Warm & Empathetic",
        desc: "Kind, approachable, and patient-centered.",
      },
      { title: "Clinical & Evidence-Based", desc: "Scientific, direct." },
      { title: "Holistic & Calm", desc: "Peaceful, natural, and organic." },
    ],
  },
  impact: {
    showTones: false,
    tones: [],
  },
  tech: {
    showTones: true,
    tones: [
      {
        title: "Innovative & Bold",
        desc: "Visionary, future-thinking, and high-energy.",
      },
      {
        title: "Technical & Precise",
        desc: "Builder-focused, detailed, and accurate.",
      },
      { title: "Minimalist & Clean", desc: "Direct, efficient, and simple." },
      {
        title: "Collaborative",
        desc: "Open-source minded, community-focused.",
      },
    ],
  },
  business: {
    showTones: true,
    tones: [
      {
        title: "Authoritative",
        desc: "Executive, boardroom-ready, and confident.",
      },
      {
        title: "Strategic & Calculated",
        desc: "ROI-focused, analytical, and sharp.",
      },
      {
        title: "Trusted Advisor",
        desc: "Relatable yet expert, steady and calm.",
      },
      {
        title: "Dynamic Leader",
        desc: "Inspiring, growth-oriented, and active.",
      },
    ],
  },
  speaker: {
    showTones: true,
    tones: [
      {
        title: "Inspirational",
        desc: "High-impact, motivating, and storytelling-led.",
      },
      { title: "Educational & Wise", desc: "Teacher-like, patient, and deep." },
      { title: "Charismatic", desc: "Engaging, energetic, and polished." },
      { title: "Direct & Action-Oriented", desc: "Result-focused, no-fluff." },
    ],
  },
  research: {
    showTones: true,
    tones: [
      { title: "Academic", desc: "Formal, precise, and peer-focused." },
      {
        title: "Objective & Analytical",
        desc: "Data-driven, neutral, and logical.",
      },
      { title: "Thought Leader", desc: "Provocative, insightful, and broad." },
      { title: "Educational", desc: "Simplifying complex ideas for all." },
    ],
  },
};

const BrandVoiceStep = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
  onNext,
  role,
}) => {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.healthcare;
  const selectedTones = Array.isArray(formData.brand_tone)
    ? formData.brand_tone
    : formData.brand_tone
      ? formData.brand_tone.split(",").map((t) => t.trim())
      : ["Professional"];
  const [logoPreview, setLogoPreview] = useState(formData.logo_path || null);

  const toggleTone = (tone) => {
    const newTones = selectedTones.includes(tone)
      ? selectedTones.filter((t) => t !== tone)
      : [...selectedTones, tone];
    updateFormData({ brand_tone: newTones.join(", ") });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ logo: file });
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="bg-[#2D2D2D] border border-white/5 font-outfit rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-2 leading-tight font-outfit">
          {def?.voiceHeading || "Brand Voice & Style"}
        </h2>
        {config.showTones && (
          <>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed font-medium">
              Select the tone that best matches your professional approach.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {config.tones.map((tone) => (
                <ToneOption
                  key={tone.title}
                  title={tone.title}
                  desc={tone.desc}
                  isActive={selectedTones.includes(tone.title)}
                  onClick={() => toggleTone(tone.title)}
                />
              ))}
            </div>
          </>
        )}
        {!config.showTones && (
          <p className="text-gray-400 text-sm mb-6">
            Upload your headshot and organization logo.
          </p>
        )}
        <BrandVoiceDetails
          formData={formData}
          updateFormData={updateFormData}
          logoPreview={logoPreview}
          setLogoPreview={setLogoPreview}
          handleLogoChange={handleLogoChange}
          showBrandColors={config.showTones}
        />
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end">
        <Button
          onClick={() => onNext()}
          disabled={isSaving}
          className="w-full sm:w-auto bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white px-8 h-11 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#3EC6EC]/20"
        >
          <Save size={18} /> {isSaving ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </section>
  );
};

export default BrandVoiceStep;
