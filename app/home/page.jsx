"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Home from "@/components/Home";

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push("/signin");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>; // You can add a skeleton here later
  }

  if (!isAuthenticated()) {
    return null; // Will redirect in useEffect
  }

  return <Home />;
}
