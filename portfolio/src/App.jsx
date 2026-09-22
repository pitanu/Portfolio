import { useInView } from "./hooks/useInView";
import './App.css';
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import Starfield from "./components/Starfield.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Typewriter from "./components/Typewriter.jsx";

export default function App() {
  const [aboutRef, aboutVisible] = useInView();
  const [contactRef, contactVisible] = useInView();

  const messages = [
  "Program developer",
  "Hobbyist photographer",
  "Computer security enthusiast",
  ];

  return (
    <div id="top" className="flex flex-col p-6 md:p-20 min-h-screen overflow-y-visible relative scroll-smooth">

      {/* Starfield canvas background */}
      <Starfield />
      <CursorGlow />

      {/* First screen: navbar on top, hero centered in the space that remains */}
      <div className="flex h-[calc(100svh_-_2.5rem)] md:h-[calc(100svh_-_6rem)] flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <div className="relative isolate flex flex-1 flex-col bg-transparent text-white items-center justify-center">
          {/* Nebula aura: bleeds past the page padding to the viewport edges so
              the starfield-only gutters don't show as darker side strips. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -inset-x-6 md:-inset-x-20 -z-10 overflow-hidden"
          >
            <div className="absolute left-1/2 top-1/2 h-[32rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />
            <div className="absolute -right-24 top-32 h-[20rem] w-[32rem] rounded-full bg-cyan-500/[0.06] blur-[110px]" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">my name is</p>
            <h1 className="bg-gradient-to-r from-indigo-300 via-sky-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(129,140,248,0.35)]">
              Taavi Pinola
            </h1>
          </div>
          <Typewriter lines={messages} speed={100} pause={1200} />
          <br></br>
          <p className="w-3/4 text-slate-400">
            I am a passionate developer, who loves building web apps with React.
            I enjoy creating beautiful, responsive interfaces with smooth user experience and robust security.
          </p>
        </div>
      </div>

      {/* About Me */}
      <section
        id="aboutMe"
        ref={aboutRef}
        className={`w-full flex justify-center z-10 transition-opacity duration-700 ease-out ${
          aboutVisible ? "opacity-100" : "opacity-0"
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
