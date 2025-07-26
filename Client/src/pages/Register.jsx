// import React, { useState } from 'react'

// const Register = () => {
//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: ""
//     })
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData((previous)=>{
//             return {...previous,
//                 [name] : value
//             }
//         })
//     }
//     console.log(data)
//     return (
//         <section className=" w-full container mx-auto px-4">
//             <div className='bg-white rounded p-4 my-4 mx-auto w-full max-w-lg'>
//                 <p>Welcome to MernMart</p>

//                 <form action="" className='grid gap-2 mt-6'>
//                     <div className='grid'>
//                         <label htmlFor="name">Name : </label>
//                         <input id='name' type="text" autoFocus className='bg-blue-50 p-2' name='name' value={data.name} onChange={handleChange} />

//                     </div>
//                 </form>

//             </div>
//         </section>
//     )
// }

// export default Register



import React, { useState } from 'react';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="bg-green-50 w-full min-h-0 pt-10 pb-6 px-4 flex justify-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md border border-green-200">
        
        {/* Welcome Heading */}
        <h3 className="text-center text-green-600 text-sm mb-1">Welcome to MernMart</h3>
        <h2 className="text-xl font-semibold text-center text-yellow-500 mb-5">Create Account</h2>

        <form className="space-y-3">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-green-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 w-full px-3 py-1.5 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-green-700">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-1.5 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-green-700">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="mt-1 w-full px-3 py-1.5 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-green-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="mt-1 w-full px-3 py-1.5 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-green-900 py-2 rounded-md text-sm hover:bg-yellow-500 transition duration-300 font-medium"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-700 hover:underline">Login</a>
        </p>
      </div>
    </section>
  );
};

export default Register;
