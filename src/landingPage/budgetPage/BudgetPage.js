// // import React, { useState, useEffect } from "react";
// // import BudgetForm from "./BudgetForm";
// // import BudgetOverview from "./BudgetOverview";

// // function BudgetPage() {
// //   const [transactions, setTransactions] = useState([]);
// //   const [budget, setBudget] = useState(localStorage.getItem("budget") || "");
// //   const [timeLimit, setTimeLimit] = useState(localStorage.getItem("timeLimit") || "monthly");
// //   const [expenses, setExpenses] = useState([]);
// //   const [isBudgetSet, setIsBudgetSet] = useState(!!localStorage.getItem("budget"));
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const isLoggedIn = !!localStorage.getItem("token");

// //   // ✅ Define the reusable fetchTransactions function here
// //   const fetchTransactions = async () => {
// //     setIsLoading(true);
// //     setError(null);

// //     const token = localStorage.getItem("token");
// //     if (!token) return;

// //     try {
// //       const response = await fetch("http://localhost:3010/api/transactions", {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setTransactions(data);
// //         setExpenses(data.filter((t) => t.type === "expense"));
// //         localStorage.setItem("transactions", JSON.stringify(data));
// //       }
// //     } catch (error) {
// //       console.error("Error fetching transactions:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // ✅ Refetch transactions in handleEditBudget
// //   const handleEditBudget = () => {
// //     setIsBudgetSet(false);
// //     setBudget("");
// //     setTimeLimit("monthly");
// //     localStorage.removeItem("budget");
// //     localStorage.removeItem("timeLimit");

// //     // Clear transactions state
// //     setTransactions([]);
// //     setExpenses([]);

// //     // Refetch transactions after budget reset
// //     fetchTransactions();
// //   };

// //   // ✅ Use the reusable function in useEffect
// //   useEffect(() => {
// //     if (isLoggedIn) {
// //       fetchTransactions();
// //     }
// //   }, [isLoggedIn]);

// //   return (
// //     <div className="container mt-5">
// //       {error && (
// //         <div className="alert alert-danger" role="alert">
// //           {error}
// //         </div>
// //       )}

// //       {isBudgetSet ? (
// //         <BudgetOverview
// //           expenses={expenses}
// //           totalIncome={transactions
// //             .filter((t) => t.type === "income")
// //             .reduce((acc, t) => acc + Number(t.amount), 0)}
// //           handleEditBudget={handleEditBudget}
// //           transactions={transactions}
// //         />
// //       ) : (
// //         <BudgetForm
// //           setBudget={setBudget}
// //           setTimeLimit={setTimeLimit}
// //           setIsBudgetSet={setIsBudgetSet}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default BudgetPage;

// import React, { useState, useEffect } from "react";
// import BudgetForm from "./BudgetForm";
// import BudgetOverview from "./BudgetOverview";

// function BudgetPage() {
//   const [transactions, setTransactions] = useState([]);
//   const [budget, setBudget] = useState(localStorage.getItem("budget") || "");
//   const [timeLimit, setTimeLimit] = useState(localStorage.getItem("timeLimit") || "monthly");
//   const [expenses, setExpenses] = useState([]);
//   const [isBudgetSet, setIsBudgetSet] = useState(!!localStorage.getItem("budget"));
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  

//   const isLoggedIn = !!localStorage.getItem("token");

//   // Add this function to fetch budget data
//   const fetchBudget = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:3010/api/budget", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.budget) {  // Check if budget exists in response
//           setBudget(data.budget.amount);
//           setTimeLimit(data.budget.timeLimit);
//           localStorage.setItem("budget", data.budget.amount);
//           localStorage.setItem("timeLimit", data.budget.timeLimit);
//           setIsBudgetSet(true);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching budget:", error);
//     }
//   };

//   const fetchTransactions = async () => {
//     setIsLoading(true);
//     setError(null);

//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const response = await fetch("http://localhost:3010/api/transactions", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTransactions(data);
//         setExpenses(data.filter((t) => t.type === "expense"));
//         localStorage.setItem("transactions", JSON.stringify(data));
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditBudget = () => {
//     setIsBudgetSet(false);
//     setBudget("");
//     setTimeLimit("monthly");
//     localStorage.removeItem("budget");
//     localStorage.removeItem("timeLimit");
//     setTransactions([]);
//     setExpenses([]);
//     fetchTransactions();
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchBudget();  // Fetch budget when component mounts
//       fetchTransactions();
//     }
//   }, [isLoggedIn]);

//   return (
//     <div className="container mt-5">
//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}

//       {isBudgetSet ? (
//         <BudgetOverview
//           expenses={expenses}
//           totalIncome={transactions
//             .filter((t) => t.type === "income")
//             .reduce((acc, t) => acc + Number(t.amount), 0)}
//           handleEditBudget={handleEditBudget}
//           transactions={transactions}
//         />
//       ) : (
//         <BudgetForm
//           setBudget={setBudget}
//           setTimeLimit={setTimeLimit}
//           setIsBudgetSet={setIsBudgetSet}
//         />
//       )}
//     </div>
//   );
// }

// export default BudgetPage;

import config from '../config';

import React, { useState, useEffect } from "react";
import BudgetForm from "./BudgetForm";
import BudgetOverview from "./BudgetOverview";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BudgetPage() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [timeLimit, setTimeLimit] = useState("monthly");
  const [isBudgetSet, setIsBudgetSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculatePeriodData = (period = timeLimit) => {
    const now = new Date();
    let periodStart;

    if (period === 'day') {
      periodStart = new Date(now.setHours(0, 0, 0, 0));
    } else if (period === 'week') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      periodStart = new Date(now.setDate(diff));
      periodStart.setHours(0, 0, 0, 0);
    } else { // month
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const periodTransactions = transactions.filter(t => 
      new Date(t.date) >= periodStart
    );

    const periodExpenses = periodTransactions
      .filter(t => t.type === 'expense')
      .map(t => ({ ...t, amount: Number(t.amount) || 0 }));

    const periodIncome = periodTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

    return {
      periodExpenses,
      periodIncome,
      periodTransactions
    };
  };

  const { periodExpenses, periodIncome, periodTransactions } = calculatePeriodData();

  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${config.apiBaseUrl}/budget`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.budget) {
          setBudget(data.budget.amount);
          setTimeLimit(data.budget.timeLimit || "monthly");
          setIsBudgetSet(true);
        }
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
      toast.error("Failed to load budget data");
    }
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
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
        throw new Error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message);
      toast.error("Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchBudget();
      fetchTransactions();
    }
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5">Loading budget data...</div>;
  }

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}

      {isBudgetSet ? (
        <BudgetOverview
          expenses={periodExpenses}
          totalIncome={periodIncome}
          handleEditBudget={() => setIsBudgetSet(false)}
          transactions={periodTransactions}
          budget={budget}
          timeLimit={timeLimit}
        />
      ) : (
        <BudgetForm
          setBudget={setBudget}
          setTimeLimit={setTimeLimit}
          setIsBudgetSet={setIsBudgetSet}
          onSuccess={() => {
            fetchBudget();
            toast.success("Budget set successfully!");
          }}
        />
      )}
    </div>
  );
}

export default BudgetPage;