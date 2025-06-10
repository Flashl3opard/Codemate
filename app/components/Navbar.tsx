import React from "react";
import { FaCode } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-blue-950 py-4 px-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-start justify-center items-center gap-2 sm:gap-4">
        <h1 className="text-amber-200 text-2xl font-extrabold">CodeMate</h1>
        <FaCode className="text-orange-500 text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
