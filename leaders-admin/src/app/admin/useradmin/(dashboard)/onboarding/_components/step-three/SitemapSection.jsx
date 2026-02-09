import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SitemapSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
}) => {
  const requiredPages = formData.required_pages || ["Home", "About", "Contact"];

  const togglePage = (page) => {
    const newPages = requiredPages.includes(page)
      ? requiredPages.filter((p) => p !== page)
      : [...requiredPages, page];
    updateFormData({ required_pages: newPages });
  };

  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-6 font-outfit">
          {def?.pagesHeading || "Sitemap Architecture"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {def.pages.map((page) => (
            <label
              key={page}
              className="flex items-center gap-2.5 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-[#3EC6EC]/10 transition-colors"
            >
              <Checkbox
                className="border-[#3EC6EC]"
                checked={requiredPages.includes(page)}
                onCheckedChange={() => togglePage(page)}
              />
              <span className="text-xs sm:text-sm font-bold text-gray-400 truncate">
                {page}
              </span>
            </label>
          ))}
        </div>
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

export default SitemapSection;
