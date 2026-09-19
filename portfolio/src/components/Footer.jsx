import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center text-sm select-none mt-12">
      <a
        href="https://github.com/pitanu"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
        className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors duration-300"
      >
        <Github size={18} />
        GitHub
      </a>
      <p className="mt-2 text-center">
        © {new Date().getFullYear()} Taavi Pinola. All rights reserved.
      </p>
    </footer>
  );
}
