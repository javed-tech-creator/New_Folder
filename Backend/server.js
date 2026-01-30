import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv'
import { createServer } from "http";
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL
const app = express()
import morgan from "morgan";

app.use(morgan("dev"))
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser())
const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "public")));
app.get('/',(req,res)=>{res.json("Server is running")})

// employee routes
import employeeRoutes from './src/routes/employee.routes.js'
app.use('/employees', employeeRoutes)

//admin routes
import adminRoutes from './src/routes/admin.routes.js'
import path from "path";
app.use('/admin',adminRoutes)

mongoose.connect(MONGODB_URL).then(()=>console.log("DB Connected")).catch(()=>console.log("DB is not conneted"))
const server = createServer(app)
server.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`)})
