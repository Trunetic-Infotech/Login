import mongoose from "mongoose";

export const ConntectDB =async()=>{
      try {
            // Connections to MONGODB 
            const connectionString = process.env.MONGODB_URI || "your-default-mongo-uri"; // Add your URI in .env
            await mongoose.connect(connectionString);
            console.log("Mongo DataBase Connect Successfully");
            
      } catch (error) {
            console.log(error);
            
      }
}