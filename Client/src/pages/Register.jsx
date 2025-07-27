

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.jsx';
import SummaryApi from '../common/SummaryApi.jsx';
import Axios from '../utils/Axios.jsx';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const validateValue = Object.values(data).every(el => el);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (data.password !== data.confirmPassword) {
    toast.error("Password and Confirm Password must be same");
    return; // prevent further execution
  }

  try {
    const response = await Axios({
      ...SummaryApi.register,
      data: data
    });

    if (response.data.error) {
      toast.error(response.data.message);
    }

    if (response.data.success) {
      toast.success(response.data.message);

      // Reset the form fields
      setData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

     
      navigate("/login");
    }

  } catch (error) {
    AxiosToastError(error);
  }
};



  return (
    <section className="bg-green-50 w-full min-h-0 pt-10 pb-6 px-4 flex justify-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md border border-green-200">

        {/* Welcome Heading */}
        <h3 className="text-center text-green-600 text-sm mb-1">Welcome to MernMart</h3>
        <h2 className="text-xl font-semibold text-center text-yellow-500 mb-5">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
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
            disabled={!validateValue}
            className={`w-full text-green-900 py-2 rounded-md text-sm transition duration-300 font-medium 
              ${validateValue ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-400 cursor-not-allowed'}`}
            type="submit"
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

