import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center">
            <span className="text-2xl md:text-3xl text-white font-bold font-titleFont relative">
              eBazaar
              <span className="absolute bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8 text-sm font-medium">
              {["About", "Privacy Policy", "Licensing", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="not-available"
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center text-sm">
          © {currentYear} eBazaar. All Rights Reserved.
        </div>
        <div className="flex items-center justify-center text-sm text-center gap-1 text-gray-700">
          <span>Made with</span>
          <FaHeart />
          <span>by MFC</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
