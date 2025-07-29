import { User } from "../models/user.model.js";

export const registerUserService = async ({
  firstname,
  lastname = "",
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required!");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const user = await User.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};

export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and Password is Required!!");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid Email and Password");
  }

  const isPassowrdValid = await user.isPasswordCorrect(password);
  if (!isPassowrdValid) {
    throw new Error("Invalid Password! Try again...");
  }

  return user;
};
