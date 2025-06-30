import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import "./styles/styles.css";

function App() {
  const [editing, setEditing] = useState(false);
const [currentExpense, setCurrentExpense] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const data = localStorage.getItem("expenses");
    if (data) setExpenses(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

  // const addExpense = (expense) => {
  //   setExpenses([expense, ...expenses]);
  // };
const saveExpense = (expense) => {
  if (editing) {
    setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
    setEditing(false);
    setCurrentExpense(null);
  } else {
    setExpenses([expense, ...expenses]);
  }
};
const handleEdit = (expense) => {
  setEditing(true);
  setCurrentExpense(expense);
};

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="app">
      <h1>💰 Expense Tracker</h1>
      <ExpenseForm onAdd={saveExpense} editing={editing} currentExpense={currentExpense} />


      {/* Category Filter Dropdown */}
      <div className="filter">
        <label>Filter by Category: </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          {[...new Set(expenses.map((e) => e.category))].map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <ExpenseChart expenses={filteredExpenses} />
      <ExpenseList
  expenses={filteredExpenses}
  onDelete={deleteExpense}
  onEdit={handleEdit}
/>

    </div>
  );
}

export default App;
