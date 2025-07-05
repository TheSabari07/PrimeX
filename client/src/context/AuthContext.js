import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error("Invalid token", err);
      return null; 
    }
  };

  const isTokenExpired = (decoded) => {
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && !isTokenExpired(decoded)) {
        setUser({ token, ...decoded });
      } else {
        localStorage.removeItem("token");
      }
    }
    setLoading(false); 
  }, []);

  const login = (token) => {
    const decoded = decodeToken(token);
    if (decoded && !isTokenExpired(decoded)) {
      localStorage.setItem("token", token);
      setUser({ token, ...decoded });
    } else {
      console.error("Cannot login with expired or invalid token");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
