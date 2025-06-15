import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container border-top mt-5 text-center">
        <div className="row mt-5">
          {/* Brand & Social Media */}
          <div className="col-md-3">
            <img
              src="/media/images/logo.png"
              className="w-50 mb-2"
              alt="Expense Tracker Logo"
            />
            <p>&copy; {new Date().getFullYear()} Expense Tracker</p>
            <p className="text-muted">
              Manage your expenses smartly and stay financially aware.
            </p>

            {/* Social Media Icons */}
            <div className="d-flex justify-content-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} color="#1877F2" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} color="#1DA1F2" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} color="#E4405F" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} color="#0077B5" />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="col-md-3">
            <p className="fw-bold">Explore</p>
            <a href="/dashboard" className="d-block text-decoration-none text-dark">Dashboard</a>
            <a href="/reports" className="d-block text-decoration-none text-dark">Reports</a>
            <a href="/categories" className="d-block text-decoration-none text-dark">Categories</a>
            <a href="/goals" className="d-block text-decoration-none text-dark">Budget & Goals</a>
          </div>

          {/* Support Section */}
          <div className="col-md-3">
            <p className="fw-bold">Support</p>
            <a href="/help" className="d-block text-decoration-none text-dark">Help Center</a>
            <a href="/contact" className="d-block text-decoration-none text-dark">Contact Us</a>
            <a href="/terms" className="d-block text-decoration-none text-dark">Terms & Conditions</a>
            <a href="/privacy" className="d-block text-decoration-none text-dark">Privacy Policy</a>
          </div>

          {/* Account Section */}
          <div className="col-md-3">
            <p className="fw-bold">Account</p>
            <a href="/signup" className="d-block text-decoration-none text-dark">Create Account</a>
            <a href="/login" className="d-block text-decoration-none text-dark">Sign In</a>
            <a href="/settings" className="d-block text-decoration-none text-dark">Account Settings</a>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-4 text-muted" style={{ fontSize: "14px" }}>
          <p>"Track every penny, stay financially free!"</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
