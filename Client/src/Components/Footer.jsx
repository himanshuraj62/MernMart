// import React from 'react'
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa6";
// import { FaLinkedin } from "react-icons/fa";
// import { IoLogoGithub } from "react-icons/io";

// const Footer = () => {
//     return (
//         <footer className="border-t">
//             <div className="container mx-auto p-6 flex flex-col items-center gap-3 text-center lg:flex-row lg:justify-between lg:items-center">
                
//                 {/* Text */}
//                 <p className="text-sm">© All Rights Reserved 2024.</p>

//                 {/* Social Icons */}
//                 <div className="flex items-center gap-4 text-2xl">
//                     <a href="#" className="hover:text-primary-100">
//                         <FaFacebook />
//                     </a>
//                     <a href="#" className="hover:text-primary-100">
//                         <FaInstagram />
//                     </a>
//                     <a href="#" className="hover:text-primary-100">
//                         <FaLinkedin />
//                     </a>
//                     <a href="#" className="hover:text-primary-100">
//                         <IoLogoGithub />
//                     </a>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='container mx-auto p-6 text-center flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-between lg:items-center'>
        
        {/* Text */}
        <p>© All Rights Reserved 2024.</p>
        
        {/* Icons */}
        <div className='flex items-center gap-4 text-2xl'>
          <a href="#" className='hover:text-primary-100'>
            <FaFacebook />
          </a>
          <a href="#" className='hover:text-primary-100'>
            <FaInstagram />
          </a>
          <a href="#" className='hover:text-primary-100'>
            <FaLinkedin />
          </a>
          <a href="#" className='hover:text-primary-100'>
            <IoLogoGithub />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;

