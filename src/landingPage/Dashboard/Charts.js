import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const predefinedColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#6B8E23",
  "#8E44AD",
  "#2ECC71",
];

const Charts = ({
  dailyIncome = 0,
  dailyExpenses = 0,
  weeklyIncome = 0,
  weeklyExpenses = 0,
  monthlyIncome = 0,
  monthlyExpenses = 0,
  transactions = [],
}) => {
  // Get the current month and year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Filter transactions for the current month
  const monthlyTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  // Process expense categories for pie chart
  const expenseCategories = [
    ...new Set(
      monthlyTransactions
        .filter((t) => t.type === "expense" && t.category)
        .map((t) => t.category)
    ),
  ];

  const categoryTotals = expenseCategories.map((category) => {
    return monthlyTransactions
      .filter((t) => t.type === "expense" && t.category === category)
      .reduce((acc, t) => acc + (t.amount || 0), 0);
  });

  // Pie Chart Data
  const pieData = {
    labels: expenseCategories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: expenseCategories.map(
          (_, i) => predefinedColors[i % predefinedColors.length]
        ),
      },
    ],
  };

  // Bar Chart Data - Time Comparison
  const barData = {
    labels: ["Today", "This Week", "This Month"],
    datasets: [
      {
        label: "Income",
        data: [dailyIncome, weeklyIncome, monthlyIncome],
        backgroundColor: "#36a2eb",
      },
      {
        label: "Expenses",
        data: [dailyExpenses, weeklyExpenses, monthlyExpenses],
        backgroundColor: "#ff6384",
      },
    ],
  };

  return (
    <div className="container my-5">
      <h2 className="text-center my-5">Financial Overview</h2>
      <div className="row">
        <div className="col-md-6">
          <h4 className="mb-4">Expense Distribution</h4>
          {expenseCategories.length > 0 ? (
            <Pie data={pieData} />
          ) : (
            <p>No expense data available</p>
          )}
        </div>
        <div className="col-md-6">
          <h4 className="mb-4">Income vs Expenses</h4>
          <Bar
            data={barData}
            options={{
              responsive: true,
              scales: {
                x: {
                  stacked: false,
                },
                y: {
                  stacked: false,
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
