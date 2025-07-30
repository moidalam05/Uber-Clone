import uberLogo from "../assets/Uber-logo.png";
import bgImage from "../assets/bg.jpg";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center h-screen w-full pt-8 flex justify-between flex-col bg-red-400"
      >
        <img className="w-16 ml-8" src={uberLogo} alt="logo" />
        <div className="bg-white py-4 px-4 pb-8">
          <h2 className="text-3xl font-bold">Get started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center font-semibold justify-center relative w-full bg-black text-white py-3 rounded-md mt-6"
          >
            Continue{" "}
            <i className="absolute font-bold right-5">
              <FaArrowRight />
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
