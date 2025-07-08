import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./MonthlyReport.css";

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#0088FE'];

function MonthlyReport({ expenses, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filtered = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
  });

  const total = filtered.reduce((sum, e) => sum + e.amount, 0).toFixed(2);

  const categories = filtered.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  const categoryData = Object.entries(categories).map(([name, value]) => ({ name, value }));

  const topCategory = categoryData.reduce((top, c) => c.value > top.value ? c : top, { name: "", value: 0 });

  const dayData = filtered.reduce((acc, curr) => {
    const day = new Date(curr.date).getDate();
    acc[day] = (acc[day] || 0) + curr.amount;
    return acc;
  }, {});
  const barData = Object.entries(dayData).map(([name, value]) => ({ name: `Day ${name}`, value }));

  return (
    <div className="monthly-report">
      <div className="report-header">
        <h2>Monthly Report</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="selectors">
        <select value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) =>
            <option key={i} value={i}>{new Date(0, i).toLocaleString("default", { month: "long" })}</option>
          )}
        </select>
        <input type="number" value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))} />
      </div>

      <div className="report-card">
        <p><strong>Total Spending:</strong> ₹{total}</p>
        <p><strong>Top Category:</strong> {topCategory.name || "N/A"}</p>

        <div className="charts">
          <div className="chart">
            <h4>By Category</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart">
            <h4>Spending by Day</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyReport;
