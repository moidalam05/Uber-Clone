import { useState, useContext } from "react";
import uberLogo from "../assets/Uber-logo-B.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [captainData, setCaptainData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  const { setCaptain } = useContext(CaptainDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstname" || name === "lastname") {
      setCaptainData((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name]: value,
        },
      }));
    } else if (
      name === "color" ||
      name === "plate" ||
      name === "capacity" ||
      name === "vehicleType"
    ) {
      setCaptainData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setCaptainData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        navigate("/captain-login");
      }
    } catch (error) {
      console.log(error);
    }

    setCaptainData({
      fullname: {
        firstname: "",
        lastname: "",
      },
      email: "",
      password: "",
      vehicle: {
        color: "",
        plate: "",
        capacity: "",
        vehicleType: "",
      },
    });
  };
  return (
    <div className="p-8 h-screen flex flex-col justify-between bg-gradient-to-tr from-[#f0f4ff] via-[#f8faff] to-white">
      <div>
        <Link className="flex w-16 mb-5" to="/">
          <img src={uberLogo} alt="logo" />
        </Link>
        <form onSubmit={(e) => submitHandler(e)}>
          <label className="flex text-base font-medium mb-2">
            What's our captain's name
          </label>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm"
              type="text"
              required
              id="firstname"
              name="firstname"
              placeholder="First name"
              autoComplete="given-name"
              value={captainData.fullname.firstname}
              onChange={handleChange}
            />
            <input
              className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm"
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last name"
              autoComplete="given-name"
              value={captainData.fullname.lastname}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="email" className="flex text-base font-medium mb-2">
            What's our captain's email
          </label>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm mb-5"
            type="email"
            required
            id="email"
            name="email"
            placeholder="email@example.com"
            autoComplete="email"
            value={captainData.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="flex text-base font-medium mb-2">
            What's our captain's password
          </label>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm mb-5"
            type="password"
            required
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            value={captainData.password}
            onChange={handleChange}
          />
          <label className="flex text-base font-medium mb-2">
            Vehicle Details
          </label>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <input
              className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm"
              type="text"
              required
              id="color"
              name="color"
              placeholder="Vehicle color"
              autoComplete="off"
              value={captainData.vehicle.color}
              onChange={handleChange}
            />
            <input
              className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm"
              type="text"
              id="plate"
              name="plate"
              placeholder="Vehicle plate"
              autoComplete="off"
              value={captainData.vehicle.plate}
              onChange={handleChange}
            />
            <input
              className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm"
              type="number"
              id="capacity"
              name="capacity"
              placeholder="Vehicle capacity"
              autoComplete="off"
              value={captainData.vehicle.capacity}
              onChange={handleChange}
            />
            <select
              className="bg-[#f5f6fa] border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base"
              name="vehicleType"
              id="vehicleType"
              value={captainData.vehicle.vehicleType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <button className="bg-[#111] relative flex items-center justify-center text-white font-semibold rounded-md px-4 py-2 w-full text-lg mb-2">
            Create Captain Account{" "}
            <i className="absolute font-bold right-5">
              <FaArrowRight />
            </i>
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              click here
            </Link>
          </p>
        </form>
      </div>

      <p className="text-xs leading-tight text-center">
        This site is protected by reCAPTCHA and Google{" "}
        <span className="text-blue-600 underline cursor-pointer">
          Privacy Policy
        </span>{" "}
        and{" "}
        <span className="text-blue-600 underline cursor-pointer">
          Terms of Service
        </span>{" "}
        apply.
      </p>
    </div>
  );
};

export default CaptainSignup;
