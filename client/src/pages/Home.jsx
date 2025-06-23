import React from "react";
import HomeImage from "../images/Home.jpg"; 

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: `url(${HomeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/80 rounded-xl shadow-lg p-8 text-center backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to PrimeX</h1>
        <p className="text-gray-600 mt-3">Stay organized and productive every day!</p>

        <div className="mt-6 flex space-x-4 justify-center">
          <a
            href="/login"
            className="bg-blue-600 text-white rounded-full px-6 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-gray-200 text-gray-800 rounded-full px-6 py-2 font-semibold hover:bg-gray-300 transition"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
