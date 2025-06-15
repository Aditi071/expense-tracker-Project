import { useState } from "react";

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const[token,setToken]=useState(localStorage.getItem("token")||null);
    const[isAuthenticated, setIsAuthenticated]=useState(!!token);
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data
    };    
    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // Remove token from storage
        localStorage.removeItem("user");
    };
    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
}