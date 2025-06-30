import React from "react";

function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.length === 0 && <p>No expenses added yet.</p>}
      {expenses.map((exp) => (
        <div key={exp.id} className="expense-item">
          <div>
            <strong>{exp.title}</strong> - ₹{exp.amount} | {exp.category} | {exp.date}
          </div>
          <button onClick={() => onDelete(exp.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
