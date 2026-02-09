import React from "react";
import Image from "next/image";

const AdminAuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#2D2D2D] to-[#1A1A1A]">
      {/* --- Static Logo Section --- */}
      <div className="flex flex-col items-center mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className=" relative w-80 h-24">
          <Image
            src="/logo.png"
            alt="Leaders Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* --- Dynamic Content Section --- */}
      <div className="w-full max-w-sm px-6">{children}</div>
    </div>
  );
};

export default AdminAuthLayout;
