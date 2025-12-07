"use client";
import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    //sends the data to the backend and gets a response back
    //await makes sure that your code pause and wait for a response
    const res = await fetch("http://127.0.0.1:8000/api/send-email/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), //converts json oject or arr in json (serializarion or marshalling)
    });
    const data = await res.json();

    if (data.success) {
      alert("Email sent successfully!");
      setEmail(""); // Clear the input field
    } else {
      alert("Failed to send email");
    }
  };
  return (
    <div className="relative min-h-screen w-full">
      <img
        src="/hero.webp"
        alt="Netflix Background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        priority="true"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/60 to-black"></div>
      <div className="absolute flex flex-col justify-center items-center inset-0 px-4 text-center">
        <h1
          className="text-white font-extrabold text-[32px] md:text-5xl lg:text-6xl leading-tight m-0 mb-2 p-0 max-w-4xl"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          Unlimited movies, TV <br className="hidden sm:block" />
          shows, and more
        </h1>
        <p className="text-white text-[16px] mt-4 font-bold">
          Starts at USD 2.99. Cancel anytime.
        </p>
        <p className="text-white text-[16px] mt-6 max-w-2xl">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="mt-6 w-full max-w-md min-[588px]:max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col min-[588px]:flex-row gap-3 min-[588px]:gap-2"
          >
            <div className="relative h-12 min-[588px]:h-14 w-full min-[588px]:flex-1">
              <input
                type="email"
                value={email}
                required
                className="w-full h-full rounded bg-black/70 px-4 text-sm min-[588px]:text-base text-white border border-white/30 focus:outline-none focus:border-white transition peer focus:pt-4 valid:pt-4"
                onChange={(e) => setEmail(e.target.value)} //takes what they type and save it to our email
              />
              <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm min-[588px]:text-base text-gray-400 pointer-events-none transition-all duration-100 peer-focus:text-xs peer-focus:-translate-y-[130%] peer-valid:text-xs peer-valid:-translate-y-[130%]">
                Email address
              </label>
            </div>
            <button
              type="submit"
              className="h-12 min-[588px]:h-14 rounded bg-red-600 px-6 text-lg min-[588px]:text-xl font-semibold text-white hover:bg-red-700 transition flex items-center justify-center gap-2 mx-auto min-[588px]:mx-0 whitespace-nowrap"
            >
              Get Started
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
