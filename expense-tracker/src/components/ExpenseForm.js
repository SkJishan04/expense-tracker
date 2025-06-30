import React, { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      ...form,
      id: Date.now(),
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
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
