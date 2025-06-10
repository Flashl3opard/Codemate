import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="self-end   flex items-end justify-center gap-5 ">
      <h1 className="text-5xl">
        <Link href="https://github.com/Flashl3opard">
          <FaGithub className="hover:text-gray-400" />
        </Link>
      </h1>
      <h1 className="text-5xl">
        <Link href="https://www.linkedin.com/in/yash-sheorey-94661b28b/">
          <FaLinkedin className="hover:text-blue-400" />
        </Link>
      </h1>
    </div>
  );
};

export default Footer;
