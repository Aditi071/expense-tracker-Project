import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const ITEMS_PER_LOAD = 5;

function RecentTransactions({ transactions = [] }) {
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  useEffect(() => {
    if (transactions.length > 0) {
      const sortedTransactions = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, ITEMS_PER_LOAD);
      setDisplayedTransactions(sortedTransactions);
    }
  }, [transactions]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <h3>Recent Transactions</h3>
          <div className="row mt-4">
            <div className="col-md-12">
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="card shadow-sm border-0 p-3 mb-4"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5>{transaction.title}</h5>
                        <p>{new Date(transaction.date).toLocaleDateString()}</p>
                        <small className="text-muted">{transaction.category}</small>
                      </div>
                      <div>
                        {transaction.type === "income" ? (
                          <FaArrowUp color="green" size={24} />
                        ) : (
                          <FaArrowDown color="red" size={24} />
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="text-muted">Amount</span>
                      <h4 className={transaction.type === "income" ? "text-success" : "text-danger"}>
                        ₹{transaction.amount}
                      </h4>
                    </div>
                  </div>
                ))
              ) : (
                <p>No transactions found.</p>
              )}

              {transactions.length > ITEMS_PER_LOAD && (
                <div className="text-center mt-4">
                  <Link to="/all-transactions" className="btn btn-primary">
                    View All Transactions
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="media/images/transaction3.png"
            alt="Transactions Illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;