import config from "./config";

import React, { useState } from "react";
import { useAuth } from "../AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // To handle error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Form Data:", formData);

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        if (data.token && data.user) {
          // ✅ Store user and token in AuthContext
          login(data.user, data.token);
          localStorage.setItem("token", data.token);
          document.cookie = `token=${data.token}; path=/`;

          // 🔥 Fetch the budget immediately after login
          await fetchBudget(data.token);

          navigate("/dashboard");
        } else {
          console.error("🚨 Missing token or user data!", data);
          setError("Login failed: Invalid credentials.");
        }
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  const fetchBudget = async (token) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${config.apiBaseUrl}/budget`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token correctly
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const budgetData = await response.json();
        console.log("Fetched Budget:", budgetData);

        // ✅ Store or display the budget data
        localStorage.setItem("budget", JSON.stringify(budgetData)); // Optional: Store in localStorage
      } else {
        console.error("Failed to fetch budget");
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  return (
    <div className="container vh-90 d-flex justify-content-center align-items-center">
      <div className="row" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="col-md-10 m-5 bg-light p-5 rounded-end shadow">
          <h2 className="mb-3">Welcome Back!</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-lable">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="form-control mt-2 mb-3"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="form-control mb-3"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <small>
              Don't have an account?{" "}
              <a href="/signup" className="text-primary">
                Sign up
              </a>
            </small>
          </div>
        </div>
      </div>

      <div className="row" style={{ maxWidth: "900px", width: "100%" }}>
        <img
          src="media/images/login2.png"
          alt="Login Illustration"
          className="img-fluid rounded-start"
          style={{ height: "100%", objectFit: "cover" }}
        ></img>
      </div>
    </div>
  );
};

export default Login;
