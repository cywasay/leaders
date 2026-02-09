import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Video } from "lucide-react";

const TestimonialItem = ({ item, index, updateTestimonial, def }) => {
  const update = (f, v) => updateTestimonial(index, f, v);
  return (
    <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-4 font-outfit">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Name
          </Label>
          <Input
            value={item.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className="bg-white/5 border-white/10 text-white h-10"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Title / Company
          </Label>
          <Input
            value={item.title || ""}
            onChange={(e) => update("title", e.target.value)}
            placeholder={def.testimonialTitle}
            className="bg-white/5 border-white/10 text-white h-10"
          />
        </div>
      </div>
      <Textarea
        value={item.text || ""}
        onChange={(e) => update("text", e.target.value)}
        placeholder="Review content..."
        className="bg-white/5 border-white/10 text-white min-h-[80px]"
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`perm-${index}`}
            checked={item.permission}
            onCheckedChange={(v) => update("permission", v)}
          />
          <Label htmlFor={`perm-${index}`} className="text-xs text-gray-500">
            {def.testimonialPermission}
          </Label>
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-[#3EC6EC] hover:text-[#2FB0D3] text-xs font-bold">
          <Video size={16} />{" "}
          {item.video ? "Replace Video" : "Upload Video Testimonial"}
          <input
            type="file"
            className="hidden"
            accept="video/*"
            onChange={(e) => update("video", e.target.files[0])}
          />
        </label>
      </div>
      {item.video && (
        <div className="text-[10px] text-[#3EC6EC] italic truncate">
          File: {item.video.name}
        </div>
      )}
    </div>
  );
};
export default TestimonialItem;
