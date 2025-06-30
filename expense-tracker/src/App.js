import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import "./styles/styles.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("expenses");
    if (data) setExpenses(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="app">
      <h1>💰 Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseChart expenses={expenses} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
