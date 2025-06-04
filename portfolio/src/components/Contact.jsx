import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    });

    if (res.ok) {
      setStatus("sent");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="bg-transparent rounded-xl p-22 shadow-[0_0_15px_3px_rgba(0,255,255,0.7)] ring-1 ring-cyan-300">
        <h1 className="text-4xl font-bold text-indigo-700 text-center">Contact Me</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-3/4 outline outline-1 outline-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center placeholder:text-center"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-3/4 outline outline-1 outline-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center placeholder:text-center"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="3"
            required
            className="w-3/4 outline outline-1 outline-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 text-center placeholder:text-center"
            placeholder="Your Message"
          />
        </div>

        <div className="text-center ">
          <button
            type="submit"
            disabled={status === "sending"}
            className={`inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition duration-300 ${
              status === "sending" ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {status === "sending" && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
        </div>
          <br></br>
        {status === "sent" && (
          <p className="text-green-600 text-center font-medium">Your message has been sent!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center font-medium">Something went wrong. Try again.</p>
        )}
      </form>
      </div>
    </>
  );
}
