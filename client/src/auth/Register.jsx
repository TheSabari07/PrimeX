import React from "react";
import { FaUserPlus } from "react-icons/fa"; 

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
        <FaUserPlus className="text-4xl text-blue-600 mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800 mt-3">Create an Account</h2>
        <p className="text-gray-600 mt-1">Get started and stay productive with PrimeX!</p>

        <form className="flex flex-col mt-6 space-y-4">
          
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
          
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
          
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
          
          <button className="bg-blue-600 text-white p-3 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105">
            Sign Up
          </button>
        </form>
        
        <div className="mt-4">
          <p className="text-gray-600">Already have an account? 
            <a href="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

