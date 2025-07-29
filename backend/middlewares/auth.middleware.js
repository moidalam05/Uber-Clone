import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const token =
    req.cookies.authToken || req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized... try again");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new Error("Unauthorized! Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const authenticateCaptain = async (req, res, next) => {
  const token =
    req.cookies.authToken || req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized... try again");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decodedToken._id);
    if (!captain) {
      throw new Error("Unauthorized! Invalid token");
    }

    req.captain = captain;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
