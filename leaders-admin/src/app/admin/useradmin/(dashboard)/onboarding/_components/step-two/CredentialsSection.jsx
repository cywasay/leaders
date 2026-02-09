import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CVUpload from "./CVUpload";

const FIELDS = {
  healthcare: [
    {
      id: "education",
      label: "Education & Training",
      p: "Degrees and institutions...",
      type: "textarea",
      rows: 2,
    },
    {
      id: "certifications",
      label: "Certifications / Licenses",
      p: "e.g. State Medical License",
      type: "input",
    },
    {
      id: "board_certifications",
      label: "Board Certifications",
      p: "e.g. American Board...",
      type: "input",
    },
    {
      id: "memberships",
      label: "Memberships (AASM, APA, etc.)",
      p: "e.g. APA, AASM",
      type: "input",
    },
    {
      id: "awards",
      label: "Awards / Recognitions",
      p: "e.g. Best Researcher 2023",
      type: "input",
    },
    {
      id: "media_features",
      label: "Media features (logos or names)",
      p: "e.g. CNN, NYT",
      type: "input",
    },
  ],
  impact: [
    {
      id: "key_achievements",
      label: "Key achievements or outcomes",
      p: "Major milestones.",
      type: "textarea",
      rows: 3,
    },
    {
      id: "numbers_impact",
      label: "Numbers served, funds raised, policy changes",
      p: "e.g. 10,000 people served",
      type: "textarea",
      rows: 2,
    },
    {
      id: "partner_orgs",
      label: "Partner Organizations",
      p: "e.g. Red Cross, UNICEF",
      type: "input",
    },
    {
      id: "grants_funding",
      label: "Grants or Funding",
      p: "e.g. Ford Foundation",
      type: "input",
    },
    {
      id: "media_coverage",
      label: "Media Coverage",
      p: "e.g. Featured on BBC",
      type: "input",
    },
    {
      id: "awards",
      label: "Awards or Acknowledgments",
      p: "e.g. Nobel nomination",
      type: "input",
    },
  ],
  speaker: [
    {
      id: "certifications",
      label: "Certifications",
      p: "e.g. ICF PCC, CPTD",
      type: "textarea",
      rows: 2,
    },
    {
      id: "training_programs",
      label: "Training Programs Completed",
      p: "e.g. Tony Robbins Mastery",
      type: "textarea",
      rows: 2,
    },
    {
      id: "affiliations",
      label: "Professional Affiliations",
      p: "e.g. NSA, Forbes Council",
      type: "input",
    },
    {
      id: "media_features",
      label: "Media Features",
      p: "e.g. Forbes, HBR",
      type: "input",
    },
    {
      id: "podcasts",
      label: "Podcast Appearances",
      p: "e.g. School of Greatness",
      type: "input",
    },
    {
      id: "past_clients",
      label: "Past Clients / Organizations",
      p: "e.g. Google, Nike",
      type: "input",
    },
  ],
  research: [
    {
      id: "degrees",
      label: "Highest degree(s) & Specialization",
      p: "e.g. PhD in Neuroscience...",
      type: "textarea",
      rows: 2,
    },
    {
      id: "certifications",
      label: "Certifications / Appointments",
      p: "e.g. Fellow of Royal Society",
      type: "textarea",
      rows: 2,
    },
    {
      id: "awards",
      label: "Awards & Honors",
      p: "e.g. Nobel Prize, Field Medal",
      type: "input",
    },
    {
      id: "grants",
      label: "Grants / Funded Research",
      p: "e.g. NSF Grant 2024",
      type: "input",
    },
    {
      id: "press_mentions",
      label: "Press Mentions",
      p: "e.g. NYT, Nature Journal",
      type: "input",
    },
  ],
  business: [
    {
      id: "board_roles",
      label: "Board Roles / Advisory Positions",
      p: "e.g. Board Member at Acme",
      type: "textarea",
      rows: 2,
    },
    {
      id: "media_mentions",
      label: "Media Mentions",
      p: "e.g. WSJ, CNBC",
      type: "input",
    },
    {
      id: "publications",
      label: "Publications / Thought Leadership",
      p: "e.g. HBR Article, Book",
      type: "input",
    },
    {
      id: "speaking_engagements",
      label: "Speaking Engagements",
      p: "e.g. Davos, TEDx",
      type: "input",
    },
  ],
  tech: [
    {
      id: "publications",
      label: "Publications (Papers, Blogs, Whitepapers)",
      p: "e.g. Medium articles, arXiv papers...",
      type: "textarea",
      rows: 2,
    },
    {
      id: "conferences",
      label: "Conferences / Talks",
      p: "e.g. AWS re:Invent, QCon speaker...",
      type: "input",
    },
    {
      id: "open_source",
      label: "Open-source Contributions",
      p: "GitHub links or project names...",
      type: "input",
    },
    {
      id: "media_awards",
      label: "Media Mentions or Awards",
      p: "e.g. TechCrunch, Forbes 30u30...",
      type: "input",
    },
  ],
};

const CredentialsSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
  role,
}) => {
  const fields = FIELDS[role] || FIELDS.healthcare;
  const showCV = role === "healthcare";
  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-5 sm:p-8 space-y-5">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def?.authorityHeading || "Credentials & Authority"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div
              key={f.id}
              className={
                f.type === "textarea" ? "md:col-span-2 space-y-2" : "space-y-2"
              }
            >
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
                  className="bg-[#111111] border-white/10 text-white h-10 placeholder:text-gray-400"
                />
              )}
            </div>
          ))}
        </div>
        {showCV && (
          <CVUpload formData={formData} updateFormData={updateFormData} />
        )}
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
export default CredentialsSection;
