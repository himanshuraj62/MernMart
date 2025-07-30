import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi';
import { Eye, EyeOff } from 'lucide-react';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const validateValue = Object.values(data).every(el => el);
    const handleSubmit = async (e) => {
        e.preventDefault();

        //optional (also handled from backend)
        if (data.newPassword !== data.confirmPassword) {
            toast.error("New password and confirm password must be same.")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
               

                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                });
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error);
        }
    };
    //checking that the user has came from the otp verification page
    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }

        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    };


    return (
        <div className="flex justify-center items-center px-4 bg-green-50 min-h-[calc(100vh-160px)]">

            <div className="w-full max-w-sm bg-white p-5 rounded-xl shadow-md border border-green-200">
                <h3 className="text-center text-green-600 text-sm mb-1">Welcome to MernMart</h3>
                <h2 className="text-xl font-semibold text-center text-yellow-500 mb-5">Enter Your Password</h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <div>
                        <label className="block text-sm font-medium text-green-700">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder="Enter your new password"
                                className="mt-1 w-full px-3 py-1.5 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 top-[10px] cursor-pointer text-green-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-green-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="mt-1 w-full px-3 py-1.5 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 top-[10px] cursor-pointer text-green-600"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                    </div>
                    <button
                        disabled={!validateValue}
                        className={`w-full text-green-900 py-2 rounded-md text-sm transition duration-300 font-medium 
                        ${validateValue ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-400 cursor-not-allowed'}`}
                        type="submit"
                    >
                        Change Password
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-700 hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword
