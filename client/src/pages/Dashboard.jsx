import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-blue-50">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">You're logged in with token:</p>
      <code className="bg-white p-2 rounded shadow">{user?.token.slice(0, 30)}...</code>
      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
