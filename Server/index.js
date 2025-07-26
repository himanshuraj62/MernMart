import express from 'express'
import cors from 'cors'
import dotenv  from 'dotenv'
import cookieParser  from 'cookie-parser'
import morgan  from 'morgan'
import helmet  from 'helmet'
dotenv.config()
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'

const app = express ();
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy:false
}))


const PORT = 8080 || process.env.PORT
app.get("/" , (req ,res)=>{
    res.json({
        message:"Server is running " + PORT
    })
})

app.use("/api/user" , userRouter)

connectDB().then(()=>{
    app.listen(PORT , ()=>{
    console.log("Server is running on "+ PORT)
})
});

