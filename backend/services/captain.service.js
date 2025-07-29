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
