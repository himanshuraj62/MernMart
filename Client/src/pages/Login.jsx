import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.jsx';
import SummaryApi from '../common/SummaryApi.jsx';
import Axios from '../utils/Axios.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({ email: "", password: "" });
        navigate("/");
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 bg-green-50 min-h-[calc(100vh-160px)]">
      
      <div className="w-full max-w-sm bg-white p-5 rounded-xl shadow-md border border-green-200">
        <h3 className="text-center text-green-600 text-sm mb-1">Welcome to MernMart</h3>
        <h2 className="text-xl font-semibold text-center text-yellow-500 mb-5">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
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

          <div>
            <label className="block text-sm font-medium text-green-700">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full px-3 py-1.5 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            disabled={!validateValue}
            className={`w-full text-green-900 py-2 rounded-md text-sm transition duration-300 font-medium 
              ${validateValue ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-400 cursor-not-allowed'}`}
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-700 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

