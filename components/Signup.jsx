"use client";
import { useState } from "react"; // for form state
import { useRouter } from "next/navigation"; // for redirecting after signup
import Link from "next/link"; // for navigation links
import { useAuth } from "@/context/AuthContext"; // for authentication

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData, //keep other field unchanged
      [e.target.name]: e.target.value, //update only the field that changed
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.first_name);
      router.push("/home"); // Redirect to home page after registration
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
          <div className="w-full max-w-[450px] bg-black/75 rounded px-8 md:px-16 py-12 md:py-16">
            <h1 className="text-white text-3xl font-bold mb-7">Sign Up</h1>

            {error && (
              <div className="bg-red-600/90 text-white text-sm p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative h-14">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="peer w-full h-full bg-neutral-800/80 border border-neutral-500 rounded px-5 pt-4 text-white placeholder-transparent focus:bg-neutral-800/80 focus:border-white focus:outline-none transition"
                  placeholder="First Name"
                />
                <label
                  htmlFor="first_name"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:text-xs peer-focus:top-4 peer-valid:text-xs peer-valid:top-4"
                >
                  First Name
                </label>
              </div>

              <div className="relative h-14">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="peer w-full h-full bg-neutral-800/80 border border-neutral-500 rounded px-5 pt-4 text-white placeholder-transparent focus:bg-neutral-800/80 focus:border-white focus:outline-none transition"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:text-xs peer-focus:top-4 peer-valid:text-xs peer-valid:top-4"
                >
                  Email
                </label>
              </div>

              <div className="relative h-14">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
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

              <div className="relative h-14">
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="peer w-full h-full bg-neutral-800/80 border border-neutral-500 rounded px-5 pt-4 text-white placeholder-transparent focus:bg-neutral-800/80 focus:border-white focus:outline-none transition"
                  placeholder="Confirm Password"
                />
                <label
                  htmlFor="password2"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:text-xs peer-focus:top-4 peer-valid:text-xs peer-valid:top-4"
                >
                  Confirm Password
                </label>
              </div>

              <button
                type="submit"
                disabled={loading} //Button disabled when loading = true
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors disabled:opacity-50" //opacity to 50% when disabled
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            <p className="text-neutral-400 text-base mt-16">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-white hover:underline font-medium"
              >
                Sign in now
              </Link>
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
