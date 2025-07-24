import { Router } from "express";
import {
  registerUserController,
  verifyEmailController,
  loginController,
  logoutController,
  uploadAvatarController,
  updateUserController, // ✅ this must match exactly
  forgotPasswordController,
  verifyOtp,
  resetPassword
} from "../Controllers/user.controller.js";


import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post('/register', registerUserController)
userRouter.post('/verify-email' , verifyEmailController);
userRouter.post('/login' , loginController)
userRouter.get('/logout' , auth , logoutController)
userRouter.put('/upload-avatar',auth,upload.single("avatar"),uploadAvatarController)
userRouter.put('/update-user',auth, updateUserController)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-otp',verifyOtp)
userRouter.put('/reset-password' , resetPassword)
export default userRouter
