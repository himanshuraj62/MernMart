import { json } from "express";
import UserModel from "../Models/user.model.js";
import bcryptjs from "bcryptjs"
import sendEmail from "../config/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
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