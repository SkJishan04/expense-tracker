import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ExpenseForm.css";

function ExpenseForm({ onAdd }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const expense = {
      desc,
      amount: parseFloat(amount),
      category,
      date,
    };

    onAdd(expense);

    // Reset form
    setDesc("");
    setAmount("");
    setCategory("");
    setDate(new Date());
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <h2>Add New Expense</h2>

        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="date-picker"
          placeholderText="Select date and time"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">➕ Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
