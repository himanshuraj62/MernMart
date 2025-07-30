
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.jsx';
import SummaryApi from '../common/SummaryApi.jsx';
import Axios from '../utils/Axios.jsx';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const OtpVerification = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(["", "", "", "", "", ""]);

    const validateValue = data.every(el => el);
    //Accepting data from forgotpassword (email)
    const location = useLocation()

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password")
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData(["", "", "", "", "", ""]);
                navigate("/reset-password", { state: {data:response.data,email:location?.state?.email} });
            }

        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="flex justify-center items-center px-4 bg-green-50 min-h-[calc(100vh-180px)]">

            <div className="w-full max-w-sm bg-white p-5 rounded-xl shadow-md border border-green-200">
                <h3 className="text-center text-green-600 text-sm mb-1">Welcome to MernMart</h3>
                <h2 className="text-xl font-semibold text-center text-yellow-500 mb-5">OTP Verification</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-green-700">Enter Your OTP</label>
                        <div className="flex justify-between gap-2 mt-1">
                            {
                                data.map((elem, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={elem}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9a-zA-Z]/, "");
                                            if (val.length === 1) {
                                                const newData = [...data];
                                                newData[index] = val;
                                                setData(newData);
                                                // move to next input
                                                const next = document.getElementById(`otp-${index + 1}`);
                                                if (next) next.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Backspace") {
                                                const newData = [...data];
                                                newData[index] = "";
                                                setData(newData);
                                                if (index > 0) {
                                                    const prev = document.getElementById(`otp-${index - 1}`);
                                                    if (prev) prev.focus();
                                                }
                                            }
                                        }}
                                        id={`otp-${index}`}
                                        className="w-10 h-10 text-center border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                ))
                            }
                        </div>



                    </div>




                    <button
                        disabled={!validateValue}
                        className={`w-full text-green-900 py-2 rounded-md text-sm transition duration-300 font-medium 
                        ${validateValue ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-400 cursor-not-allowed'}`}
                        type="submit"
                    >
                        Verify OTP
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-700 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default OtpVerification;