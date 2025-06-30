import React, { useState, useEffect } from "react";

function ExpenseForm({ onAdd, editing, currentExpense }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });

  useEffect(() => {
    if (editing && currentExpense) {
      setForm(currentExpense);
    }
  }, [editing, currentExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      ...form,
      id: editing ? form.id : Date.now(),
      amount: parseFloat(form.amount),
    };
    onAdd(expense);
    setForm({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <button type="submit">{editing ? "Update" : "Add"} Expense</button>
    </form>
  );
}

export default ExpenseForm;
