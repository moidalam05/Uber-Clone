import React from "react";
import uberLogo from "../assets/Uber-logo-B.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";

const UserLogin = () => {
  return (
    <div className="p-8 h-screen flex flex-col justify-between bg-gradient-to-tr from-[#f0f4ff] via-[#f8faff] to-white">
      <div>
        <img className="w-16 mb-10" src={uberLogo} alt="logo" />
        <form>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-lg placeholder:text-base mb-8"
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-lg placeholder:text-base mb-8"
            type="password"
            required
            placeholder="password"
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
        <button className="bg-emerald-500 text-white font-medium rounded-md px-4 py-2 w-full text-lg mb-8 relative flex items-center justify-center">
          Sign in as Captain{" "}
          <i className="absolute font-bold right-5">
            <FaCarSide />
          </i>
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
