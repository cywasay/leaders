import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const FIELDS = {
  healthcare: [
    {
      id: "short_bio",
      label: "Short bio (2–3 lines) *",
      p: "A high-impact summary.",
      type: "textarea",
    },
    {
      id: "full_story",
      label: "Long bio (paragraphs)",
      p: "Your background.",
      type: "textarea",
      rows: 4,
    },
    {
      id: "why_this_work",
      label: "Why you do this work?",
      p: "What drives you?",
      type: "textarea",
      rows: 3,
    },
    {
      id: "personal_mission",
      label: "Personal mission (optional)",
      p: "Principles.",
      type: "textarea",
      rows: 2,
    },
  ],
  impact: [
    {
      id: "current_programs",
      label: "Current programs or campaigns",
      p: "Describe active initiatives.",
      type: "textarea",
      rows: 3,
    },
    {
      id: "past_initiatives",
      label: "Past initiatives",
      p: "Previous programs.",
      type: "textarea",
      rows: 2,
    },
    {
      id: "geographic_reach",
      label: "Geographic reach",
      p: "e.g. Local, national, international",
      type: "input",
    },
  ],
  speaker: [
    {
      id: "signature_topics",
      label: "Signature Topics (Top 3-5)",
      p: "e.g. Leadership, Resilience, Future of Work",
      type: "textarea",
      rows: 3,
    },
    {
      id: "results_impact",
      label: "Client Outcomes / Results",
      p: "Transformations you have facilitated...",
      type: "textarea",
      rows: 3,
    },
    {
      id: "case_studies",
      label: "Case Studies (Optional)",
      p: "Brief success stories...",
      type: "textarea",
      rows: 2,
    },
  ],
  research: [
    {
      id: "research_focus",
      label: "Research & Writing Focus",
      p: "Core themes and the problems you address...",
      type: "textarea",
      rows: 3,
    },
    {
      id: "ongoing_work",
      label: "Ongoing or upcoming work",
      p: "Current book projects, grants, or papers...",
      type: "textarea",
      rows: 3,
    },
    {
      id: "impact_statement",
      label: "Who your work serves (Impact)",
      p: "Academia, industry, policy, public...",
      type: "textarea",
      rows: 2,
    },
  ],
  business: [
    {
      id: "career_milestones",
      label: "Key Career Milestones",
      p: "Major roles or events...",
      type: "textarea",
      rows: 2,
    },
    {
      id: "business_outcomes",
      label: "Business Outcomes Driven",
      p: "Growth, exits, turnarounds...",
      type: "textarea",
      rows: 3,
    },
    {
      id: "notable_projects",
      label: "Notable Projects / Engagements",
      p: "Specific deals or initiatives...",
      type: "textarea",
      rows: 2,
    },
  ],
  tech: [
    {
      id: "key_achievements",
      label: "Key Technical / Product Achievements",
      p: "e.g. Led migration to microservices, improved latency by 40%...",
      type: "textarea",
      rows: 3,
    },
    {
      id: "innovation_details",
      label: "Innovation: Patents, Research or Novel Approaches",
      p: "Describe any unique technology or proprietary IP...",
      type: "textarea",
      rows: 3,
    },
    {
      id: "metrics_impact",
      label: "Success Metrics",
      p: "Users, revenue, adoption, specific performance gains...",
      type: "textarea",
      rows: 2,
    },
  ],
};

const AboutJourneySection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
  role,
}) => {
  const fields = FIELDS[role] || FIELDS.healthcare;
  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-5 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def?.aboutHeading || "About Your Journey"}
        </h2>
        {fields.map((f) => (
          <div key={f.id} className="space-y-2">
            <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              {f.label}
            </Label>
            {f.type === "textarea" ? (
              <Textarea
                value={formData[f.id] || ""}
                onChange={(e) => updateFormData({ [f.id]: e.target.value })}
                rows={f.rows || 2}
                placeholder={f.p}
                className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
              />
            ) : (
              <Input
                value={formData[f.id] || ""}
                onChange={(e) => updateFormData({ [f.id]: e.target.value })}
                placeholder={f.p}
                className="bg-[#111111] border-white/10 text-white h-11 placeholder:text-gray-400"
              />
            )}
          </div>
        ))}
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end">
        <Button
          onClick={() => onSave()}
          disabled={isSaving}
          className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white font-bold px-8"
        >
          <Save size={18} className="mr-2" /> Save Progress
        </Button>
      </div>
    </section>
  );
};
export default AboutJourneySection;
