import React from "react";

function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.length === 0 && <p>No expenses added yet.</p>}
      {expenses.map((exp) => (
        <div key={exp.id} className="expense-item">
          <div>
            <strong>{exp.title}</strong> - ₹{exp.amount} | {exp.category} | {exp.date}
          </div>
          <div>
            <button onClick={() => onEdit(exp)}>Edit</button>
            <button onClick={() => onDelete(exp.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}


export default ExpenseList;
