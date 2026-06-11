"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[360px] rounded-2xl border border-white/10 bg-[#2D2D2D]/95 backdrop-blur-lg p-6 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center space-y-4">
          {/* Logout Icon with soft red bg */}
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
            <LogOut size={22} className="stroke-[2.5]" />
          </div>
          
          <div className="space-y-1.5">
            <DialogTitle className="text-lg font-bold text-white font-outfit leading-none">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-400 font-medium leading-relaxed">
              Are you sure you want to sign out of your account? You will need to log in again to access the portal.
            </DialogDescription>
          </div>

          <div className="flex w-full gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/10 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 font-bold rounded-xl h-11 text-xs uppercase"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl h-11 text-xs uppercase shadow-md shadow-red-500/10"
            >
              Log Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
