"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
    }
    // Success is handled by redirect in AuthContext
  };

  return (
    <div className="flex flex-col w-full max-w-[327px] gap-8 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top section: Heading + Email + Password + Forgot Password */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-5"
        autoComplete="off"
      >
        <div className="text-center">
          <h2 className="text-3xl font-medium text-white font-outfit">Login</h2>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="relative w-full group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3EC6EC] transition-colors"></div>
          <input
            type="email"
            placeholder="hello@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full h-14 px-6 rounded-full border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-[#3EC6EC] focus:ring-1 focus:ring-[#3EC6EC]/20 transition-all placeholder-gray-400 font-medium"
          />
        </div>

        {/* Password Input + Forgot Password */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3EC6EC] transition-colors"></div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full h-14 px-6 rounded-full border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-[#3EC6EC] focus:ring-1 focus:ring-[#3EC6EC]/20 transition-all placeholder-gray-400 font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-center w-full">
            <Link
              href="/admin/forgot-password"
              className="text-sm font-semibold text-gray-400 hover:text-[#3EC6EC] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <div className="w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full h-16 rounded-full bg-[#3EC6EC] hover:bg-[#2FB0D3] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg p-2 shadow-lg shadow-[#3EC6EC]/20 flex items-center justify-center transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{isSubmitting ? "Logging in..." : "Login"}</span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#3EC6EC] shadow-sm">
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <ArrowRight size={20} strokeWidth={2.5} />
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
