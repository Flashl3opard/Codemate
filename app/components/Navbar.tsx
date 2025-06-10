import React from "react";
import { FaCode } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="w-screen h-1/5 bg-blue-950 p-0 m-0 flex shadow-lg">
      <div className="flex gap-2 items-center text-2xl font-extrabold m-3">
        <h1 className="text-amber-200">CodeMate</h1>
        <h1>
          <FaCode className="text-orange-500" />
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
