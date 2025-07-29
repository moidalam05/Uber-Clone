import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minLength: [3, "First name must be at least 3 characters long"],
        trim: true,
      },
      lastname: {
        type: String,
        minLength: [3, "Last name must be at least 3 characters long"],
        trim: true,
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters long"],
      select: false,
    },

    socketId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    vehicle: {
      color: {
        type: String,
        required: true,
        minLength: [3, "Color must be atleast 3 characters long"],
        trim: true,
      },

      plate: {
        type: String,
        required: true,
        trim: true,
      },
      capacity: {
        type: Number,
        required: true,
        default: 1,
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "auto", "motorcycle"],
      },
    },

    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("Password hashing failed", error);
    next(error);
  }
});

captainSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.methods.generateAuthToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

export const Captain = mongoose.model("Captain", captainSchema);
