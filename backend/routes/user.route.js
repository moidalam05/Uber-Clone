import express from "express";
import { body } from "express-validator";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

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
  ],
  registerUser
);

Router.route("/login").post(
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 be at least 6 characters long"),
  ],
  loginUser
);

Router.route("/profile").get(authenticateUser, getProfile);
Router.route("/logout").post(authenticateUser, logoutUser);

export default Router;
