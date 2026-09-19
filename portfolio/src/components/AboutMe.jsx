import React from "react";

export default function AboutMe() {
  return (
    
    <section className="rounded-2xl bg-slate-950/70 backdrop-blur-sm p-8 md:p-10 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] ring-1 ring-indigo-400/30">
      <h2 className="text-4xl font-bold text-white">About Me</h2>
      <p className="text-lg text-gray-200 leading-relaxed">
        Hello! I’m Taavi Pinola from Finland. I am a passionate developer, who loves building web apps with React.
        I enjoy creating beautiful, responsive interfaces with a smooth user experience.
      </p>
      <br />
      <p className="text-lg text-gray-200 leading-relaxed">
        I have experience with frontend and backend development, and I’m always eager to learn new technologies and improve my coding skills and knowledge.
        When I’m not coding, I like to spend time gaming, photographing, and exploring the world of technology.
      </p>
      <br />
    </section>
  );
}
