import config from "./config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/login"); // Redirect to login page
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="container vh-90 d-flex justify-content-center align-items-center">
      <div className="row" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="col-md-10 m-5 bg-light p-5 rounded-end shadow">
          <h2 className="mb-3">Create an Account</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="form-control mt-2 mb-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-control mt-2 mb-3"
                value={formData.email}
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
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-control mt-2 mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <a href="/login" className="text-primary">
                Login
              </a>
            </small>
          </div>
        </div>
      </div>

      <div className="row" style={{ maxWidth: "900px", width: "100%" }}>
        <img
          src="media/images/signup2.avif" // Add a signup image for consistency
          alt="Signup Illustration"
          className="img-fluid rounded-start"
          style={{ height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Signup;
