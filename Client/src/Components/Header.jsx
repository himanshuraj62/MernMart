import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import MernMart_logo from "../assets/MernMart_logo.png";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white z-50 shadow-sm h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">

        {/* Logo (larger on desktop) */}
        <div className="flex-shrink-0">
          <Link to="/" className="block h-16 lg:h-20">
            <img
              src={MernMart_logo}
              alt="MernMart Logo"
              className="h-full w-auto"
            />
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl px-4">
          <Search />
        </div>

        {/* Login + Cart */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          <button className="text-neutral-600 lg:hidden">
            <FaRegCircleUser size={24} />
          </button>
          <span>Login</span>
          <span>My Cart</span>
        </div>

      </div>
    </header>
  );
};

export default Header;
