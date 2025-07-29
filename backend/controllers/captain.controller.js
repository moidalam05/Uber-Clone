import { validationResult } from "express-validator";
import {
  captainLoginService,
  captainRegisterService,
} from "../services/captain.service.js";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { fullname, email, password, vehicle } = req.body;

  try {
    const captain = await captainRegisterService({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();

    return res.status(201).json({
      success: true,
      captain,
      token,
      message: "Captain Registred Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const captain = await captainLoginService(req.body);
    const token = await captain.generateAuthToken();

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res.status(200).cookie("authToken", token, options).json({
      success: true,
      captain,
      token,
      message: "Captain Logged in Successfully",
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
    const captain = req.captain;
    return res.status(200).json({
      success: true,
      captain,
      message: "Captain Profile Fetched Successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const logoutCaptain = (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    };
    return res.clearCookie("authToken", options).status(200).json({
      success: true,
      message: "Captain Logged out Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
