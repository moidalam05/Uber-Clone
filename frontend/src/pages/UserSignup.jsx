import React from "react";
import uberLogo from "../assets/Uber-logo-B.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const UserSignup = () => {
  return (
    <div className="p-8 h-screen flex flex-col justify-between bg-gradient-to-tr from-[#f0f4ff] via-[#f8faff] to-white">
      <div>
        <img className="w-16 mb-10" src={uberLogo} alt="logo" />
        <form>
          <label className="flex text-base font-medium mb-2">
            What's your name
          </label>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm"
              type="text"
              required
              id="firstname"
              name="firstname"
              placeholder="First name"
              autoComplete="given-name"
            />
            <input
              className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm"
              type="text"
              required
              id="lastname"
              name="lastname"
              placeholder="Last name"
              autoComplete="given-name"
            />
          </div>
          <label htmlFor="email" className="flex text-base font-medium mb-2">
            What's your email
          </label>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm mb-6"
            type="email"
            required
            id="email"
            name="email"
            placeholder="email@example.com"
            autoComplete="email"
          />
          <label htmlFor="password" className="flex text-base font-medium mb-2">
            What's your password
          </label>
          <input
            className="bg-[#f5f6fa] border border-gray-200 focus:outline-none focus:ring focus:ring-blue-100 rounded-md px-4 py-2 w-full text-base placeholder:text-sm mb-6"
            type="password"
            required
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
          />
          <button className="bg-[#111] relative flex items-center justify-center text-white font-semibold rounded-md px-4 py-2 w-full text-lg mb-3">
            Signup{" "}
            <i className="absolute font-bold right-5">
              <FaArrowRight />
            </i>
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              click here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs leading-tight text-center">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
