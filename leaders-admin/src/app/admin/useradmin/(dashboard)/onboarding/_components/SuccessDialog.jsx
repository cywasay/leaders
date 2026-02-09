"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessDialog = ({ open, onOpenChange }) => {
  const router = useRouter();
  const handleClose = () => {
    onOpenChange(false);
    router.push("/admin/useradmin/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border border-white/10 rounded-2xl bg-[#1A1A1A] shadow-2xl">
        <DialogTitle className="sr-only">Onboarding Complete</DialogTitle>
        <div className="relative font-outfit text-center">
          <div className="h-32 bg-gradient-to-r from-[#3EC6EC] to-[#3EC6EC]/70 flex items-center justify-center relative overflow-hidden">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 z-10 animate-in zoom-in duration-500">
              <CheckCircle2 size={40} className="text-white" />
            </div>
          </div>
          <div className="p-8 pt-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                ✅ Thank you!
              </h2>
              <p className="text-gray-400 text-base leading-relaxed font-medium">
                Team has received your info and will begin building your site.
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-[#3EC6EC]/10 flex items-center justify-center border border-[#3EC6EC]/20">
                <Mail size={20} className="text-[#3EC6EC]" />
              </div>
              <p className="text-sm font-bold text-gray-300">
                You'll receive updates via email.
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="w-full h-14 bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white rounded-xl font-bold text-lg shadow-xl shadow-[#3EC6EC]/20 transition-all"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
