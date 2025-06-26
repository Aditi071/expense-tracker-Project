# Expense Tracker Web Application

A full-stack personal finance management app built using the MERN stack. This application helps users track income and expenses, set budgets, and visualize financial trends through charts and summaries.

**Live Demo:** [https://expense-tracker-tech-app.vercel.app/](https://expense-tracker-tech-app.vercel.app/)

---

## Features

- Add, edit, and delete income or expense transactions
- View recent and complete transaction history
- Set weekly, monthly, or yearly budgets
- Visualize spending with charts (Expense Distribution, Income vs Expense)
- User authentication with login and signup
- View and manage user profile

---

## Tech Stack

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Context API
- **Charts**: Chart.js

---

## Folder Structure

### Frontend (`/expense-tracker`)
src/
├── Dashboard/ # Dashboard components
├── budgetPage/ # Budget management UI
├── AllTransactions/ # Full transaction history view
├── services/ # API and service functions
├── AuthContext.js # Authentication state handling
├── ProtectedRoute.js # Route protection logic
├── login.js / signup.js
├── ProfilePage.js / Navbar.js / Footer.js
├── index.js / index.css

### Backend (`/expense-tracker-backend`)
model/ # Mongoose schemas for User, Budget, Transactions
routes/ # Express routes for auth, budget, transactions
middleware/ # Auth middleware for route protection
index.js # Main server entry point
.env # Environment configuration


Each side of the project follows a modular structure, organized by features such as Dashboard, Transactions, Budget, and Authentication.

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local instance or MongoDB Atlas)

### Setup Instructions

#### Frontend
``bash
cd expense-tracker
npm install
npm start


Backend

cd ../expense-tracker-backend
npm install
npm run dev


Environment Variables
Create a .env file in the backend directory with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Future Enhancements

Export transactions to CSV
Notification system for budget limits
Responsive mobile layout
Dark mode toggle
