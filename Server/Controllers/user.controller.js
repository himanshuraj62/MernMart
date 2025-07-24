import dotenv from "dotenv";
dotenv.config();
import { json } from "express";
import UserModel from "../Models/user.model.js";
import bcryptjs from "bcryptjs"
import sendEmail from "../config/sendEmail.js";
import jwt from "jsonwebtoken";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
//registering controller
export async function registerUserController(req,res) {
    try {
        const{ name , email , password } = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message : "provide name , email , password",
                error: true,
                success : false
            })
        }
        //checking if user is already registered
        const user  = await UserModel.findOne({email});
        if(user){
            return res.json({
                message : "Already registered email",
                error: true,
                success : false
            })
        }

       // encrypting password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password , salt);

        
        //if user is new then register it in UserModel
        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        // after registering email verify the email
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
        // sending email to the user for email verification
        
        const verificationEmail = await sendEmail({
            sendTo : email,
            subject : "verify email from MernMart",
            html: verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            })
        });
       
        return res.json({
            message : "User Created Successfully",
            error : false,
            success : true,
            data : save
        })
    } catch (error) {
        return res.status(500).json({
            message :error.message || error,
            error: true,
            success : false
        })
    }
}
// after registering the user we are verifying the user email and changing its status 
export async function verifyEmailController(req,res){
    try {
      const {code}  = req.body;
      
      const user = await UserModel.findOne({_id:code})

      if(!user){
         return res.status(400).json({
            message :"invalid user",
            error : true, 
            success : false
           
        })
      }

      const updateUser = await UserModel.updateOne({_id:code},{
        verify_email:true
      })

      return res.json({
        message : "verification done ",
        success: true,
        error: false
      })

    } catch (error) {
        return res.status(500).json({
            message : error.message||error,
            error : true, 
            success : false
           
        })
    }
}

//login controller
export async function loginController(req,res){
    try {
        const{email , password} = req.body;
        // Check if both fields are provided
        if(!email || !password){
            return res.status(400).json({
            message :"provide email and password",
            error : true, 
            success : false
           
        }) 
        }

        //Check if user exists
        const user  = await UserModel.findOne({email})
         if(!user){
         return res.status(400).json({
            message :"User Not Registered",
            error : true, 
            success : false,
            
        })
     }
     //Ensures only users whose status is "Active" are allowed to log in.
     //Useful for blocking unverified, banned, or inactive users.
     if(user.status !== "Active"){
         return res.status(400).json({
            message :"contact to admin",
            error : true, 
            success : false
           
        })
     }
     //Compares the plain-text password (password) with the hashed password stored in the DB
     const checkPassword = await bcryptjs.compare(password , user.password);
     if(!checkPassword){
         return res.status(400).json({
            message :"check your password",
            error : true, 
            success : false
           
        })
     }
      //Generate JWT access & refresh tokens
    const accessToken = await generatedAccessToken(user._id)
    const refreshToken    = await generatedRefreshToken(user._id) 
    const cookiesOption = {
        httpOnly:true, // Cannot be accessed via JS in the browser (prevents XSS)
        secure : true, // Only sent over HTTPS
        sameSite:"None"  // Allows cookies to be sent across domains (important for frontend-backend on different origins)
    }
    //These secure cookies will be automatically sent with every request from the frontend
    res.cookie("accessToken", accessToken,cookiesOption)
    res.cookie("refreshToken", refreshToken,cookiesOption)


    //Indicates a successful login.
    return res.json({
        message: "Login successfully",
        error:false,
        success:true,
        data:{
            accessToken,
            refreshToken
           }
    })

    } catch (error) {
         return res.status(500).json({
            message : error.message||error,
            error : true, 
            success : false
           
        })
    }
}

//logout controller
export async function logoutController(req,res){
    try {
        const userId = req.userId//coming from middleware
        const cookiesOption = {
        httpOnly:true,
        secure : true,
        sameSite:"None"  
        }
        
       res.clearCookie("accessToken", cookiesOption) 
       res.clearCookie("refreshToken", cookiesOption) 

        await UserModel.findByIdAndUpdate(userId,{
            refresh_token : ""
        })

       return res.json({
            message : "logout suucessfully",
            error : true, 
            success : false
       })


    } catch (error) {
        return res.status(500).json({
            message : error.message||error,
            error : true, 
            success : false
           
        })
    }
}


