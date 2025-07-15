import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const newError = new Error("User already exists");
      newError.statusCode = 400;
      throw newError;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    console.log(salt, "SALT");
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};
