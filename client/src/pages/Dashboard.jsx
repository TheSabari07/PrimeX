import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-blue-50">
      <h1 className="text-3xl font-bold mb-4">Welcome, User 👋</h1>

      <div className="bg-white shadow rounded p-4 w-full max-w-sm text-center">
        <p><strong>User ID:</strong> {user?.userId}</p>
        <p><strong>Expires At:</strong> {new Date(user?.exp * 1000).toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-2">(decoded from your token)</p>
      </div>

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
