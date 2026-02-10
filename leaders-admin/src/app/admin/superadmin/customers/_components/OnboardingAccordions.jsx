import React, { useState } from "react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Section, Field, ArrayField } from "./Shared";
import { Button } from "@/components/ui/button";

const OnboardingAccordions = ({ customer, purchases }) => {
  const [expandedFormId, setExpandedFormId] = useState(null);
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const getImageUrl = (path) => {
    if (!path) return null;
    return `${backendUrl}/storage/${path}`;
  };

  const succeededPaymentItems = purchases
    .filter((p) => p.status === "succeeded")
    .flatMap((purchase) =>
      (purchase.items || []).map((item) => ({
        ...item,
        purchaseDate: purchase.date,
        purchaseId: purchase.id,
      })),
    );

  if (succeededPaymentItems.length === 0) {
    return (
      <div className="bg-[#2D2D2D] border border-white/5 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <ShoppingBag className="text-gray-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-400 mb-2">
          No Successful Purchases
        </h3>
        <p className="text-gray-500 max-w-sm">
          This user has no succeeded payments to generate onboarding forms.
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
            {customer.user?.onboardings?.length || 0} /{" "}
            {succeededPaymentItems.length} Complete
          </Badge>
        </h2>
      </div>

      {succeededPaymentItems.map((item, index) => {
        const form = customer.user?.onboardings?.find(
          (f) => f.stripe_charge_id === item.id,
        );
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
                      Submitted: {form.category}
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
                    <div className="p-8 space-y-12">
                      {/* 1. Basic Information */}
                      <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
                          <User size={16} /> Basic Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <Field
                            label="Practice Name"
                            value={form.practice_name}
                          />
                          <Field
                            label="Practitioner Name"
                            value={form.practitioner_name}
                          />
                          <Field label="Credentials" value={form.credentials} />
                          <Field
                            label="Experience"
                            value={form.years_experience}
                          />
                          <Field
                            label="Contact Phone"
                            value={form.contact_phone}
                          />
                          <Field
                            label="Primary Email"
                            value={form.primary_email}
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
                                    <Download size={14} className="mr-2" />{" "}
                                    Download
                                  </Button>
                                </a>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm italic">
                                No logo provided
                              </span>
                            )}
                          </div>
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
                                    <Download size={14} className="mr-2" />{" "}
                                    Download
                                  </Button>
                                </a>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm italic">
                                No headshot provided
                              </span>
                            )}
                          </div>
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
                                    <Download size={16} className="mr-2" />{" "}
                                    Download CV
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
                          <Zap size={16} /> Narrative & Bio
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <Field
                            label="Ideal Audience"
                            value={form.ideal_audience}
                          />
                          <Field
                            label="Patient/Client Problem"
                            value={form.patient_problem}
                          />
                          <div className="md:col-span-2">
                            <Field
                              label="Bio Snippet / About Me"
                              value={form.bio_snippet}
                            />
                          </div>
                          <ArrayField
                            label="Specialties / Focus Areas"
                            value={form.specialties}
                          />
                          <ArrayField
                            label="Practice Type"
                            value={form.practice_type}
                          />
                        </div>
                      </div>

                      <Separator className="bg-white/5" />

                      {/* 4. Digital Strategy & Brand */}
                      <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
                          <Globe size={16} /> Digital Strategy & Brand
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <Field label="Booking URL" value={form.booking_url} />
                          <Field
                            label="Aesthetic Preference"
                            value={form.aesthetic_preference}
                          />
                          <ArrayField
                            label="Website Goals"
                            value={form.website_goals}
                          />
                          <ArrayField
                            label="Required Pages"
                            value={form.required_pages}
                          />
                          <div className="md:col-span-2">
                            <Field
                              label="Website Features/Integrations"
                              value={form.website_features}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-white/5" />

                      {/* 5. Services & Reviews */}
                      <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
                          <Star size={16} /> Services & Reviews
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <ArrayField
                            label="Services Offered"
                            value={form.services}
                          />
                          <Field
                            label="Testimonials / Social Proof"
                            value={form.testimonials}
                          />
                        </div>
                      </div>

                      <Separator className="bg-white/5" />

                      {/* 6. Social Links */}
                      <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-widest flex items-center gap-2">
                          <Share2 size={16} /> Social Presence
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {form.social_links &&
                          typeof form.social_links === "object" ? (
                            Object.entries(form.social_links).map(
                              ([platform, url]) =>
                                url && (
                                  <Field
                                    key={platform}
                                    label={
                                      platform.charAt(0).toUpperCase() +
                                      platform.slice(1)
                                    }
                                    value={url}
                                  />
                                ),
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
                          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                          Verified
                        </Badge>
                      </div>
                    </div>
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
    </div>
  );
};

export default OnboardingAccordions;
