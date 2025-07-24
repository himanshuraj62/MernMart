const generateOtp = async (req,res) => {
    return Math.floor(Math.random() * 900000)+100000; // return the 6 digit random number from 100000 to 999999 considered as otp
}

export default generateOtp;