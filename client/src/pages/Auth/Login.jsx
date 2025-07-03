import React, { useState, useContext } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email,    setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError] = useState("");
  const [success,  setSuccess] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        login(data.token);
        setSuccess("Login successful! Redirecting...");
        setTimeout( () => {navigate("/dashboard")},1000);

      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("Server error. Try again later.");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
        <FaSignInAlt className="text-4xl text-blue-600 mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800 mt-3">Welcome Back</h2>
        <p className="text-gray-600 mt-1">Sign in to continue with PrimeX!</p>

        <form className="flex flex-col mt-6 space-y-4" onSubmit={handleLogin}>
          
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
            Sign In
          </button>
        </form>
        {error && <p className="text-red-600 mt-3">{error}</p>}
        {success && <p className="text-green-600 mt-3">{success}</p>}

        <div className="mt-4">
          <p className="text-gray-600">
            Don’t have an account?
            <a href="/register" className="text-blue-600 font-semibold hover:underline ml-1">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
 