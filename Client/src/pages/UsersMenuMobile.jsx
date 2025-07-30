import React from 'react'
import UserMenu from '../Components/UserMenu'
import { IoIosClose } from "react-icons/io";

const UsersMenuMobile = () => {
  return  (
    <section className='bg-white h-full w-full py-2'>
        <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
         
          <IoIosClose size={25}/>
        </button>
        <div className='container mx-auto px-3 '>
           <UserMenu/>
        </div>
    </section>
  )
}

export default UsersMenuMobile
