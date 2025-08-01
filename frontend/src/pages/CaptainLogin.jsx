import { useState, useContext } from "react";
import uberLogo from "../assets/Uber-logo-B.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [captainData, setCaptainData] = useState({
    email: "",
    password: "",
  });

  const { setCaptain } = useContext(CaptainDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaptainData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captainData
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("authToken", JSON.stringify(data.token));
        navigate("/captain-dashboard");
      }
    } catch (error) {
      console.log(error);
    }

    setCaptainData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="p-8 h-screen flex flex-col justify-between bg-gradient-to-tr from-[#f0f4ff] via-[#f8faff] to-white">
      <div>
        <Link className="flex w-16 mb-10" to="/">
          <img src={uberLogo} alt="logo" />
        </Link>
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
            value={captainData.email}
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
            value={captainData.password}
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
            <Link to="/captain-signup" className="text-blue-600">
              click here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-amber-400 text-white font-medium rounded-md px-4 py-2 w-full text-lg mb-8 relative flex items-center justify-center"
        >
          Sign in as User{" "}
          <i className="absolute font-bold right-5">
            <FaUserTie />
          </i>
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
