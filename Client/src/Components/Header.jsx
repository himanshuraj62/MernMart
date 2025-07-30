// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Search from './Search.jsx';
// import MernMart_logo from "../assets/MernMart_logo.png";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { BsCart4 } from "react-icons/bs";
// import { useSelector } from 'react-redux';
// import { GoTriangleDown } from "react-icons/go";
// import { GoTriangleUp } from "react-icons/go";

// const Header = () => {
//   const navigate = useNavigate()
//   const user = useSelector((state)=>state?.user?.user)
//   console.log()
//   const redirectToLoginPage = () => {
//     navigate("/login")
//   }
//   return (
//     <header className="sticky top-0 bg-white z-50 shadow-sm h-20">
//       <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">

//         {/* Logo (larger on desktop) */}
//         <div className="flex-shrink-0">
//           <Link to="/" className="block h-16 lg:h-20">
//             <img
//               src={MernMart_logo}
//               alt="MernMart Logo"
//               className="h-full w-auto"
//             />
//           </Link>
//         </div>

//         {/* Search bar */}
//         <div className="flex-1 max-w-2xl px-4">
//           <Search />
//         </div>

//         {/* Login + Cart */}
//         <div className="flex items-center gap-4 whitespace-nowrap">
//           <button className="text-neutral-600 lg:hidden">
//             <FaRegCircleUser size={24} />
//           </button>

//           <div className='hidden lg:flex items-center gap-10 '>
//             {
//               user?._id ? (
//                 <div>
//                   <div className='flex items-center gap-2'>
//                     <p>Account</p>
//                     <GoTriangleDown />
//                     {/* <GoTriangleUp /> */}
//                   </div>
//                 </div>
//               ):(

//                 <button onClick={redirectToLoginPage} className='px-2 text-lg'>Login</button>
//               )
//             }
//             <button className="flex items-center gap-2 bg-green-600 px-4 py-1.5 text-white rounded-md hover:bg-green-800 transition">
//               <div className='animate-bounce'>
//                 <BsCart4 size={35} />
//               </div>

//               <div className="text-sm leading-tight">
//                 <p className="font-medium">My Cart</p>

//               </div>
//             </button>
//           </div>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search.jsx';
import MernMart_logo from "../assets/MernMart_logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu.jsx';

const Header = () => {
  const navigate = useNavigate();


  const user = useSelector((state) => state?.user);
 
  const [openUserMenu, setopenUserMenu] = useState(false)
  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setopenUserMenu(false)
  }
  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }

    navigate("/user")
  }

  return (
    <header className="sticky top-0 bg-white z-50 shadow-sm h-25">
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4 ">

        {/* Logo */}
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

        {/* Login / Account + Cart */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
            <FaRegCircleUser size={24} />
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-10 ">
            {user?._id ? (
              <div className='relative'>
                <div onClick={() => setopenUserMenu(preve => !preve)} className="flex select-none items-center gap-2 cursor-pointer">
                  <p className="text-base text-gray-800">Account</p>
                  {
                    openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )
                  }

                </div>
                {
                  openUserMenu && (
                    <div className='absolute left-0 right-0 top-12'>
                      <div className="bg-white rounded lg:shadow-lg p-4 min-w-52 ">
                        <UserMenu  close={handleCloseUserMenu}/>
                      </div>
                    </div>
                  )
                }

              </div>

            ) : (
              <button
                onClick={redirectToLoginPage}
                className="px-2 text-lg text-green-700 hover:underline"
              >
                Login
              </button>
            )}

            <button className="flex items-center gap-2 bg-green-600 px-4 py-1.5 text-white rounded-md hover:bg-green-800 transition">
              <div className="animate-bounce">
                <BsCart4 size={30} />
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
