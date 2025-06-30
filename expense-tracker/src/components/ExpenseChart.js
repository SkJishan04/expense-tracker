import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#A28EEC"];

function ExpenseChart({ expenses }) {
  // 📊 Pie Chart: by category
  const categoryData = Object.values(
    expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) acc[exp.category] = { name: exp.category, value: 0 };
      acc[exp.category].value += exp.amount;
      return acc;
    }, {})
  );

  // 📊 Bar Chart: by month
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthlyTotals = Array(12).fill(0);
  expenses.forEach((exp) => {
    const month = new Date(exp.date).getMonth();
    monthlyTotals[month] += exp.amount;
  });

  const barChartData = monthlyTotals.map((total, i) => ({
    month: monthNames[i],
    amount: total,
  }));

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {categoryData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h2>Spending by Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
