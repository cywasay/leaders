import React from "react";
import {
  Save,
  Link as LinkIcon,
  Mail,
  CreditCard,
  User,
  Heart,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FIELDS = {
  healthcare: [
    {
      id: "booking_url",
      label: "Patient Booking (Jane, SimplePractice)",
      icon: LinkIcon,
    },
    { id: "crm_tool", label: "CRM / Email Tool", icon: Mail },
    {
      id: "payment_processor",
      label: "Payment Processor (Stripe, PayPal)",
      icon: CreditCard,
    },
    { id: "patient_portal_url", label: "Patient Portal URL", icon: User },
  ],
  impact: [
    { id: "donation_link", label: "Donation Link", icon: Heart },
    { id: "newsletter_signup", label: "Newsletter Signup URL", icon: Mail },
    { id: "volunteer_form", label: "Volunteer Form URL", icon: Users },
    {
      id: "event_registration",
      label: "Event Registration Link",
      icon: Calendar,
    },
  ],
  speaker: [
    {
      id: "booking_url",
      label: "Booking Link (Calendly, etc.)",
      icon: LinkIcon,
    },
    { id: "crm_tool", label: "Email Marketing Tool", icon: Mail },
    {
      id: "payment_processor",
      label: "Payment Links (Stripe, PayPal)",
      icon: CreditCard,
    },
  ],
  research: [
    {
      id: "google_scholar",
      label: "Google Scholar Profile",
      icon: LinkIcon,
    },
    { id: "orcid", label: "ORCID Link", icon: LinkIcon },
    { id: "research_gate", label: "ResearchGate Profile", icon: LinkIcon },
    { id: "linkedin", label: "LinkedIn Profile", icon: LinkIcon },
  ],
  business: [
    {
      id: "booking_url",
      label: "Calendar Booking",
      icon: Calendar,
    },
    { id: "crm_tool", label: "Email Capture / Newsletter", icon: Mail },
  ],
  tech: [
    {
      id: "demo_link",
      label: "Demo Request or Booking Link",
      icon: LinkIcon,
    },
    {
      id: "newsletter_signup",
      label: "Newsletter / Updates Signup",
      icon: Mail,
    },
    { id: "github_link", label: "GitHub Profile / Lab", icon: LinkIcon },
    { id: "social_links", label: "LinkedIn / X Links", icon: Users },
  ],
};

const IntegrationsSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
  role,
}) => {
  const fields = FIELDS[role] || FIELDS.healthcare;
  const showSocial = true;
  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-5 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def?.integrationsHeading || "Integrations"}
        </h2>
        {fields.map((f) => (
          <div key={f.id} className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              <f.icon size={14} className="text-[#3EC6EC]" />
              {f.label}
            </Label>
            <Input
              value={formData[f.id] || ""}
              onChange={(e) => updateFormData({ [f.id]: e.target.value })}
              placeholder="https://..."
              className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        ))}
        {showSocial && (
          <div className="space-y-2">
            <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              Social Media Links
            </Label>
            <Textarea
              value={formData.social_links || ""}
              onChange={(e) => updateFormData({ social_links: e.target.value })}
              placeholder="LinkedIn, X, etc."
              className="bg-[#111111] border-white/10 text-white h-20 placeholder:text-gray-400"
            />
          </div>
        )}
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end">
        <Button
          onClick={() => onSave()}
          disabled={isSaving}
          className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white px-8 font-bold"
        >
          <Save size={18} className="mr-2" /> Save Progress
        </Button>
      </div>
    </section>
  );
};
export default IntegrationsSection;
