import React, { useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate=useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    console.log("Auth status changed:", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('budget');
    localStorage.removeItem('timeLimit');
    localStorage.removeItem('transactions');
    localStorage.removeItem('token');

    logout();
    navigate("/login");
  }, [logout,navigate]);

  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top" style={{ backgroundColor: "#FFF" }}>
      <div className="container p-2">
        <Link className="navbar-brand" to={"/"}>
          <img src="media/images/finalLogo.png" style={{ width: "39%" }} alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} 
                style={{ fontSize: "1.22rem", whiteSpace: "nowrap" }} to={"/"}>
                Home
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} 
                    style={{ fontSize: "1.22rem", whiteSpace: "nowrap" }} to={"/dashboard"}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/all-transactions" ? "active" : ""}`} 
                    style={{ fontSize: "1.22rem", whiteSpace: "nowrap" }} to={"/all-transactions"}>
                    Transaction History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/budget-page" ? "active" : ""}`} 
                    style={{ fontSize: "1.22rem", whiteSpace: "nowrap" }} to={"/budget-page"}>
                    Budget
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} 
                    style={{ fontSize: "1.22rem", whiteSpace: "nowrap" }} to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ fontSize: "1.22rem", whiteSpace: "nowrap" }} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{ fontSize: "1.22rem", whiteSpace: "nowrap" }} to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
