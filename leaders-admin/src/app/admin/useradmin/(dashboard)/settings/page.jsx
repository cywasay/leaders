"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Save,
  Loader2,
  Camera,
  X,
  Shield,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
      if (user.avatar_url || user.avatar) {
        setAvatarPreview(user.avatar_url || user.avatar);
      }
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setFormData((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar: null }));
    setAvatarPreview(user?.avatar_url || user?.avatar || null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password &&
      formData.password !== formData.password_confirmation
    ) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSaving(true);
    const result = await updateProfile({
      name: formData.name,
      email: formData.email,
      password: formData.password || undefined,
      password_confirmation: formData.password_confirmation || undefined,
      avatar: formData.avatar || undefined,
    });

    setIsSaving(false);

    if (result.success) {
      toast.success("Profile updated successfully");
      setFormData((prev) => ({
        ...prev,
        password: "",
        password_confirmation: "",
      }));
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href="/admin/useradmin/dashboard">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl sm:rounded-2xl border-white/10 bg-white/5 hover:border-[#3EC6EC] hover:text-[#3EC6EC] text-gray-400 transition-all h-10 w-10 sm:h-12 sm:w-12"
            >
              <ArrowLeft size={18} className="sm:size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-outfit">
              Account Settings
            </h1>
            <p className="text-gray-400 mt-1 font-medium text-sm sm:text-base">
              Manage your personal information and security preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#2D2D2D] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="divide-y divide-white/5">
          {/* Profile Section */}
          <div className="p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 bg-[#3EC6EC]/10 rounded-xl sm:rounded-2xl text-[#3EC6EC] shadow-sm">
                <User size={20} className="sm:size-[22px]" strokeWidth={2.5} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-outfit">
                Profile Information
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="relative group">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white/5 border-4 border-[#2D2D2D] shadow-2xl relative ring-1 ring-white/5">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Avatar Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <User size={48} className="sm:size-[64px]" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 -right-2 p-3 bg-[#1A1A1A] text-white rounded-2xl shadow-xl cursor-pointer hover:bg-black hover:scale-110 transition-all border-4 border-[#2D2D2D]"
                >
                  <Camera size={20} />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
                {formData.avatar && (
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all border-4 border-[#2D2D2D]"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-lg font-bold text-white">Your Photo</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[240px]">
                  This will be displayed on your profile and dashboard.
                </p>
                {formData.avatar && (
                  <Badge className="bg-[#3EC6EC] text-white border-none font-bold text-[10px] mt-2 px-3 py-1 uppercase">
                    Ready to Sync
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#3EC6EC] transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-5 h-12 sm:h-14 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-[#3EC6EC]/5 focus:border-[#3EC6EC] transition-all outline-none text-sm sm:text-base text-white font-semibold"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#3EC6EC] transition-colors"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-6 h-14 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-[#3EC6EC]/5 focus:border-[#3EC6EC] transition-all outline-none text-white font-semibold"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 bg-gray-600 rounded-xl sm:rounded-2xl text-white shadow-sm font-bold">
                <Shield
                  size={20}
                  className="sm:size-[22px]"
                  strokeWidth={2.5}
                />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-outfit">
                Security & Access
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                  New Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#3EC6EC] transition-colors"
                    size={20}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-6 h-14 bg-[#2D2D2D] border border-white/10 rounded-2xl focus:ring-4 focus:ring-[#3EC6EC]/5 focus:border-[#3EC6EC] transition-all outline-none text-white font-semibold"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#3EC6EC] transition-colors"
                    size={20}
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-6 h-14 bg-[#2D2D2D] border border-white/10 rounded-2xl focus:ring-4 focus:ring-[#3EC6EC]/5 focus:border-[#3EC6EC] transition-all outline-none text-white font-semibold"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-6 sm:p-8 md:p-10 bg-[#2D2D2D] flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500 font-medium hidden md:block">
              All changes are synced securely with our servers.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
              <Button
                type="button"
                onClick={() => router.back()}
                variant="ghost"
                className="px-6 sm:px-8 h-12 sm:h-14 text-gray-400 font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white/5 hover:text-white rounded-xl sm:rounded-2xl flex-1 md:flex-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="px-8 sm:px-10 h-12 sm:h-14 bg-[#3EC6EC] hover:bg-[#2FB0D3] text-white font-bold rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-[#3EC6EC]/20 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 flex-[2] md:flex-none"
              >
                {isSaving ? (
                  <Loader2 size={18} className="sm:size-5 animate-spin" />
                ) : (
                  <Save size={18} className="sm:size-5" strokeWidth={2.5} />
                )}
                <span className="text-sm sm:text-base">Save Changes</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
