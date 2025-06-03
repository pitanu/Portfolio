import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ visible }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#aboutMe" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`bg-transparent shadow-md px-6 md:px-12 py-5 transition-all duration-700 ease-out z-50 mb-12 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}>

      <div className="relative max-w-7xl mx-auto flex items-center justify-center">

        {/* Desktop Nav (centered) */}
        <nav className="hidden md:flex gap-10 text-lg font-medium">
          {navItems.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-700 group"
            >
              {name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 absolute right-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col items-center space-y-4 md:hidden text-lg font-medium">
          {navItems.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
