import React, { useState } from "react";

const inputClasses =
  "w-full rounded-lg bg-slate-900/70 border border-slate-700 px-4 py-2.5 text-left text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40 transition-colors";

export default function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl bg-slate-950/70 backdrop-blur-sm p-8 md:p-10 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] ring-1 ring-indigo-400/30">
      <h2 className="text-4xl font-bold text-white text-center">Contact Me</h2>
      <p className="mt-2 text-center text-slate-400">
        Feel free to reach out — I'll get back to you as soon as I can.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-slate-300"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClasses}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-slate-300"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-slate-300"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            required
            maxLength={5000}
            className={`${inputClasses} resize-none`}
            placeholder="What's on your mind?"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          aria-disabled={status === "sending"}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 transition duration-300 ${
            status === "sending" ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {status === "sending" && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
              />
            </svg>
          )}
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        <div aria-live="polite">
          {status === "sent" && (
            <p className="text-emerald-400 text-center font-medium">
              Your message has been sent!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center font-medium">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
