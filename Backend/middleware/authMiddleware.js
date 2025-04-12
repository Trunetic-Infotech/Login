import JWT from "jsonwebtoken";
import UserModels from "../models/UserModels.js";

export const isRequired = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(501).send({
      suecess: false,
      message: "Error in Middleware",
    });
  }
};

export const isAdmin = async (req, res, next) => {
      try {
        // Find the user by their ID from the user model
        const user = await UserModels.findById(req.user._id);
        
        // Check if the user role is not Admin (assuming Role 1 is for admin)
        if (user.Role !== 1) {
          return res.status(403).json({
            success: false,
            message: "Access denied. You are not an admin.",
          });
        }
        
        // If the user is an admin, continue to the next middleware/route
        next();
      } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({
          success: false,
          message: "Error in Middleware, something went wrong.",
        });
      }
    };
    
