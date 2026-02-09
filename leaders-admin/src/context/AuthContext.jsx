"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token in cookies on mount
    const savedToken = Cookies.get("auth_token");
    const savedUser = Cookies.get("auth_user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Failed to parse user cookie", e);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: { email, password },
      });

      // Based on USER request: returns { user: {...}, token: "..." }
      const { user, token } = data;

      setToken(token);
      setUser(user);

      // Save to cookies
      Cookies.set("auth_token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("auth_user", JSON.stringify(user), {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      // Redirect based on role
      if (user.role === "superadmin") {
        router.push("/admin/superadmin/dashboard");
      } else {
        router.push("/admin/useradmin/dashboard");
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || "Login failed. Please check your credentials.",
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      let body = profileData;
      let method = "PUT";

      // If we have an avatar (File object), we must use FormData
      if (profileData.avatar instanceof File) {
        const formData = new FormData();
        Object.keys(profileData).forEach((key) => {
          if (profileData[key] !== undefined) {
            formData.append(key, profileData[key]);
          }
        });
        // Laravel requires POST + _method spoofing for file uploads with PUT/PATCH
        formData.append("_method", "PUT");
        body = formData;
        method = "POST";
      }

      const data = await apiRequest("/user", {
        method,
        body,
      });

      const { user: updatedUser } = data;
      setUser(updatedUser);
      Cookies.set("auth_user", JSON.stringify(updatedUser), {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to update profile.",
      };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    Cookies.set("auth_user", JSON.stringify(updatedUser), {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("auth_token");
    Cookies.remove("auth_user");
    // Redirect to appropriate login page
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateProfile,
        updateUser,
        isLoading: loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
