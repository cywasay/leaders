import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  FileText,
  Loader2,
  Building2,
  Mail,
  Globe,
  Award,
  ShoppingBag,
  Calendar,
  CheckCircle2,
  User,
  Image as ImageIcon,
  Download,
  Share2,
  Star,
  Zap,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

// Reusable Editable Field Component for Onboarding
const EditableField = ({
  label,
  value,
  onSave,
  isTextArea = false,
  isArray = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    if (!isEditing) {
      if (isArray && Array.isArray(value)) {
        setCurrentValue(value.join(", "));
      } else {
        setCurrentValue(value || "");
      }
    }
  }, [value, isEditing, isArray]);

  const handleSave = async () => {
    let finalValue = currentValue;
    if (isArray) {
      finalValue = currentValue
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== "");
    }

    // Check if changed
    const originalValue =
      isArray && Array.isArray(value) ? value.join(", ") : value || "";
    if (currentValue === originalValue) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    const success = await onSave(isArray ? finalValue : currentValue);
    setLoading(false);
    if (success) setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (isArray && Array.isArray(value)) {
      setCurrentValue(value.join(", "));
    } else {
      setCurrentValue(value || "");
    }
  };

  return (
    <div className="group relative bg-[#222222]/40 border border-white/5 rounded-xl p-4 transition-all duration-300 hover:bg-[#222222]/80 hover:border-white/10">
      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5 flex items-center justify-between">
        <span>{label}</span>
        {!isEditing && !loading && (
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded transition-all text-[#3EC6EC]"
          >
            <Pencil size={12} />
          </button>
        )}
      </p>

      {loading ? (
        <div className="flex items-center gap-2 py-2">
          <Loader2 size={14} className="animate-spin text-[#3EC6EC]" />
          <span className="text-[10px] text-gray-500 font-bold uppercase">
            Saving...
          </span>
        </div>
      ) : isEditing ? (
        <div className="space-y-2 mt-2">
          {isTextArea ? (
            <Textarea
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="bg-black/40 border-white/20 text-white text-sm min-h-[100px] focus-visible:ring-[#3EC6EC]/30"
              autoFocus
            />
          ) : (
            <Input
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="bg-black/40 border-white/20 text-white h-9 text-sm focus-visible:ring-[#3EC6EC]/30"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && !isArray && handleSave()}
            />
          )}
          {isArray && (
            <p className="text-[10px] text-gray-500 italic mb-2">
              Separate items with commas
            </p>
          )}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-[#3EC6EC] hover:bg-[#3EC6EC]/80 text-black font-bold h-7 px-3 text-xs"
            >
              <Check size={14} className="mr-1" /> Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="text-gray-400 hover:text-white h-7 px-3 text-xs"
            >
              <X size={14} className="mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-1">
          {isArray && Array.isArray(value) && value.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {value.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold text-gray-300 bg-white/5 border border-white/10 rounded px-2.5 py-0.5 tracking-wide uppercase"
                >
                  {typeof item === "object"
                    ? item.name || JSON.stringify(item)
                    : item}
                </span>
              ))}
            </div>
          ) : (
            <p
              className={cn(
                "text-white font-medium break-words text-sm",
                isTextArea ? "leading-relaxed" : "",
              )}
            >
              {value || (
                <span className="text-gray-600 font-normal italic text-sm">
                  Not provided
                </span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Reusable Editable Testimonials Component for Onboarding
const EditableTestimonials = ({ testimonials, onSave, label = "Testimonials / Social Proof" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isEditing) {
      setItems(testimonials || []);
    }
  }, [testimonials, isEditing]);

  const handleSave = async () => {
    setLoading(true);
    const success = await onSave(items);
    setLoading(false);
    if (success) setIsEditing(false);
  };

  const handleUpdateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", title: "", text: "", permission: false }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  return (
    <div className="group relative md:col-span-2">
      <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-3 flex items-center justify-between">
        <span>{label}</span>
        {!isEditing && !loading && (
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded transition-all text-[#3EC6EC]"
          >
            <Pencil size={12} />
          </button>
        )}
      </p>

      {loading ? (
        <div className="flex items-center gap-2 py-2">
          <Loader2 size={14} className="animate-spin text-[#3EC6EC]" />
          <span className="text-[10px] text-gray-500 font-bold uppercase">
            Saving...
          </span>
        </div>
      ) : isEditing ? (
        <div className="space-y-4 mt-2">
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-black/20 border border-white/10 rounded-xl space-y-3 relative">
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 p-1 transition-colors"
              >
                <X size={14} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Name</label>
                  <Input
                    placeholder="Name"
                    value={item.name || ""}
                    onChange={(e) => handleUpdateItem(index, "name", e.target.value)}
                    className="bg-black/20 border-white/10 text-white h-8 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Title / Company</label>
                  <Input
                    placeholder="Title / Company"
                    value={item.title || ""}
                    onChange={(e) => handleUpdateItem(index, "title", e.target.value)}
                    className="bg-black/20 border-white/10 text-white h-8 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase font-bold">Content</label>
                <Textarea
                  placeholder="Testimonial text..."
                  value={item.text || ""}
                  onChange={(e) => handleUpdateItem(index, "text", e.target.value)}
                  className="bg-black/20 border-white/10 text-white text-xs min-h-[60px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`perm-edit-${index}`}
                  checked={!!item.permission}
                  onChange={(e) => handleUpdateItem(index, "permission", e.target.checked)}
                  className="rounded border-white/10 bg-black/20 text-[#3EC6EC] focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                />
                <label htmlFor={`perm-edit-${index}`} className="text-[10px] text-gray-400 cursor-pointer">
                  Permission received
                </label>
              </div>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddItem}
            className="w-full border-dashed border-white/10 text-gray-400 hover:text-white h-8 text-xs bg-transparent"
          >
            + Add Testimonial
          </Button>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-[#3EC6EC] hover:bg-[#3EC6EC]/80 text-black font-bold h-7 px-3 text-xs"
            >
              <Check size={14} className="mr-1" /> Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="text-gray-400 hover:text-white h-7 px-3 text-xs"
            >
              <X size={14} className="mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.isArray(testimonials) && testimonials.length > 0 ? (
            testimonials.map((t, idx) => (
              <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-white text-sm">{t.name || "Anonymous"}</h5>
                    {t.title && <p className="text-xs text-gray-400">{t.title}</p>}
                  </div>
                  {t.permission && (
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[10px]">
                      Permitted
                    </Badge>
                  )}
                </div>
                {t.text && <p className="text-sm text-gray-300 italic">"{t.text}"</p>}
              </div>
            ))
          ) : (
            <span className="text-gray-500 text-sm italic col-span-2">No testimonials provided</span>
          )}
        </div>
      )}
    </div>
  );
};

const getBaseChargeId = (id) => {
  if (!id) return "";
  const parts = id.split("_");
  if (parts.length >= 2) {
    return parts[0] + "_" + parts[1];
  }
  return parts[0];
};

const isMatchingCharge = (chargeId1, chargeId2) => {
  if (!chargeId1 || !chargeId2) return false;
  if (chargeId1 === chargeId2) return true;
  
  const base1 = getBaseChargeId(chargeId1);
  const base2 = getBaseChargeId(chargeId2);
  
  if (base1 !== base2) return false;
  
  const hasLineItem1 = chargeId1.split("_").length > 2;
  const hasLineItem2 = chargeId2.split("_").length > 2;
  
  if (hasLineItem1 && hasLineItem2) {
    return chargeId1 === chargeId2;
  }
  
  return true;
};

// Inner Form Content Component to avoid double rendering block duplication
const FIELD_LABELS = {
  healthcare: {
    practice_name: "Practice / Brand Name",
    practitioner_name: "Practitioner Full Name",
    credentials: "Credentials (MD, PhD, LCSW, etc.)",
    years_experience: "Years of Experience",
    ideal_audience: "Ideal Audience",
    patient_problem: "Top Problem Your Patients Face",
    specialties: "Specialties / Focus Areas",
    practice_type: "Practice Type",
    services: "Services Offered",
    testimonials: "Patient Testimonials",
    booking_url: "Patient Booking (Jane, SimplePractice, etc.)",
    website_goals: "Website Goals",
    required_pages: "Required Pages",
  },
  tech: {
    practice_name: "Company / Startup / Lab name",
    practitioner_name: "Full Name",
    credentials: "Technical Background / Expertise",
    years_experience: "Years of Experience in Tech",
    ideal_audience: "Brand Persona",
    patient_problem: "Core Expertise",
    specialties: "Primary Role",
    practice_type: "Primary Technologies / Stacks",
    services: "Products & Projects",
    testimonials: "Technical Proof",
    booking_url: "Demo Request or Booking Link",
    website_goals: "Primary Website Goal",
    required_pages: "Required Pages",
  },
  business: {
    practice_name: "Company / Firm Name",
    practitioner_name: "Full Name",
    credentials: "Leadership Milestones",
    years_experience: "Organization Size",
    ideal_audience: "Positioning Goal",
    patient_problem: "Strategic Problems You Solve",
    specialties: "Current Title",
    practice_type: "Industries Specialized In",
    services: "Core Consulting Areas",
    testimonials: "Client Endorsements",
    booking_url: "Calendar Booking Link",
    website_goals: "Website Objective",
    required_pages: "Required Pages",
  },
  impact: {
    practice_name: "Organization Name",
    practitioner_name: "Full Name",
    credentials: "Relevant Experience / Roles",
    years_experience: "Years in Impact Work",
    ideal_audience: "Communities / Groups Served",
    patient_problem: "One-line Mission Statement",
    specialties: "Role",
    practice_type: "Primary Cause(s) Worked On",
    services: "Measurable Impact",
    testimonials: "Impact Stories",
    booking_url: "Donation Link",
    website_goals: "Website Purpose",
    required_pages: "Required Pages",
  },
  speaker: {
    practice_name: "Brand Name",
    practitioner_name: "Full Name",
    credentials: "Coaching / Speaking Experience",
    years_experience: "Years of Experience",
    ideal_audience: "Ideal Audience",
    patient_problem: "Key Challenge You Solve",
    specialties: "Professional Title",
    practice_type: "Primary Coaching Niche",
    services: "Coaching / Training Offers",
    testimonials: "Social Proof / Testimonials",
    booking_url: "Booking Tool Link (Calendly, etc.)",
    website_goals: "Website Goals",
    required_pages: "Required Pages",
  },
  research: {
    practice_name: "Institution / Organization",
    practitioner_name: "Full Name",
    credentials: "Academic & Professional Credentials",
    years_experience: "Years of Experience",
    ideal_audience: "Who Your Work Serves",
    patient_problem: "Problems or Questions Addressed",
    specialties: "Professional Title",
    practice_type: "Core Themes Worked On",
    services: "Publications & Teaching",
    testimonials: "Reviews & Impact",
    booking_url: "Academic Profile Link (ORCID, etc.)",
    website_goals: "Website Purpose",
    required_pages: "Required Pages",
  }
};

const SECTION_HEADINGS = {
  healthcare: {
    basic: "Basic Information",
    narrative: "Narrative & Bio",
    strategy: "Digital Strategy & Brand",
    services: "Services & Reviews",
  },
  tech: {
    basic: "Professional Identity",
    narrative: "Personal Brand Direction",
    strategy: "SEO & Discoverability",
    services: "Technical Proof & Products",
  },
  business: {
    basic: "Executive Profile",
    narrative: "Personal Brand Direction",
    strategy: "Contact Preferences & Strategy",
    services: "Services & Endorsements",
  },
  impact: {
    basic: "Leader Identity",
    narrative: "Mission & Cause",
    strategy: "Engagement Tools",
    services: "Impact & Stories",
  },
  speaker: {
    basic: "Professional Identity",
    narrative: "Niche & Audience",
    strategy: "Integrations & Tech",
    services: "Offers & Social Proof",
  },
  research: {
    basic: "Professional Identity",
    narrative: "Research & Writing Focus",
    strategy: "Profiles & Contact",
    services: "Teaching & Publications",
  }
};

// Inner Form Content Component to avoid double rendering block duplication
const OnboardingFormContent = ({ form, handleFieldUpdate, getImageUrl }) => {
  const category = form.category || "healthcare";
  const labels = FIELD_LABELS[category] || FIELD_LABELS.healthcare;
  const headings = SECTION_HEADINGS[category] || SECTION_HEADINGS.healthcare;

  // Identify all fields dynamically that were submitted but aren't in the static display lists below.
  const staticKeys = [
    "practice_name", "practitioner_name", "credentials", "years_experience", "contact_phone", "primary_email",
    "ideal_audience", "patient_problem", "bio_snippet", "specialties", "practice_type",
    "booking_url", "aesthetic_preference", "website_goals", "required_pages", "website_features",
    "services", "testimonials", "social_links"
  ];
  
  const systemKeys = [
    "id", "user_id", "stripe_charge_id", "created_at", "updated_at", "current_step", "category",
    "logo_path", "headshot_path", "cv_path"
  ];

  const additionalFields = Object.entries(form)
    .filter(([key, val]) => {
      if (systemKeys.includes(key) || staticKeys.includes(key)) return false;
      // Filter out empty values
      if (val === null || val === undefined || val === "") return false;
      if (Array.isArray(val) && val.length === 0) return false;
      if (typeof val === "object" && Object.keys(val).length === 0) return false;
      return true;
    })
    .map(([key, val]) => {
      // Format snake_case key to clean Title Case
      const label = key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { key, label, val };
    });

  return (
    <div className="p-8 space-y-12">
      {/* 1. Basic Information */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
          <User size={16} /> {headings.basic}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
          <EditableField
            label={labels.practice_name || "Practice Name"}
            value={form.practice_name}
            onSave={(val) =>
              handleFieldUpdate(form.id, "practice_name", val)
            }
          />
          <EditableField
            label={labels.practitioner_name || "Practitioner Name"}
            value={form.practitioner_name}
            onSave={(val) =>
              handleFieldUpdate(
                form.id,
                "practitioner_name",
                val,
              )
            }
          />
          <EditableField
            label={labels.credentials || "Credentials"}
            value={form.credentials}
            onSave={(val) =>
              handleFieldUpdate(form.id, "credentials", val)
            }
          />
          <EditableField
            label={labels.years_experience || "Experience"}
            value={form.years_experience}
            onSave={(val) =>
              handleFieldUpdate(
                form.id,
                "years_experience",
                val,
              )
            }
          />
          <EditableField
            label="Contact Phone"
            value={form.contact_phone}
            onSave={(val) =>
              handleFieldUpdate(form.id, "contact_phone", val)
            }
          />
          <EditableField
            label="Primary Email"
            value={form.primary_email}
            onSave={(val) =>
              handleFieldUpdate(form.id, "primary_email", val)
            }
          />
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* 2. Media & Files */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
          <ImageIcon size={16} /> Media & Files
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-3">
              Logo
            </p>
            {form.logo_path ? (
              <div className="relative group/img aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={getImageUrl(form.logo_path)}
                  alt="Logo"
                  className="w-full h-full object-contain p-4"
                />
                <a
                  href={getImageUrl(form.logo_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-white border-white/20"
                  >
                    <Download size={14} className="mr-2" /> Download
                  </Button>
                </a>
              </div>
            ) : (
              <span className="text-gray-500 text-sm italic">
                No logo provided
              </span>
            )}
          </div>
          {/* Headshot */}
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-3">
              Headshot
            </p>
            {form.headshot_path ? (
              <div className="relative group/img aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={getImageUrl(form.headshot_path)}
                  alt="Headshot"
                  className="w-full h-full object-cover"
                />
                <a
                  href={getImageUrl(form.headshot_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-white border-white/20"
                  >
                    <Download size={14} className="mr-2" /> Download
                  </Button>
                </a>
              </div>
            ) : (
              <span className="text-gray-500 text-sm italic">
                No headshot provided
              </span>
            )}
          </div>
          {/* CV */}
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-3">
              CV / Resume
            </p>
            <div className="flex-1 flex items-center justify-center rounded-xl bg-black/20 border border-dashed border-white/10 p-6">
              {form.cv_path ? (
                <a
                  href={getImageUrl(form.cv_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="bg-[#3EC6EC]/10 text-[#3EC6EC] border-[#3EC6EC]/20 hover:bg-[#3EC6EC] hover:text-white"
                  >
                    <Download size={16} className="mr-2" /> Download CV
                  </Button>
                </a>
              ) : (
                <span className="text-gray-500 text-sm italic text-center">
                  No CV/Resume provided
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* 3. Narrative & Bio */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
          <Zap size={16} /> {headings.narrative}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          <EditableField
            label={labels.ideal_audience || "Ideal Audience"}
            value={form.ideal_audience}
            isArray
            onSave={(val) =>
              handleFieldUpdate(form.id, "ideal_audience", val)
            }
          />
          <EditableField
            label={labels.patient_problem || "Patient/Client Problem"}
            value={form.patient_problem}
            isTextArea
            onSave={(val) =>
              handleFieldUpdate(form.id, "patient_problem", val)
            }
          />
          <div className="md:col-span-2">
            <EditableField
              label="Bio Snippet / About Me"
              value={form.bio_snippet}
              isTextArea
              onSave={(val) =>
                handleFieldUpdate(form.id, "bio_snippet", val)
              }
            />
          </div>
          <EditableField
            label={labels.specialties || "Specialties / Focus Areas"}
            value={form.specialties}
            isArray
            onSave={(val) =>
              handleFieldUpdate(form.id, "specialties", val)
            }
          />
          <EditableField
            label={labels.practice_type || "Practice Type"}
            value={form.practice_type}
            isArray
            onSave={(val) =>
              handleFieldUpdate(form.id, "practice_type", val)
            }
          />
        </div>
      </div>

      {/* 4. Dynamic Role-Specific & Additional Fields */}
      {additionalFields.length > 0 && (
        <>
          <Separator className="bg-white/5" />
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
              <Award size={16} /> Additional Profile Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              {additionalFields.map(({ key, label, val }) => (
                <div
                  key={key}
                  className={
                    (typeof val === "string" && val.length > 100) || Array.isArray(val)
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <EditableField
                    label={label}
                    value={val}
                    isTextArea={typeof val === "string" && val.length > 100}
                    isArray={Array.isArray(val)}
                    onSave={(newVal) =>
                      handleFieldUpdate(form.id, key, newVal)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator className="bg-white/5" />

      {/* 5. Digital Strategy & Brand */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
          <Globe size={16} /> {headings.strategy}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          <EditableField
            label={labels.booking_url || "Booking URL"}
            value={form.booking_url}
            onSave={(val) =>
              handleFieldUpdate(form.id, "booking_url", val)
            }
          />
          <EditableField
            label="Aesthetic Preference"
            value={form.aesthetic_preference}
            onSave={(val) =>
              handleFieldUpdate(
                form.id,
                "aesthetic_preference",
                val,
              )
            }
          />
          <EditableField
            label={labels.website_goals || "Website Goals"}
            value={form.website_goals}
            isArray
            onSave={(val) =>
              handleFieldUpdate(form.id, "website_goals", val)
            }
          />
          <EditableField
            label={labels.required_pages || "Required Pages"}
            value={form.required_pages}
            isArray
            onSave={(val) =>
              handleFieldUpdate(form.id, "required_pages", val)
            }
          />
          <div className="md:col-span-2">
            <EditableField
              label="Website Features/Integrations"
              value={form.website_features}
              isTextArea
              onSave={(val) =>
                handleFieldUpdate(
                  form.id,
                  "website_features",
                  val,
                )
              }
            />
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* 6. Services & Reviews */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
          <Star size={16} /> {headings.services}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          <EditableField
            label={labels.services || "Services Offered"}
            value={form.services}
            isArray
            onSave={(val) =>
              handleFieldUpdate(form.id, "services", val)
            }
          />
          <EditableTestimonials
            testimonials={form.testimonials}
            label={labels.testimonials || "Testimonials & Reviews"}
            onSave={(val) =>
              handleFieldUpdate(form.id, "testimonials", val)
            }
          />
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* 7. Social Links */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
          <Share2 size={16} /> Social Presence
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
          {form.social_links ? (
            typeof form.social_links === "object" ? (
              Object.entries(form.social_links).map(
                ([platform, url]) => (
                  <EditableField
                    key={platform}
                    label={
                      platform.charAt(0).toUpperCase() +
                      platform.slice(1)
                    }
                    value={url}
                    onSave={(val) => {
                      const newLinks = {
                        ...form.social_links,
                        [platform]: val,
                      };
                      return handleFieldUpdate(
                        form.id,
                        "social_links",
                        newLinks,
                      );
                    }}
                  />
                )
              )
            ) : (
              <div className="md:col-span-3">
                <EditableField
                  label="Social Links"
                  value={form.social_links}
                  isTextArea
                  onSave={(val) =>
                    handleFieldUpdate(form.id, "social_links", val)
                  }
                />
              </div>
            )
          ) : (
            <span className="text-gray-500 text-sm italic">
              No social links provided
            </span>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="text-gray-500" size={20} />
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">
              Submission Details
            </p>
            <p className="text-sm text-gray-300">
              Form submitted on{" "}
              {new Date(form.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1">
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Verified
        </Badge>
      </div>
    </div>
  );
};

const OnboardingAccordions = ({ customer, purchases, onUpdate }) => {
  const [expandedFormId, setExpandedFormId] = useState(null);
  const { toast } = useToast();

  // Local state for onboardings to allow instant UI feedback
  const [onboardings, setOnboardings] = useState(
    customer.user?.onboardings || [],
  );

  useEffect(() => {
    setOnboardings(customer.user?.onboardings || []);
  }, [customer.user?.onboardings]);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const getImageUrl = (path) => {
    if (!path) return null;
    return `${backendUrl}/storage/${path}`;
  };

  const handleFieldUpdate = async (onboardingId, field, value) => {
    try {
      await apiRequest(`/onboarding/${onboardingId}`, {
        method: "PUT",
        body: { [field]: value },
      });

      // Update local state
      setOnboardings((prev) =>
        prev.map((f) => (f.id === onboardingId ? { ...f, [field]: value } : f)),
      );

      toast({
        title: "Updated",
        description: "Information saved successfully.",
      });

      // Refresh parent if needed (usually good for sync)
      if (onUpdate) onUpdate();
      return true;
    } catch (e) {
      toast({
        title: "Error",
        description: e.message || "Failed to update field",
        variant: "destructive",
      });
      return false;
    }
  };

  const succeededPaymentItems = (purchases || [])
    .filter((p) => p.status === "succeeded")
    .flatMap((purchase) =>
      (purchase.items || []).map((item) => ({
        ...item,
        purchaseDate: purchase.date,
        purchaseId: purchase.id,
      })),
    );

  // Filter out any onboarding forms that have already been matched to a Stripe payment item
  const unmatchedOnboardings = onboardings.filter(
    (f) => !succeededPaymentItems.some((item) => isMatchingCharge(f.stripe_charge_id, item.id))
  );

  if (succeededPaymentItems.length === 0 && unmatchedOnboardings.length === 0) {
    return (
      <div className="bg-[#2D2D2D] border border-white/5 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <ShoppingBag className="text-gray-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-400 mb-2">
          No Onboarding Submissions
        </h3>
        <p className="text-gray-500 max-w-sm">
          This user has no succeeded payments or submitted onboarding forms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          Onboarding Progress
          <Badge className="bg-white/5 text-[#3EC6EC] border-none ml-2">
            {onboardings.filter(f => f.current_step >= 3).length || 0} / {Math.max(succeededPaymentItems.length, onboardings.length)} Complete
          </Badge>
        </h2>
      </div>

      {/* Render Succeeded Payment Items */}
      {succeededPaymentItems.map((item, index) => {
        const form = onboardings.find((f) => isMatchingCharge(f.stripe_charge_id, item.id));
        const itemName = item.description || "Website Plan";
        const isExpanded = expandedFormId === item.id;

        return (
          <div key={`${item.id || item.purchaseId}-${index}`} className="group">
            {form ? (
              <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
                {/* Accordion Bar */}
                <button
                  onClick={() => setExpandedFormId(isExpanded ? null : item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#3EC6EC]/10 flex items-center justify-center">
                      <FileText size={20} className="text-[#3EC6EC]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white line-clamp-1">
                        {itemName}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Purchased on {item.purchaseDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="hidden sm:inline-flex bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase text-[10px] font-bold">
                      Step {form.current_step || 3}/3
                    </Badge>
                    <Badge className="hidden sm:inline-flex bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase text-[10px]">
                      Type: {form.category}
                    </Badge>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "text-gray-400 transition-transform duration-300",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </div>
                </button>

                {/* Dropdown Content */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden border-t border-white/5">
                    <OnboardingFormContent
                      form={form}
                      handleFieldUpdate={handleFieldUpdate}
                      getImageUrl={getImageUrl}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#2D2D2D]/50 border border-white/5 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <Loader2 className="text-gray-600 animate-pulse" size={24} />
                </div>
                <h4 className="text-white font-bold">{itemName}</h4>
                <p className="text-gray-500 text-xs mt-1">
                  Purchased on {item.purchaseDate}. Waiting for customer to
                  provide details.
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Render Unmatched Onboarding Forms (Manual / Fallback / Legacy) */}
      {unmatchedOnboardings.map((form, index) => {
        const itemName = form.practice_name || `${form.category ? form.category.charAt(0).toUpperCase() + form.category.slice(1) : "General"} Profile Form`;
        const isExpanded = expandedFormId === form.id;

        return (
          <div key={`unmatched-${form.id}-${index}`} className="group">
            <div className="bg-[#2D2D2D] border border-amber-500/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
              {/* Accordion Bar */}
              <button
                onClick={() => setExpandedFormId(isExpanded ? null : form.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <FileText size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white line-clamp-1">
                      {itemName}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Onboarding Form (Manual/Legacy submission)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="hidden sm:inline-flex bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase text-[10px] font-bold">
                    Step {form.current_step || 3}/3
                  </Badge>
                  <Badge className="hidden sm:inline-flex bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase text-[10px]">
                    Type: {form.category}
                  </Badge>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "text-gray-400 transition-transform duration-300",
                      isExpanded && "rotate-180",
                    )}
                  />
                </div>
              </button>

              {/* Dropdown Content */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isExpanded
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden border-t border-white/5">
                  <OnboardingFormContent
                    form={form}
                    handleFieldUpdate={handleFieldUpdate}
                    getImageUrl={getImageUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingAccordions;
