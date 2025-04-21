import React from 'react'
import { SiLeetcode } from "react-icons/si";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const links = [
  { href: "https://github.com/Spacifier", icon: <FaGithub /> },
  { href: "https://leetcode.com/u/Spacifier4040", icon: <SiLeetcode /> },
  { href: "https://www.linkedin.com/in/Spacifier4040/", icon: <FaLinkedin /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#716d69] py-5 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
        &copy; Spacifier 2025. All rights reserved
        </p>
        
        <div className="flex justify-center gap-4  md:justify-start">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right mr-2"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;