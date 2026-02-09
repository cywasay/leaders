import React from "react";
import { Globe, Palette, Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BrandVoiceDetails = ({
  formData,
  updateFormData,
  logoPreview,
  setLogoPreview,
  handleLogoChange,
  showBrandColors = true,
}) => {
  return (
    <div className="mt-8 space-y-6">
      {showBrandColors && (
        <>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              <Globe size={16} className="text-[#3EC6EC]" /> Websites you like
              (URLs)
            </Label>
            <Textarea
              value={formData.liked_websites || ""}
              onChange={(e) =>
                updateFormData({ liked_websites: e.target.value })
              }
              placeholder="List a few websites..."
              className="bg-[#111111] border-white/10 text-white min-h-[80px] placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
              <Palette size={16} className="text-[#3EC6EC]" /> Brand colors (if
              any)
            </Label>
            <Input
              value={formData.brand_colors || ""}
              onChange={(e) => updateFormData({ brand_colors: e.target.value })}
              placeholder="e.g. Navy blue..."
              className="bg-[#111111] border-white/10 text-white h-11 placeholder:text-gray-400"
            />
          </div>
        </>
      )}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">
          <Upload size={16} className="text-[#3EC6EC]" />{" "}
          {showBrandColors
            ? "Logo upload"
            : "Organization Logo (if applicable)"}
        </Label>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center relative overflow-hidden bg-white/5",
              logoPreview ? "border-[#3EC6EC]" : "border-white/10",
            )}
          >
            {logoPreview ? (
              <div className="relative w-full h-full">
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  fill
                  className="object-contain p-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);
                    updateFormData({ logo: null, logo_path: null });
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-lg"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="logo-upload"
                className="cursor-pointer flex flex-col items-center gap-1 text-gray-500 hover:text-[#3EC6EC] transition-colors"
              >
                <Upload size={24} />
                <span className="text-[10px] font-bold">Upload</span>
                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            )}
          </div>
          <div className="flex-1 text-xs text-gray-500 pt-2 font-medium">
            <p>Support PNG, JPG or SVG.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandVoiceDetails;
