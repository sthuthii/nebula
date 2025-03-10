'use client'

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import Navbar from "../Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [input, setInput] = useState({ date: "", amount: "", category: "", notes: "" });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const savedIncome = JSON.parse(localStorage.getItem("income")) || 0;
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

    setExpenses(savedExpenses);
    setIncome(savedIncome);
    setSavings(savedIncome - savedExpenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0));
    setDarkMode(savedDarkMode);
  }, []);

  const handleAddExpense = () => {
    if (!input.date || !input.amount || !input.category) return;
    
    const newExpenses = [...expenses, input];
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    setSavings(income - newExpenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0));
    setInput({ date: "", amount: "", category: "", notes: "" });
  };

  const handleIncomeChange = (e) => {
    const newIncome = parseFloat(e.target.value) || 0;
    setIncome(newIncome);
    localStorage.setItem("income", JSON.stringify(newIncome));
    setSavings(newIncome - expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const expenseCategories = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(expenseCategories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen transition-all`}>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 mt-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all">
        
        {/* Header */}
        <h2 className="text-2xl font-extrabold mb-6 text-center">💰 Expense Tracker</h2>

        {/* Income Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold">Income:</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={income}
            onChange={handleIncomeChange}
          />
        </div>

        {/* Expense Input */}
        <div className="space-y-4">
          <input
            type="date"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none transition"
            value={input.date}
            onChange={(e) => setInput({ ...input, date: e.target.value })}
          />
          <input
            type="number"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none transition"
            placeholder="Amount"
            value={input.amount}
            onChange={(e) => setInput({ ...input, amount: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none transition"
            placeholder="Category"
            value={input.category}
            onChange={(e) => setInput({ ...input, category: e.target.value })}
          />
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none transition"
            placeholder="Notes (optional)"
            value={input.notes}
            onChange={(e) => setInput({ ...input, notes: e.target.value })}
          ></textarea>
          <button
            onClick={handleAddExpense}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-all"
          >
            ➕ Add Expense
          </button>
        </div>

        {/* Savings Display */}
        <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-center">💸 Savings: ₹{savings}</h2>
        </div>

        {/* Expense Chart */}
        <div className="mt-6">
  <h2 className="text-xl font-bold">Expense Breakdown</h2>
  <div className="w-full h-[250px]"> {/* Set a fixed height */}
    <Bar
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false, // Allows manual height control
        plugins: {
          legend: { display: false }, // Hide legend for cleaner look
          title: {
            display: true,
            text: "Expense Breakdown",
            font: { size: 16 },
            color: darkMode ? "white" : "black",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: false },
          },
          x: {
            grid: { display: false },
          },
        },
      }}
    />
  </div>
</div>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="mt-6 w-full py-3 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
