import config from "./config";
import React, { useEffect, useState } from "react";
import { FaUser, FaMoneyBillWave, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ name: "", email: "" });

  const calculateTotalsByPeriod = (period = "month") => {
    const now = new Date();
    let periodStart;

    if (period === "day") {
      periodStart = new Date(now.setHours(0, 0, 0, 0));
    } else if (period === "week") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      periodStart = new Date(now.setDate(diff));
      periodStart.setHours(0, 0, 0, 0);
    } else {
      // month
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const filteredTransactions = transactions.filter(
      (t) => new Date(t.date) >= periodStart
    );

    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    const expenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    return { income, expenses, savings: income - expenses };
  };

  const {
    income: monthlyIncome,
    expenses: monthlyExpenses,
    savings: monthlySavings,
  } = calculateTotalsByPeriod("month");

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProfile({
      name: profile.name,
      email: profile.email,
    });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${config.apiBaseUrl}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        await fetchProfile();
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to save profile changes");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTransactions();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        setError("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("An error occurred");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  const avatarUrl = `https://robohash.org/${profile.email}.png?size=150x150`;

  return (
    <div className="container vh-90 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 rounded">
            {/* Profile Picture and Name */}
            <div className="text-center">
              <img
                src={avatarUrl}
                alt="Profile Avatar"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px" }}
              />
              <h3>{profile.name}</h3>
              <p className="text-muted">{profile.email}</p>
            </div>

            {/* Stats Section */}
            <div className="row text-center mt-4">
              <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                  <FaMoneyBillWave className="text-success mb-2" size={30} />
                  <h5>Monthly Income</h5>
                  <p>₹{monthlyIncome}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                  <FaMoneyBillWave className="text-danger mb-2" size={30} />
                  <h5>Monthly Expenses</h5>
                  <p>₹{monthlyExpenses}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                  <FaUser className="text-primary mb-2" size={30} />
                  <h5>Monthly Savings</h5>
                  <p>₹{monthlySavings}</p>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="text-center mt-4">
              {isEditing ? (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedProfile.name}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editedProfile.email}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <button className="btn btn-primary" onClick={handleEditClick}>
                    <FaEdit className="me-2" /> Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
