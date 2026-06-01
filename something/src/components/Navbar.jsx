import React from "react";
import logo from "../assets/vibecastlogo.png"; // Ensure the logo path is correct

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50 h-16 flex items-center px-6">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img src={logo} alt="Vibecast Logo" className="h-10 w-auto" />
        <span className="text-xl font-bold">Vibecast</span>
      </div>
      <div className="ml-auto">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-md bg-gray-700 border-none text-sm text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </nav>
  );
};

export default Navbar; // Fixed export casing
