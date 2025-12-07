"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from "@/lib/api";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        // You can decode token or fetch user info here
        setUser({ email: "user@example.com" }); // Placeholder
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    await apiLogin(email, password);
    setUser({ email });
  };

  const register = async (email, password, first_name) => {
    await apiRegister(email, password, first_name);
    setUser({ email });
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
