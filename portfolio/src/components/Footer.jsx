import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row items-center justify-between text-sm select-none mt-12">
      
      {/* logo / name reserve */}
      <div className="mb-4 md:mb-0 font-semibold text-indigo-500 cursor-default">
      </div>

      {/* copyright */}
      <div className="text-center md:text-left mb-4 md:mb-0">
        {new Date().getFullYear()} © TP. All rights reserved.
      </div>
    </footer>
  );
}
