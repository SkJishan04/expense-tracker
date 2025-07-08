import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#0088FE"];

function Dashboard({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2);

  // Prepare Pie Chart Data
  const categoryMap = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  // Prepare Bar Chart Data (Monthly)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyTotals = Array(12).fill(0);
  expenses.forEach((exp) => {
    const month = new Date(exp.date).getMonth();
    monthlyTotals[month] += exp.amount;
  });
  const barData = monthlyTotals.map((amount, i) => ({
    month: monthNames[i],
    amount,
  }));

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p><strong>Total Spending:</strong> ₹{total}</p>

      <div className="dashboard-grid">
        {/* Pie Chart */}
        <div className="dashboard-card">
          <h4>By Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="dashboard-card">
          <h4>Spending by Month</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
