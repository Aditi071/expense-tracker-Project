import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Corrupted user data. Clearing storage.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  });

  const isAuthenticated = !!user;

  const login = (userData, token) => {
    if (!userData || !token) {
      console.error("Invalid login data");
      return;
    }
  
    console.log("Logging in user:", userData); 
  
    localStorage.setItem("token", token);                  // Store the token
    localStorage.setItem("user", JSON.stringify(userData)); // Store the user data
    setUser(userData);                                      // Update user state
  };
  

  const logout = () => {
    console.log("Logging out user...");
    setUser(null); // Reset user state
    localStorage.removeItem("user"); // Clear user data
    localStorage.removeItem("token"); // Clear token

    console.log("User after logout:", localStorage.getItem("user"));
    console.log("Token after logout:", localStorage.getItem("token"));
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
  
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);  
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
