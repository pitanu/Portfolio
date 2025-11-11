import { useState, useEffect } from "react";
import { useInView } from "./hooks/useInView";
import './App.css';
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import Starfield from "./components/Starfield.jsx";
import Typewriter from "./components/Typewriter.jsx";

export default function App() {
  const [headerRef, headerVisible] = useInView();
  const [contentRef, contentVisible] = useInView();
  const [card1Ref, card1Visible] = useInView();
  const [card2Ref, card2Visible] = useInView();
  const [contactRef, contactVisible] = useInView();

  const messages = [
  "Program developer",
  "Hobbyist photographer",
  "Computer security enthusiast",
  ];

  return (
    <div className="flex flex-col p-20 min-h-screen overflow-y-visible relative scroll-smooth">
      
      {/* Starfield canvas background */}
      <Starfield />

      {/* Navbar */}
      <div ref={headerRef} className="relative z-50">
        <Navbar visible={headerVisible} />
      </div>
      <br></br>
      <main
        ref={contentRef}
        className={`flex-grow flex justify-center items-start mt-20 px-6 transition-opacity duration-700 ease-out ${
          contentVisible ? "opacity-100" : "opacity-0"
        }`}>
        {}
      </main>
        <div className="flex flex-col min-h-screen bg-transparent text-white items-center justify-center">
          <div>
            <h5 className="">my name is</h5>
            <h1 className="">Taavi Pinola</h1>
          </div>
          <Typewriter lines={messages} speed={100} pause={1200} />
          <br></br>
          <p className="w-3/4">
            I am a passionate developer student who loves building web apps with React.
            I enjoy creating beautiful, responsive interfaces with smooth user experience and robust security.
          </p>
        </div>

      {/* About Me */}
      <section
        id="aboutMe"
        ref={contactRef}
        className={`w-full flex justify-center z-10 transition-opacity duration-700 ease-out ${
          contactVisible ? "opacity-100" : "opacity-0"
        }`}>
        <div className="w-full max-w-2xl bg-transparent rounded-xl shadow-lg">
          <AboutMe />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`w-full flex justify-center z-10 transition-opacity duration-700 ease-out ${
          contactVisible ? "opacity-100" : "opacity-0"
        }`}>
        <div className="w-full max-w-xl rounded-md shadow-sm">
          <Contact />
        </div>
      </section>
       
      {/* Footer Section */}
      <footer className="w-full flex justify-center bg-transparent text-gray-400 mt-12 z-10">
        <div className="max-w-5xl md-0">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
