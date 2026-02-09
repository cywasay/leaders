import React from "react";
import { Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceItem from "./ServiceItem";

const ServicesSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
}) => {
  const services = formData.services || [
    { name: "", for: "", type: "Virtual", cta: "Learn More", description: "" },
  ];

  const updateService = (index, field, value) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateFormData({ services: newServices });
  };

  const addService = () => {
    updateFormData({
      services: [
        ...services,
        {
          name: "",
          for: "",
          type: "Virtual",
          cta: "Learn More",
          description: "",
        },
      ],
    });
  };

  const removeService = (index) => {
    updateFormData({ services: services.filter((_, i) => i !== index) });
  };

  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white font-outfit">
            {def?.servicesHeading || "Main Services"}
          </h2>
          <Button
            variant="outline"
            onClick={addService}
            className="border-white/10 text-gray-400 hover:bg-white/5"
          >
            <Plus size={18} className="mr-2" /> Add Service
          </Button>
        </div>
        <div className="space-y-4">
          {services.map((item, i) => (
            <ServiceItem
              key={i}
              service={item}
              index={i}
              updateService={updateService}
              removeService={removeService}
              servicesCount={services.length}
              def={def}
            />
          ))}
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

export default ServicesSection;
