import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const WebsiteGoalsSection = ({
  formData,
  updateFormData,
  def,
  onSave,
  isSaving,
}) => {
  const websiteGoals = formData.website_goals || [];

  const toggleGoal = (goal) => {
    const newGoals = websiteGoals.includes(goal)
      ? websiteGoals.filter((g) => g !== goal)
      : [...websiteGoals, goal];
    updateFormData({ website_goals: newGoals });
  };

  return (
    <section className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-5 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-2 font-outfit">
          {def?.goalsHeading || "Website Goals & Conversion"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {def.goals.map((goal) => (
            <label
              key={goal}
              className="flex items-center gap-3 p-4 border border-white/5 rounded-xl cursor-pointer hover:border-[#3EC6EC] hover:bg-[#3EC6EC]/10 transition-all bg-white/5"
            >
              <Checkbox
                checked={websiteGoals.includes(goal)}
                onCheckedChange={() => toggleGoal(goal)}
                className="w-5 h-5 border-[#3EC6EC]"
              />
              <span className="text-sm font-bold text-gray-400">{goal}</span>
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

export default WebsiteGoalsSection;
