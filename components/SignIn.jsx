"use client";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignIn() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  function onCaptchaChange(token) {
    setCaptchaToken(token);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/home");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url(/hero.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
      </div>

      <div className="relative z-10">
        <nav className="px-12 md:px-20 lg:px-32 py-4 md:py-6 transition-all duration-300 ease-in-out">
          <Link href="/">
            <img
              src="/netflix-3.svg"
              alt="Netflix"
              className="w-28 md:w-32 lg:w-36 h-auto cursor-pointer transition-all duration-300 ease-in-out"
            />
          </Link>
        </nav>

        <div className="flex justify-center items-center px-4 py-8 md:py-12">
          <div className="w-full max-w-[450px] bg-black/35 rounded px-8 md:px-16 py-12 md:py-16">
            <h1 className="text-white text-3xl font-bold mb-7">Sign In</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="relative h-14">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full h-full bg-neutral-800/80 border border-neutral-500 rounded px-5 pt-4 text-white placeholder-transparent focus:bg-neutral-800/80 focus:border-white focus:outline-none transition"
                  placeholder="Email or phone number"
                />
                <label
                  htmlFor="email"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:text-xs peer-focus:top-4 peer-valid:text-xs peer-valid:top-4"
                >
                  Email or phone number
                </label>
              </div>

              <div className="relative h-14">
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full h-full bg-neutral-800/80 border border-neutral-500 rounded px-5 pt-4 text-white placeholder-transparent focus:bg-neutral-800/80 focus:border-white focus:outline-none transition"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:text-xs peer-focus:top-4 peer-valid:text-xs peer-valid:top-4"
                >
                  Password
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-medium rounded transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="text-center text-neutral-400 text-sm my-4">
                OR
              </div>

              <button
                type="button"
                className="w-full h-12 bg-neutral-500/30 hover:bg-neutral-500/40 text-extrawhite font-bold rounded transition-colors"
              >
                Use a Sign-In Code
              </button>

              <a
                href="#"
                className="block text-center text-extrawhite font-bold hover:underline text-sm mt-4 underline"
              >
                Forgot password?
              </a>

              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="w-4 h-4 accent-neutral-400 cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-white text-sm cursor-pointer"
                >
                  Remember me
                </label>
              </div>
            </form>

            <div className="my-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onCaptchaChange}
              />
            </div>
            <p className="text-neutral-400 text-base mt-16">
              New to Netflix?{" "}
              <a
                href="/signup"
                className="text-white hover:underline font-medium"
              >
                Sign up now
              </a>
              .
            </p>

            <p className="text-neutral-500 text-xs mt-4 leading-relaxed">
              This page is protected by Google reCAPTCHA to ensure you&apos;re
              not a bot.
              <a href="#" className="text-blue-600 hover:underline">
                Learn more
              </a>
              .
            </p>
          </div>
        </div>

        <footer className="relative bg-neutral-900 px-6 md:px-40 lg:px-52 py-12 text-[#b3b3b3] mt-8">
          <p className="mb-6 text-base">
            Questions?{" "}
            <a href="#" className="underline hover:text-white">
              Contact us.
            </a>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 text-sm">
            <a href="#" className="underline hover:text-white">
              FAQ
            </a>
            <a href="#" className="underline hover:text-white">
              Help Center
            </a>
            <a href="#" className="underline hover:text-white">
              Terms of Use
            </a>
            <a href="#" className="underline hover:text-white">
              Privacy
            </a>
            <a href="#" className="underline hover:text-white">
              Cookie Preferences
            </a>
            <a href="#" className="underline hover:text-white">
              Corporate Information
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
