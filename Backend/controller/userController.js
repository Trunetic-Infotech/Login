import { compare, hash } from "bcrypt";
import UserModels from "../models/UserModels.js";
import JWT from "jsonwebtoken";

import xlsx from "xlsx";

export const SignController = async (req, res) => {
  try {
    const { emp_Id, userName, email, answer, password, Role } = req.body;

    //user required input checks
    if (!emp_Id) {
      return res.status(401).json({ message: "Employee Id is Required" });
    }
    if (!userName) {
      return res.status(401).json({ message: "User name is Required" });
    }
    if (!email) {
      return res.status(401).json({ message: "Email Id is Required" });
    }
    if (!answer) {
      return res.status(401).json({ message: "Answer is Required" });
    }
    if (!password) {
      return res.status(401).json({ message: "Password is Required" });
    }

    // checking if emp_Id already exists
    const existingEmpID = await UserModels.findOne({ emp_Id });
    if (existingEmpID) {
      return res.status(404).json({
        success: false,
        message: "User Already Exists. Please login",
      });
    }

    // Hashing the password
    const hashedPassword = await hash(password, 10);

    // Creating a new user
    const user = await new UserModels({
      emp_Id,
      userName,
      email,
      answer,
      password: hashedPassword,
      Role,
    }).save();

    // Send response after successfully creating the user
    return res.status(201).json({
      success: true,
      message: " created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    // Ensure only one response is sent
    return res.status(501).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { emp_Id, password } = req.body;
    //user required input for login
    if (!emp_Id) {
      res.status(401).json({ message: "Student Id is Required" });
    }

    if (!password) {
      res.status(401).json({ message: "Password is Required" });
    }

    //checking student existing or not
    const user = await UserModels.findOne({ emp_Id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    // checking user given Passowrd
    const Match = await compare(password, user.password);
    if (!Match) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }

    user.lastlogin = new Date();
    await user.save();
    // genrate Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(201).json({
      success: true,
      message: `welcome backend ${user.userName}`,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "error in loggin",
      error,
    });
  }
};

export const forgetController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "new passwoed is required" });
    }
    // check
    const user = await UserModels.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong Email id or Answer",
      });
    }
    const hashed = await hash(newPassword, 10);
    await UserModels.findByIdAndUpdate(user._id, { Password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something is wrong",
      error,
    });
  }
};

//get  Single  user Deatils

export const GetDetailController = async (req, res) => {
  try {
    const { id } = req.body;

    //checking student existing or not
    const user = await UserModels.findOne({ id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "employee not found",
      });
    }

    res.status(201).json({
      success: true,
      message: `welcome backend ${user.userName}`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "error in loggin",
      error,
    });
  }
};

//get user Deatils

export const GetAllDetailController = async (req, res) => {
  try {
    //checking student existing or not
    const user = await UserModels.find();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "employee not found",
      });
    }

    res.status(201).json({
      success: true,
      message: `welcome backend`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "error in loggin",
      error,
    });
  }
};

export const logoutHandler = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the authenticated user info

    // Fetch the user from the database
    const user = await UserModels.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the lastLogout time
    user.lastLogout = new Date(); // Set the current date and time as last logout time

    // Save the updated user data
    await user.save();

    // Send a response indicating successful logout
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res
      .status(500)
      .json({ success: false, message: "Error while logging out" });
  }
};

//download sheed
export const DownloadSheetController = async (req, res) => {
  try {
    const users = await UserModels.find({});

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found to download.",
      });
    }
    const usersData = users.map((user) => ({
      userName: user.userName,
      emp_Id: user.emp_Id,
      email: user.email,
      lastlogin: user.lastlogin,
      createdAt: user.createdAt,
      lastLogout: user.lastLogout,
    }));

    // Convert the JSON data to a worksheet
    const ws = xlsx.utils.json_to_sheet(usersData);

    // Create a new workbook and append the worksheet
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Users");

    // Generate Excel file in memory and send as a response
    const excelFile = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers to trigger file download in the browser
    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the file
    res.send(excelFile);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error generating or downloading the Excel file",
      error,
    });
  }
};
