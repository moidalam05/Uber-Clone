import express from "express";
import { body } from "express-validator";
import {
  getProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from "../controllers/captain.controller.js";
import { authenticateCaptain } from "../middlewares/auth.middleware.js";

const Router = express.Router();

Router.route("/register").post(
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 charaters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be atleast 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be atleast 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be 1 atleast"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid type"),
  ],
  registerCaptain
);

Router.route("/login").post(
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 be at least 6 characters long"),
  ],
  loginCaptain
);

Router.route("/profile").get(authenticateCaptain, getProfile);
Router.route("/logout").post(authenticateCaptain, logoutCaptain);

export default Router;
