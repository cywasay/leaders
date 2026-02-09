import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FIELDS = {
  healthcare: {
    showHipaa: true,
    showPolicies: true,
    showDisclaimer: true,
    fields: [],
  },
  impact: {
    showHipaa: false,
    showPolicies: false,
    showDisclaimer: false,
    fields: [
      {
        id: "public_email",
        label: "Public contact email",
        p: "e.g. hello@org.org",
        type: "input",
      },
      {
        id: "inquiry_types",
        label: "Inquiry types to receive",
        p: "e.g. Media, Partnerships, Volunteer",
        type: "input",
      },
    ],
  },
  speaker: {
    showHipaa: false,
    showPolicies: false,
    showDisclaimer: false,
    fields: [
      {
        id: "public_email",
        label: "Public contact email",
        p: "e.g. bookings@johnmaxwell.com",
        type: "input",
      },
      {
        id: "inquiry_types",
        label: "Inquiry types to receive",
        p: "e.g. Speaking, Coaching, Media",
        type: "input",
      },
    ],
  },
  research: {
    showHipaa: false,
    showPolicies: false,
    showDisclaimer: false,
    fields: [
      {
        id: "public_email",
        label: "Public contact email",
        p: "e.g. contact@lab.edu",
        type: "input",
      },
      {
        id: "inquiry_types",
        label: "Inquiry types to receive",
        p: "e.g. Academic, Media, Consulting",
        type: "input",
      },
    ],
  },
  business: {
    showHipaa: false,
    showPolicies: false,
    showDisclaimer: false,
    fields: [
      {
        id: "public_email",
        label: "Public contact email",
        p: "e.g. contact@firm.com",
        type: "input",
      },
      {
        id: "inquiry_types",
        label: "Preferred Inquiry Types",
        p: "e.g. Consulting, Media, Advisory",
        type: "input",
      },
    ],
  },
  tech: {
    showHipaa: false,
    showPolicies: true, // Tech often needs privacy policies
    showDisclaimer: false,
    fields: [
      {
        id: "seo_keywords",
        label: "SEO Keywords",
        p: "e.g. AI platform, scalable infra, dev tools...",
        type: "input",
      },
      {
        id: "target_industries",
        label: "Target Industries / Problems",
        p: "e.g. FinTech, Healthcare data security...",
        type: "input",
      },
      {
        id: "target_regions",
        label: "Target Regions",
        p: "e.g. Global, North America, EMEA...",
        type: "input",
      },
      {
        id: "public_email",
        label: "Public contact email",
        p: "e.g. hello@startup.com",
        type: "input",
      },
    ],
  },
};

const ComplianceSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
  role,
}) => {
  const config = FIELDS[role] || FIELDS.healthcare;
  const policies = [
    { id: "privacy_policy_type", label: "Privacy Policy" },
    { id: "terms_conditions_type", label: "Terms & Conditions" },
  ];

  return (
    <section className="bg-[#3EC6EC]/5 border border-[#3EC6EC]/20 rounded-2xl p-5 sm:p-8 space-y-6">
      <h2 className="text-xl font-bold text-white font-outfit">
        {def?.complianceHeading || "Legal & Compliance"}
      </h2>
      <div className="space-y-6">
        {config.showHipaa && def?.hipaaShow && (
          <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-[#3EC6EC]/20">
            <Checkbox
              id="hipaa"
              checked={formData.hipaa_compliant || false}
              onCheckedChange={(v) => updateFormData({ hipaa_compliant: !!v })}
            />
            <Label htmlFor="hipaa" className="font-bold text-sm text-white">
              {def.hipaaLabel}
            </Label>
          </div>
        )}
        {config.showPolicies && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((p) => (
              <div key={p.id} className="space-y-2">
                <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                  {p.label}
                </Label>
                <Select
                  value={formData[p.id] || "Standard"}
                  onValueChange={(v) => updateFormData({ [p.id]: v })}
                >
                  <SelectTrigger className="bg-[#111111] border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2D2D2D] border-white/10 text-white">
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Custom">I'll provide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}
        {config.showDisclaimer && (
          <div className="space-y-2">
            <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              Medical disclaimer / Legal text
            </Label>
            <Textarea
              value={formData.medical_disclaimer || ""}
              onChange={(e) =>
                updateFormData({ medical_disclaimer: e.target.value })
              }
              placeholder="Privacy notices..."
              className="bg-[#111111] border-white/10 text-white h-24 placeholder:text-gray-400"
            />
          </div>
        )}
        {config.fields.map((f) => (
          <div key={f.id} className="space-y-2">
            <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              {f.label}
            </Label>
            <Input
              value={formData[f.id] || ""}
              onChange={(e) => updateFormData({ [f.id]: e.target.value })}
              placeholder={f.p}
              className="bg-[#111111] border-white/10 text-white h-11 placeholder:text-gray-400"
            />
          </div>
        ))}
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end mt-4">
        <Button
          onClick={() => onSave()}
          disabled={isSaving}
          className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white px-8 font-bold"
        >
          Save Progress
        </Button>
      </div>
    </section>
  );
};
export default ComplianceSection;
