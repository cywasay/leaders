"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { User, Mail, Lock, Save, Loader2, Camera, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    setAvatarPreview(user?.avatar || null);
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
      // Clear password fields
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-400">
          Manage your profile information and security
        </p>
      </div>

      <div className="bg-[#2D2D2D] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="divide-y divide-white/5">
          {/* Profile Section */}
          <div className="p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <User size={20} className="text-[#3EC6EC]" />
              Profile Information
            </h2>

            {/* Avatar Upload */}
            <div className="flex flex-col md:flex-row items-center gap-8 pb-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/5 border-4 border-[#2D2D2D] shadow-md relative">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Avatar Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 bg-[#3EC6EC] text-white rounded-full shadow-lg cursor-pointer hover:bg-[#2fb0d4] transition-all transform hover:scale-110"
                >
                  <Camera size={18} />
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
                    className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:scale-110"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-medium text-white">Profile Picture</h3>
                <p className="text-sm text-gray-400">
                  JPG, GIF or PNG. Max size of 2MB
                </p>
                {formData.avatar && (
                  <span className="inline-block px-2 py-1 bg-[#3EC6EC]/10 text-[#3EC6EC] text-[10px] font-bold rounded mt-2 uppercase tracking-wider">
                    New Image Selected
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#3EC6EC]/50 focus:border-[#3EC6EC] transition-all outline-none text-white placeholder:text-gray-600"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#3EC6EC]/50 focus:border-[#3EC6EC] transition-all outline-none text-white placeholder:text-gray-600"
                    placeholder="admin@leaders.com"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-6 md:p-8 space-y-6 bg-white/5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Lock size={20} className="text-[#3EC6EC]" />
              Security (Change Password)
            </h2>
            <p className="text-sm text-gray-400">
              Leave these fields blank if you don't want to change your
              password.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#2D2D2D] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#3EC6EC]/50 focus:border-[#3EC6EC] transition-all outline-none text-white placeholder:text-gray-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#2D2D2D] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#3EC6EC]/50 focus:border-[#3EC6EC] transition-all outline-none text-white placeholder:text-gray-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-6 md:p-8 bg-[#2D2D2D] flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-gray-400 font-medium hover:bg-white/5 rounded-xl transition-all hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-2.5 bg-[#FF7300] hover:bg-[#E66700] text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 disabled:opacity-70 disabled:shadow-none"
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
