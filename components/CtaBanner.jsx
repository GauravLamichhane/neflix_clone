"use client";
import { useState } from "react";

export default function CtaBanner() {
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
      setEmail("");
    } else {
      alert("Failed to send email");
    }
  };

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-white text-lg">
          Ready to watch? Enter your email to create or restart your membership.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative h-12 min-[588px]:h-14 w-full min-[588px]:flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-full rounded bg-black/70 px-4 text-sm min-[588px]:text-base text-white border border-white/30 focus:outline-none focus:border-white transition peer focus:pt-4 valid:pt-4"
            />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm min-[588px]:text-base text-gray-400 pointer-events-none transition-all duration-100 peer-focus:text-xs peer-focus:-translate-y-[130%] peer-valid:text-xs peer-valid:-translate-y-[130%]">
              Email address
            </label>
          </div>
          <button
            type="submit"
            className="h-12 sm:h-14 rounded bg-red-600 px-6 text-lg font-semibold flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-auto hover:bg-red-700 transition
            "
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
    </section>
  );
}
