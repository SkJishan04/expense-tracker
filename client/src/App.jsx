import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./pages/Dashboard";
import MonthlyReport from "./components/MonthlyReport";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";


function App() {
  const [expenses, setExpenses] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authMode, setAuthMode] = useState("login");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchExpenses();
    }
  }, [token]);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setExpenses(data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  const handleAdd = async (expense) => {
    try {
      const res = await fetch(`${baseUrl}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });
      const data = await res.json();
      if (res.ok) setExpenses((prev) => [...prev, data.expense]);
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  const exportPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Expense Report", 14, 22);

  const tableRows = expenses.map((exp) => [
    exp.desc,
    `₹${exp.amount.toFixed(2)}`,
    exp.category,
    new Date(exp.date).toLocaleString(),
  ]);

  autoTable(doc, { // ✅ use plugin like this
    head: [["Description", "Amount", "Category", "Date"]],
    body: tableRows,
    startY: 30,
  });

  doc.save("expense-report.pdf");
};


  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.map((exp) => ({
        Description: exp.desc,
        Amount: exp.amount,
        Category: exp.category,
        Date: new Date(exp.date).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "expense-report.xlsx");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!token) {
  return authMode === "login" ? (
    <>
      <Login onAuth={setToken} switchToRegister={() => setAuthMode("register")} />
    </>
  ) : (
    <>
      <Register onAuth={setToken} switchToLogin={() => setAuthMode("login")} />
    </>
  );
}


  return (
  <div className="app-container">
    <div className="app-header">
  <h1 className="app-title">Expense Tracker</h1>
  <div className="logout-area">
    {/* <img src="https://i.pravatar.cc/150?img=32" alt="User" className="avatar" /> */}

    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </div>
</div>


    <ExpenseForm onAdd={handleAdd} />
    <ExpenseList expenses={expenses} onDelete={handleDelete} />

    <div className="action-buttons">
      <button onClick={exportPDF}>📄 Download PDF</button>
      <button onClick={exportExcel}>📊 Download Excel</button>
      <button onClick={() => setShowReport(true)}>📅 Monthly Report</button>
    </div>

    <Dashboard expenses={expenses} />

    {showReport && (
      <MonthlyReport
        expenses={expenses}
        onClose={() => setShowReport(false)}
      />
    )}
  </div>
);

}

export default App;
