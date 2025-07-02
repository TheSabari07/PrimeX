import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email,    setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError] = useState("");
  const [success,  setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");
    try {
      const response = await fetch("http://localhost:5002/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Registration successful! You can now login.");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
        <FaUserPlus className="text-4xl text-blue-600 mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800 mt-3">Create an Account</h2>
        <p className="text-gray-600 mt-1">Get started and stay productive with PrimeX!</p>

        <form className="flex flex-col mt-6 space-y-4" onSubmit={handleRegister}>
          
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            required
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            required
          />
          
          <button className="bg-blue-600 text-white p-3 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105">
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-600 mt-3">{error}</p>}
        {success && <p className="text-green-600 mt-3">{success}</p>}

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
