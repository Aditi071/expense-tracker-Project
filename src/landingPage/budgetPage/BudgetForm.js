// // import React, { useState } from "react";
// // import axios from "axios";

// // function BudgetForm({ setBudget, setTimeLimit, setIsBudgetSet }) {
// //   const [budgetInput, setBudgetInput] = useState("");
// //   const [timeLimitInput, setTimeLimitInput] = useState("monthly");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const budgetData = {
// //       amount: Number(budgetInput),
// //       timeLimit: timeLimitInput
// //     };
  
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.post(
// //         "http://localhost:3010/api/budget",
// //         budgetData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json"
// //           },
// //           validateStatus: (status) => status < 500 // Don't throw on 4xx errors
// //         }
// //       );
  
// //       if (response.status === 200) {
// //         console.log("Budget saved:", response.data);
// //         localStorage.setItem("budget", budgetInput);
// //         localStorage.setItem("timeLimit", timeLimitInput);
// //         setBudget(budgetInput);
// //         setTimeLimit(timeLimitInput);
// //         setIsBudgetSet(true);
// //       } else {
// //         console.error("Server responded with:", response.status, response.data);
// //         alert(response.data.error || "Failed to save budget");
// //       }
// //     } catch (error) {
// //       console.error("Request failed:", error);
// //       alert(error.response?.data?.error || "An error occurred");
// //     }
// //   };
  
  

// //   return (
// //     <div className="row d-flex justify-content-center">
// //       <div className="col-md-8 col-lg-6">
// //         <form className="p-4 border rounded shadow bg-white" onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <label htmlFor="budgetAmount" className="form-label">Budget Amount (₹)</label>
// //             <input
// //               type="number"
// //               className="form-control"
// //               placeholder="Enter budget amount"
// //               value={budgetInput}
// //               onChange={(e) => setBudgetInput(e.target.value)}
// //               min="1"
// //               required
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="timeLimit" className="form-label">Set the Time Limit</label>
// //             <select
// //               className="form-select"
// //               id="timeLimit"
// //               value={timeLimitInput}
// //               onChange={(e) => setTimeLimitInput(e.target.value)}
// //             >
// //               <option value="monthly">Monthly</option>
// //               <option value="weekly">Weekly</option>
// //               <option value="yearly">Yearly</option>
// //             </select>
// //           </div>
// //           <button type="submit" className="btn btn-primary w-100">Set Budget</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default BudgetForm;


// import React, { useState } from "react";
// import axios from "axios";

// function BudgetForm({ setBudget, setTimeLimit, setIsBudgetSet }) {
//   const [budgetInput, setBudgetInput] = useState("");
//   const [timeLimitInput, setTimeLimitInput] = useState("monthly");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const budgetData = {
//       amount: Number(budgetInput),
//       timeLimit: timeLimitInput
//     };
  
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3010/api/budget",
//         budgetData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
  
//       if (response.status === 200) {
//         // Use the returned budget data instead of local input
//         const { amount, timeLimit } = response.data.budget;
//         localStorage.setItem("budget", amount);
//         localStorage.setItem("timeLimit", timeLimit);
//         setBudget(amount);
//         setTimeLimit(timeLimit);
//         setIsBudgetSet(true);
        
//       } else {
//         console.error("Server responded with:", response.status, response.data);
//         alert(response.data.error || "Failed to save budget");
//       }
//     } catch (error) {
//       console.error("Request failed:", error);
//       alert(error.response?.data?.error || "An error occurred");
//     }
//   };
  
//   return (
//     <div className="row d-flex justify-content-center">
//       <div className="col-md-8 col-lg-6">
//         <form className="p-4 border rounded shadow bg-white" onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="budgetAmount" className="form-label">Budget Amount (₹)</label>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Enter budget amount"
//               value={budgetInput}
//               onChange={(e) => setBudgetInput(e.target.value)}
//               min="1"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="timeLimit" className="form-label">Set the Time Limit</label>
//             <select
//               className="form-select"
//               id="timeLimit"
//               value={timeLimitInput}
//               onChange={(e) => setTimeLimitInput(e.target.value)}
//             >
//               <option value="monthly">Monthly</option>
//               <option value="weekly">Weekly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Set Budget</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BudgetForm;


import config from '../config';
import React, { useState } from "react";
import axios from "axios";

function BudgetForm({ setBudget, setTimeLimit, setIsBudgetSet, onSuccess }) {
  const [budgetInput, setBudgetInput] = useState("");
  const [timeLimitInput, setTimeLimitInput] = useState("monthly");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const budgetData = {
      amount: Number(budgetInput),
      timeLimit: timeLimitInput
    };
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.apiBaseUrl}/budget`,
        budgetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.status === 200) {
        const { amount, timeLimit } = response.data.budget;
        localStorage.setItem("budget", amount);
        localStorage.setItem("timeLimit", timeLimit);
        setBudget(amount);
        setTimeLimit(timeLimit);
        setIsBudgetSet(true);
        if (onSuccess) onSuccess(); // Call the success callback
      } else {
        alert(response.data.error || "Failed to save budget");
      }
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };
  
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-8 col-lg-6">
        <form className="p-4 border rounded shadow bg-white" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="budgetAmount" className="form-label">Budget Amount (₹)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter budget amount"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="timeLimit" className="form-label">Set the Time Limit</label>
            <select
              className="form-select"
              id="timeLimit"
              value={timeLimitInput}
              onChange={(e) => setTimeLimitInput(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Set Budget</button>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm;