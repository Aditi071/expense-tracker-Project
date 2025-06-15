import React, { useState } from "react";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Expense({ addTransaction }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incomeCategories = ["Salary", "Freelance", "Investment", "Other"];
  const expenseCategories = ["Food", "Rent", "Transport", "Shopping", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount.trim() || !category.trim() || !title.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Amount must be a positive number!");
      return;
    }

    const transactionType = expenseCategories.includes(category) ? "expense" : "income";

    const newTransaction = {
      title,
      amount: parseFloat(amount),
      type: transactionType,
      category: category==='Other' ? otherCategory:category,
      date: new Date().toISOString(),
      userId: "65a1b2c3d4e5f67890abcdef",
    };

    console.log("Adding new transaction:", newTransaction);
    setIsSubmitting(true);
    
    await addTransaction(newTransaction);

    toast.success("Transaction added successfully!");
    
    setTimeout(() => {
      setAmount("");
      setCategory("");
      setOtherCategory("");
      setTitle("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-8 d-flex justify-content-center">
          <div className="card shadow-lg p-4 rounded w-100" style={{ backgroundColor: "#f8f9fa" }}>
            <h2 className="mb-3 text-center text-primary">Add Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label fw-bold">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label fw-bold">Category</label>
                <select
                  className="form-select"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <optgroup label="Income">
                    {incomeCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Expense">
                    {expenseCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </optgroup>
                </select>
                {category==="Other" &&(
                  <input
                  type='text'
                  className="form-control mt-2"
                  placeholder="Specific Category"
                  value={otherCategory}
                  onChange={(e)=> setOtherCategory(e.target.value)}
                  required
                  />
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-bold">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Transaction"}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center">
          <img
            src="media/images/transaction4.webp"
            alt="Finance Illustration"
            style={{ maxWidth: "100%", objectFit: "cover" }} 
          />
        </div>
      </div>
    </div>
  );
}
export default Expense;