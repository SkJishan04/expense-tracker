import { FaUtensils, FaHome, FaPlane, FaShoppingBag, FaQuestion } from "react-icons/fa";
import "./ExpenseList.css";

const categoryMeta = {
  Food: { color: "#f97316", icon: <FaUtensils /> },
  Rent: { color: "#6366f1", icon: <FaHome /> },
  Travel: { color: "#22c55e", icon: <FaPlane /> },
  Shopping: { color: "#ec4899", icon: <FaShoppingBag /> },
  Other: { color: "#94a3b8", icon: <FaQuestion /> },
};

function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="expense-list-wrapper">
      <h3>Expenses</h3>
      <ul className="expense-list">
        {expenses.map((expense, index) => {
          const meta = categoryMeta[expense.category] || categoryMeta["Other"];
          return (
            <li key={index} className="expense-item" style={{ borderLeftColor: meta.color }}>
              <div className="expense-left">
                <div className="expense-icon" style={{ color: meta.color }}>
                  {meta.icon}
                </div>
                <div>
                  <strong>{expense.desc}</strong> <br />
                  <small>{expense.category}</small> |{" "}
                  <small>{new Date(expense.date).toLocaleString()}</small>
                </div>
              </div>

              <div className="expense-right">
                <div className="expense-amount">₹{expense.amount.toFixed(2)}</div>
                <button className="delete-btn" onClick={() => onDelete(expense._id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ExpenseList;
