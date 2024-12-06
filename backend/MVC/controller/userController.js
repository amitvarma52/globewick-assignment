/** @format */

import { comparePassword, hashPassword } from "../../helper/hidePassword.js";
import { userModel } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const USER_SECRET = process.env.USER_SECRET;

export const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      password,
      dateOfBirth,
      gender,
    } = req.body;

    // Hash 
    const hashedPassword = await hashPassword(password);

    // Check if exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number already exists",
      });
    }

    // Create  new user
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check existing
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify 
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    //  token
    const token = jwt.sign({ id: user._id, role: "user" }, USER_SECRET, {
      expiresIn: "5h",
    });
    
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
