import React from "react";
import {
  Save,
  Image as ImageIcon,
  Briefcase,
  FileText,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AssetUploadCard from "./AssetUploadCard";

const AssetsSection = ({ formData, updateFormData, def, onSave, isSaving }) => {
  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def?.assetsHeading || "Asset & Brand Uploads"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AssetUploadCard
            id="head-up"
            title="Headshots"
            icon={<ImageIcon size={20} />}
            file={formData.headshot}
            path={formData.headshot_path}
            onFileChange={(f) => updateFormData({ headshot: f })}
            onRemove={() =>
              updateFormData({ headshot: null, headshot_path: null })
            }
          />
          <AssetUploadCard
            id="prac-up"
            title={def.assetTitle}
            icon={<Briefcase size={20} />}
            file={formData.clinic_images}
            path={formData.clinic_images_path}
            onFileChange={(f) => updateFormData({ clinic_images: f })}
            onRemove={() =>
              updateFormData({ clinic_images: null, clinic_images_path: null })
            }
          />
          <AssetUploadCard
            id="pdf-up"
            title="PDFs / Magnets"
            icon={<FileText size={20} />}
            file={formData.lead_magnets}
            path={formData.lead_magnets_path}
            onFileChange={(f) => updateFormData({ lead_magnets: f })}
            onRemove={() =>
              updateFormData({ lead_magnets: null, lead_magnets_path: null })
            }
            accept=".pdf"
          />
          <AssetUploadCard
            id="content-up"
            title="Existing Content"
            icon={<Layout size={20} />}
            file={formData.existing_content}
            path={formData.existing_content_path}
            onFileChange={(f) => updateFormData({ existing_content: f })}
            onRemove={() =>
              updateFormData({
                existing_content: null,
                existing_content_path: null,
              })
            }
          />
        </div>
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end">
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white px-8 font-bold"
        >
          <Save size={18} className="mr-2" /> Save Progress
        </Button>
      </div>
    </section>
  );
};
export default AssetsSection;
