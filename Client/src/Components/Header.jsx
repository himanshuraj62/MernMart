import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search.jsx';
import MernMart_logo from "../assets/MernMart_logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate()
  const redirectToLoginPage = () => {
    navigate("/login")
  }
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

          <div className='hidden lg:flex items-center gap-10 '>
            <button onClick={redirectToLoginPage} className='px-2 text-lg'>Login</button>
            <button className="flex items-center gap-2 bg-green-600 px-4 py-1.5 text-white rounded-md hover:bg-green-800 transition">
              <div className='animate-bounce'>
                <BsCart4 size={35} />
              </div>

              <div className="text-sm leading-tight">
                <p className="font-medium">My Cart</p>

              </div>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
