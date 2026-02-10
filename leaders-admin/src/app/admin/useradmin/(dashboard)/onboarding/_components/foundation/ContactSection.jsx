import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Mail, Phone, MapPin, Globe, Clock } from "lucide-react";

const ContactSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
}) => {
  const IconMap = { Mail, Phone, MapPin, Globe, Clock };
  const AddressIcon = IconMap[def.addressIcon] || MapPin;

  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-5 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def.contactHeading || "Contact & Locations"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              <Mail size={14} className="text-[#3EC6EC]" /> Primary Email *
            </Label>
            <Input
              type="email"
              value={formData.primary_email || ""}
              onChange={(e) =>
                updateFormData({ primary_email: e.target.value })
              }
              placeholder={def.emailPlaceholder}
              className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              <Phone size={14} className="text-[#3EC6EC]" /> Phone Number *
            </Label>
            <Input
              value={formData.contact_phone || ""}
              onChange={(e) =>
                updateFormData({ contact_phone: e.target.value })
              }
              placeholder="e.g. +1 (555) 000-0000"
              className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
            <AddressIcon size={14} className="text-[#3EC6EC]" />{" "}
            {def.addressLabel}
          </Label>
          <Input
            value={formData.practice_address || ""}
            onChange={(e) =>
              updateFormData({ practice_address: e.target.value })
            }
            placeholder="Street, City, State, Zip"
            className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              <Globe size={14} className="text-[#3EC6EC]" /> States / Regions
              Served
            </Label>
            <Input
              value={formData.states_served || ""}
              onChange={(e) =>
                updateFormData({ states_served: e.target.value })
              }
              placeholder="e.g. California, New York"
              className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              <Clock size={14} className="text-[#3EC6EC]" /> Timezone
            </Label>
            <Input
              value={formData.timezone || ""}
              onChange={(e) => updateFormData({ timezone: e.target.value })}
              placeholder="e.g. EST, PST"
              className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
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
export default ContactSection;
