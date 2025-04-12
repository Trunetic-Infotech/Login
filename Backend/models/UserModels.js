import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    emp_Id: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastlogin: {
      type: Date,
      timestamps: true,
      default: null,
    },
    lastLogout: { 
      type: Date, 
      default: null 
    },
    Role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserModels = mongoose.model("user", UserSchema);
export default UserModels;
