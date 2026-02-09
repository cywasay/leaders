import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServiceItem = ({
  service,
  index,
  updateService,
  removeService,
  servicesCount,
  def,
}) => {
  const update = (field, val) => updateService(index, field, val);
  return (
    <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Service Name *
          </Label>
          <Input
            value={service.name || ""}
            onChange={(e) => update("name", e.target.value)}
            placeholder={def.servicePlaceholder}
            className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Who it's for
          </Label>
          <Input
            value={service.for || ""}
            onChange={(e) => update("for", e.target.value)}
            placeholder="Target demographic..."
            className="bg-[#111111] border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
          Problem it solves
        </Label>
        <Textarea
          value={service.problem_solved || ""}
          onChange={(e) => update("problem_solved", e.target.value)}
          placeholder="e.g. Managing ADHD symptoms"
          className="bg-[#111111] border-white/10 text-white min-h-[60px] placeholder:text-gray-400"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Delivery type
          </Label>
          <Select
            value={service.delivery_type || "Virtual"}
            onValueChange={(v) => update("delivery_type", v)}
          >
            <SelectTrigger className="bg-[#111111] border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2D2D] border-white/10 text-white">
              {def.deliveryOptions?.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            CTA Preference
          </Label>
          <Select
            value={service.cta || "Learn More"}
            onValueChange={(v) => update("cta", v)}
          >
            <SelectTrigger className="bg-[#111111] border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2D2D] border-white/10 text-white">
              {def.ctaOptions?.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {servicesCount > 1 && (
        <Button
          variant="ghost"
          onClick={() => removeService(index)}
          className="text-red-500 hover:text-red-400 p-0 h-auto"
        >
          Remove
        </Button>
      )}
    </div>
  );
};
export default ServiceItem;
