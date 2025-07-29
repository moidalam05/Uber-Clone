import {
  loginUserService,
  registerUserService,
} from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { fullname, email, password } = req.body;

  try {
    const user = await registerUserService({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({
      success: true,
      user,
      token,
      message: "User Registred Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const user = await loginUserService(req.body);
    const token = await user.generateAuthToken();

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.status(200).cookie("authToken", token, options).json({
      success: true,
      user,
      token,
      message: "User Logged in Successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user,
      message: "User Profile Fetched Successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const logoutUser = (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    };
    return res.clearCookie("authToken", options).status(200).json({
      success: true,
      message: "User Logged out Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
