import { Captain } from "../models/captain.model.js";

export const captainRegisterService = async ({
  firstname,
  lastname = "",
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const existingCaptain = await Captain.findOne({ email });
  if (existingCaptain) {
    throw new Error("Captain already exists");
  }

  const captain = await Captain.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};

export const captainLoginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and Password is Required!!");
  }

  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain) {
    throw new Error("Invalid Email and Password");
  }

  const isPassowrdValid = await captain.isPasswordCorrect(password);
  if (!isPassowrdValid) {
    throw new Error("Invalid Password! Try again...");
  }

  return captain;
};