// uploading image (Avatar of user ) controller
export async function uploadAvatarController(req, res) {
  try {
    const userId = req.userId//coming from auth.js middleware only login user
    const image = req.file;// coming from multer middleware



    if (!image) {
      return res.status(400).json({ message: "No file uploaded", success: false });
    }

    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: upload.url },
      { new: true } // returns updated document 
    );
    return res.status(200).json({
      message: "File uploaded successfully",
      data: {
        _id:userId,
         avatar : upload.url
      },
      success: true,
    });


  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true,
    });
  }
}
// updating user detail controller
export async function updateUserController(req,res) {
    try {
      const userId = req.userId //coming from auth.js middleware only login user
      const{name , email , mobile,password } = req.body
      let hashPassword = ""
      if(password){
        const salt = await bcryptjs.genSalt(10)
        hashPassword = await bcryptjs.hash(password , salt);
      }

      const updateUser = await UserModel.findByIdAndUpdate(userId,{
        ...(name && {name:name}),
        ...(email && {email:email}),
        ...(mobile && {mobile:mobile}),
        ...(password && {password:hashPassword})
      })

      return res.status(200).json({
        message: "user details updated successfully",
        success: true,
        error: false,
        data: updateUser
        
      })

    } catch (error) {
        return res.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true,
    }); 
    }
}


//forgot password controller
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    // 1. Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found with this email.",
        success: false,
        error: true,
      });
    }

    // 2. Generate OTP and expiry
    const otp = await generateOtp(); // should return a number or string, not a Promise!
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // 3. Update user's OTP fields
    await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime.toISOString(),
    });


    // 4. Send email via Resend
    await sendEmail({
      sendTo: email,
      subject: "Forgot Password - MernMart",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    // 5. Respond to frontend
    return res.status(200).json({
      message: "OTP sent to your email. Please check.",
      success: true,
      error: false,
    });

  } catch (error) {
   
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
}
//verify otp for password update
export async function verifyOtp(req,res) {
    
    try {
      const { email , otp} = req.body;
      //checking if user has enter otp & email or not 
      if(!email || !otp){
        return res.status(400).json({
        message: "Email and aotp is not provided.",
        success: false,
        error: true,
      })
      }

    // 1. Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found with this email.",
        success: false,
        error: true,
      });
    }
   // checking if otp is not expired
    const CurrentTime = new Date().toISOString;

    if(user.forgot_password_expiry < CurrentTime){
      return res.status(400).json({
        message: "OTP is expired",
        success: false,
        error: true,
      });
    }
      // checking otp is valid or not
    if(otp !== user.forgot_password_otp){
      return res.status(400).json({
        message: "OTP is not valid",
        success: false,
        error: true,
      });
    }

    // if otp is valid and otp is not expired then,
    return res.json({
      message:"Otp verified successfully",
      error:false,
      success:true
    })

    } catch (error) {
       return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
    }
}

// reset/update the password Controller
export async function resetPassword(req,res) {
  try {

    const {email , newPassword , confirmPassword} = req.body;
    // checking if any of field is null or not provided by the user
    if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
      message: "Provide required field",
      success: false,
      error: true,
    });
    }
    //checking if user exist in database
    const user = await UserModel.findOne({email})
    if(!user){
       return res.status(400).json({
      message: "Email is not available",
      success: false,
      error: true,
    });
    }
    //comparing both password are they same?
    if(newPassword !== confirmPassword ){
       return res.status(400).json({
      message: "Both password are not same",
      success: false,
      error: true,
    });
    }   
    
    //convert the normal pass to hashedpass 
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword , salt);

    //updating the password 
   await UserModel.findByIdAndUpdate(user._id,{
      password : hashPassword
    })

    return res.status(200).json({
      message:"password updated succesfully",
      success: true,
      error: false,
    })

  } catch (error) {
      return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
}
// refresh token controller
export async function refreshToken(req,res) {
  try {
    const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];
    if(!refreshToken){
      return res.status(401).json({
          message:"Invalid token",
          success: false,
          error: true,
      })
    }
    const VerifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
    if(!VerifyToken){
       return res.status(401).json({
          message:"token is expired",
          success: false,
          error: true,
      })
    }
  
    const userId = VerifyToken?._id;
    const newAccessToken = await generatedAccessToken(userId);

      const cookiesOption = {
        httpOnly:true, // Cannot be accessed via JS in the browser (prevents XSS)
        secure : true, // Only sent over HTTPS
        sameSite:"None"  // Allows cookies to be sent across domains (important for frontend-backend on different origins)
    }
    res.cookie("accessToken",newAccessToken,cookiesOption)
    return res.json({
      message:"new access token generated",
      success:true,
      error:false,
      data:{
        accessToken:newAccessToken
      }
    })
  } catch (error) {
     return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
}
