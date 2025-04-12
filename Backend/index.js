import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'
import cookieParser from "cookie-parser";
import {ConntectDB} from './db/ConnectionDB.js'
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

//cores Policy
app.use(cors({
origin:"http://localhost:5173",
methods:["GET","POST","PUT","DELETE"],
credentials:true
}))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure 'extended' is set to true
app.use(cookieParser());
app.use(morgan('dev'));

// API Routes
app.use("/api/v1/user", userRoutes);

// Rest API
app.get("/user",()=>{
      console.log('<h1>Hlo Dev</h1>');
      
})

//Server 
app.listen(PORT, () => {
      ConntectDB(); // Make sure the DB connection function is correct
  console.log(`Server is running on PORT ${PORT}`);
});
