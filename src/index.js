import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./landingPage/Home/HomePage";
import Dashboard from "./landingPage/Dashboard/DashboardPage";
import AllTransactions from "./landingPage/AllTransactions/AllTransactions";
import BudgetPage from "./landingPage/budgetPage/BudgetPage";
import Signup from "./landingPage/signup";
import Login from "./landingPage/login";
import Navbar from "./landingPage/Navbar";
import Footer from "./landingPage/Footer";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./landingPage/ProfilePage"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-transactions"
          element={
            <ProtectedRoute>
              <AllTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget-page"
          element={
            <ProtectedRoute>
              <BudgetPage />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage/>}/>
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);