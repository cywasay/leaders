import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialItem from "./TestimonialItem";

const TestimonialsSection = ({
  formData,
  updateFormData,
  def,
  isSaving,
  onNext,
}) => {
  const testimonials = formData.testimonials || [
    { name: "", title: "", text: "", permission: false },
  ];

  const updateTestimonial = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    updateFormData({ testimonials: newTestimonials });
  };

  const addTestimonial = () => {
    updateFormData({
      testimonials: [
        ...testimonials,
        { name: "", title: "", text: "", permission: false },
      ],
    });
  };

  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white font-outfit">
          {def?.testimonialsHeading || "Testimonials & Proof"}
        </h2>
        <div className="space-y-6">
          {testimonials.map((item, i) => (
            <TestimonialItem
              key={i}
              item={item}
              index={i}
              updateTestimonial={updateTestimonial}
              def={def}
            />
          ))}
          <Button
            variant="link"
            onClick={addTestimonial}
            className="text-[#3EC6EC] p-0"
          >
            + Add Testimonial
          </Button>
        </div>
      </div>
      <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-end">
        <Button
          onClick={() => onNext()}
          disabled={isSaving}
          className="bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white font-bold px-8 shadow-lg shadow-[#3EC6EC]/20"
        >
          <Save size={18} className="mr-2" /> Save & Continue
        </Button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
