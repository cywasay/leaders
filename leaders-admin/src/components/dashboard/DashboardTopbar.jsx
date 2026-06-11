"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  LogOut,
  User as UserIcon,
  ChevronDown,
  UserPlus,
  FileText,
  Sparkles,
  Check,
  Trash2,
} from "lucide-react";
import MobileSidebar from "./sidebar/MobileSidebar";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/api";
import LogoutModal from "./LogoutModal";

const formatRelativeTime = (dateString) => {
  if (!dateString) return "Recently";
  try {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${diffDays}d ago`;
  } catch (e) {
    return "Recently";
  }
};

const DashboardTopbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch activities and populate notifications list
  useEffect(() => {
    if (!user) return;

    const loadNotifications = async () => {
      let items = [];
      const readIds = JSON.parse(localStorage.getItem(`read_notifications_${user.id}`) || "[]");
      const clearedIds = JSON.parse(localStorage.getItem(`cleared_notifications_${user.id}`) || "[]");

      if (user.role === "superadmin") {
        try {
          const res = await apiRequest("/admin/stats");
          const recentCustomers = res?.stats?.recent_customers || [];
          
          recentCustomers.forEach((c) => {
            const customerId = `cust_${c.id}`;
            if (!clearedIds.includes(customerId)) {
              items.push({
                id: customerId,
                title: "New Customer Sign Up",
                description: `${c.name || c.email} registered on the platform.`,
                type: "user",
                time: formatRelativeTime(c.created_at),
                isRead: readIds.includes(customerId),
              });
            }

            if (c.user?.onboardings && c.user.onboardings.length > 0) {
              c.user.onboardings.forEach((o) => {
                const onboardingId = `onb_${o.id}`;
                if (!clearedIds.includes(onboardingId)) {
                  items.push({
                    id: onboardingId,
                    title: "Onboarding Submitted",
                    description: `${c.name || c.email} submitted a ${o.category?.toUpperCase() || ""} form.`,
                    type: "form",
                    time: formatRelativeTime(o.updated_at || o.created_at),
                    isRead: readIds.includes(onboardingId),
                  });
                }
              });
            }
          });
        } catch (error) {
          console.error("Failed to load notifications:", error);
        }
      } else {
        try {
          const res = await apiRequest("/onboarding/purchased-forms");
          const forms = res?.forms || [];
          
          forms.forEach((f) => {
            const formId = `form_${f.charge_id}`;
            if (!clearedIds.includes(formId)) {
              items.push({
                id: formId,
                title: "Onboarding Form Ready",
                description: `Fill out your form for ${f.item_name}.`,
                type: "form",
                time: "Action Required",
                isRead: readIds.includes(formId),
              });
            }
          });
        } catch (error) {
          console.error("Failed to load notifications:", error);
        }

        const welcomeId = `welcome_${user.id}`;
        if (!clearedIds.includes(welcomeId)) {
          items.push({
            id: welcomeId,
            title: "Welcome to Leaders Portal",
            description: "Customize your profile and manage settings in your account settings.",
            type: "welcome",
            time: "Just now",
            isRead: readIds.includes(welcomeId),
          });
        }
      }

      setNotifications(items);
    };

    loadNotifications();
  }, [user]);

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    
    const readIds = JSON.parse(localStorage.getItem(`read_notifications_${user.id}`) || "[]");
    notifications.forEach((n) => {
      if (!readIds.includes(n.id)) readIds.push(n.id);
    });
    localStorage.setItem(`read_notifications_${user.id}`, JSON.stringify(readIds));
  };

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updated);

    const readIds = JSON.parse(localStorage.getItem(`read_notifications_${user.id}`) || "[]");
    if (!readIds.includes(id)) {
      readIds.push(id);
      localStorage.setItem(`read_notifications_${user.id}`, JSON.stringify(readIds));
    }
  };

  const clearAll = () => {
    setNotifications([]);
    const clearedIds = JSON.parse(localStorage.getItem(`cleared_notifications_${user.id}`) || "[]");
    notifications.forEach((n) => {
      if (!clearedIds.includes(n.id)) clearedIds.push(n.id);
    });
    localStorage.setItem(`cleared_notifications_${user.id}`, JSON.stringify(clearedIds));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
    
    const clearedIds = JSON.parse(localStorage.getItem(`cleared_notifications_${user.id}`) || "[]");
    if (!clearedIds.includes(id)) {
      clearedIds.push(id);
      localStorage.setItem(`cleared_notifications_${user.id}`, JSON.stringify(clearedIds));
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "user":
        return <UserPlus size={16} className="text-[#3EC6EC]" />;
      case "form":
        return <FileText size={16} className="text-emerald-400" />;
      case "welcome":
        return <Sparkles size={16} className="text-amber-400" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Get initials for the avatar if no image
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="w-full h-[64px] lg:h-[75px] flex items-end">
      <header className="w-full h-[64px] lg:h-[72px] bg-transparent flex items-center justify-between px-3 md:px-6 relative">
        <div className="flex items-center gap-1 md:gap-4">
          {/* Mobile Menu Button - Only visible on mobile */}
          <MobileSidebar />

          {/* Portal Indicator - Small on mobile */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-semibold uppercase tracking-tight md:tracking-widest border",
                user?.role === "superadmin"
                  ? "bg-orange-500/10 text-[#FF7300] border-orange-500/20"
                  : "bg-[#3EC6EC]/10 text-[#3EC6EC] border-[#3EC6EC]/20",
              )}
            >
              <span className="inline md:hidden">
                {user?.role === "superadmin" ? "Admin" : "User"}
              </span>
              <span className="hidden md:inline">
                {user?.role === "superadmin"
                  ? "Superadmin Portal"
                  : "Practitioner Portal"}
              </span>
            </span>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Notification Bell with Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={cn(
                "bg-transparent border-0 cursor-pointer rounded-xl transition-all duration-300 hover:bg-white/5 flex items-center justify-center p-1.5 md:p-2 outline-none relative text-gray-400 hover:text-white",
                isNotificationsOpen && "text-white bg-white/5",
              )}
            >
              <Bell size={20} className="md:hidden" />
              <Bell size={24} className="hidden md:block" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold border-2 border-[#1A1A1A] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-[#2D2D2D] rounded-2xl shadow-2xl border border-white/10 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-4 pb-3 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white font-outfit">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <p className="text-[11px] text-gray-400 font-medium">
                        You have {unreadCount} unread alert{unreadCount > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[10px] font-bold text-[#3EC6EC] hover:text-[#2fb0d4] flex items-center gap-1 transition-all uppercase tracking-wider"
                    >
                      <Check size={12} /> Mark all read
                    </button>
                  )}
                </div>

                {/* Notification Items List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <Bell size={32} className="text-gray-600 mb-2" />
                      <p className="text-xs text-gray-400 font-semibold">
                        No new notifications
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1 max-w-[200px]">
                        We'll let you know when there's recent activity on your account.
                      </p>
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markAsRead(item.id)}
                        className={cn(
                          "p-3.5 flex gap-3 hover:bg-white/5 transition-all cursor-pointer relative group",
                          !item.isRead && "bg-white/[0.02]"
                        )}
                      >
                        {!item.isRead && (
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#3EC6EC] rounded-full"></span>
                        )}
                        
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                          {getNotificationIcon(item.type)}
                        </div>

                        <div className="flex-1 min-w-0 pr-4">
                          <p className={cn(
                            "text-xs font-semibold text-white leading-snug truncate",
                            !item.isRead && "font-bold text-[#3EC6EC]"
                          )}>
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-400 leading-normal mt-0.5 line-clamp-2">
                            {item.description}
                          </p>
                          <span className="text-[9px] text-gray-500 font-semibold block mt-1.5">
                            {item.time}
                          </span>
                        </div>

                        <button
                          onClick={(e) => deleteNotification(item.id, e)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                          title="Dismiss"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Action */}
                {notifications.length > 0 && (
                  <div className="px-4 pt-3 border-t border-white/5 flex justify-end">
                    <button
                      onClick={clearAll}
                      className="text-[10px] font-bold text-gray-500 hover:text-red-400 flex items-center gap-1 transition-all uppercase tracking-wider"
                    >
                      <Trash2 size={12} /> Clear all
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Vertical Divider - Hidden on very small screens */}
          <div className="hidden xs:block h-8 md:h-10 w-px bg-white/10"></div>

          {/* User Profile Section with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 md:gap-3 cursor-pointer group outline-none"
            >
              <div className="relative w-8 h-8 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#3EC6EC] transition-all bg-white/5 flex items-center justify-center text-[#3EC6EC] font-bold text-base md:text-lg">
                {user?.avatar_url || user?.avatar ? (
                  <Image
                    src={user?.avatar_url || user?.avatar}
                    alt={user?.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>{userInitials}</span>
                )}
              </div>

              {/* Name - Hidden on very small screens */}
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-medium text-[13px] md:text-[14px] leading-tight text-white group-hover:text-[#3EC6EC] transition-colors">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] md:text-[11px] text-gray-400 leading-tight truncate max-w-[120px]">
                  {user?.email}
                </span>
              </div>

              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#2D2D2D] rounded-2xl shadow-xl border border-white/10 py-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-white/5 mb-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href={
                    user?.role === "superadmin"
                      ? "/admin/superadmin/settings"
                      : "/admin/useradmin/settings"
                  }
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#3EC6EC] transition-colors"
                >
                  <UserIcon size={18} />
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
      />
    </div>
  );
};

export default DashboardTopbar;
