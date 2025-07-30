import React, { useState } from "react";
import uberLogo from "../assets/Uber-logo-B.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";

const UserLogin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(userData);
    setUserData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="p-8 h-screen flex flex-col justify-between bg-gradient-to-tr from-[#f0f4ff] via-[#f8faff] to-white">
      <div>
        <img className="w-16 mb-10" src={uberLogo} alt="logo" />
        <form onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="email" className="flex text-lg font-medium mb-2">
            What's your email
          </label>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-lg placeholder:text-base mb-8"
            type="email"
            required
            id="email"
            name="email"
            placeholder="email@example.com"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="flex text-lg font-medium mb-2">
            What's your password
          </label>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-lg placeholder:text-base mb-8"
            type="password"
            required
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
          />
          <button className="bg-[#111] relative flex items-center justify-center text-white font-semibold rounded-md px-4 py-2 w-full text-lg mb-3">
            Login{" "}
            <i className="absolute font-bold right-5">
              <FaArrowRight />
            </i>
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              click here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-emerald-500 text-white font-medium rounded-md px-4 py-2 w-full text-lg mb-8 relative flex items-center justify-center"
        >
          Sign in as Captain{" "}
          <i className="absolute font-bold right-5">
            <FaCarSide />
          </i>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
