"use client";

import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const SidebarLogout = ({ isCollapsed }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="px-3 mt-auto pb-6 pt-4 border-t border-white/5">
      <button
        onClick={handleLogout}
        className={cn(
          "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-[#3EC6EC]/10 hover:text-[#3EC6EC] transition-all duration-200 group",
          isCollapsed ? "justify-center" : "pr-4",
        )}
      >
        <LogOut size={20} className="shrink-0 group-hover:text-[#3EC6EC]" />
        {!isCollapsed && <span className="font-medium">Logout</span>}
      </button>
    </div>
  );
};

export default SidebarLogout;
