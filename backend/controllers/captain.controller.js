import { validationResult } from "express-validator";
import { captainRegisterService } from "../services/captain.service.js";

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
