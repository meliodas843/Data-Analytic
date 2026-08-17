import { useState } from "react";

import {
  BarChart,
  Bar,
  ComposedChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import DashboardNavbar from "../../components/DashboardNavbar";
import "../../styles/graphs/FinanceDashboard.css";

const financeData = [
  { month: "Jan", revenue: 4.2, expenses: 2.8, profit: 1.4 },
  { month: "Feb", revenue: 3.8, expenses: 2.6, profit: 1.2 },
  { month: "Mar", revenue: 5.1, expenses: 3.1, profit: 2.0 },
  { month: "Apr", revenue: 4.7, expenses: 3.0, profit: 1.7 },
  { month: "May", revenue: 5.6, expenses: 3.4, profit: 2.2 },
  { month: "Jun", revenue: 6.2, expenses: 3.8, profit: 2.4 },
  { month: "Jul", revenue: 5.9, expenses: 3.6, profit: 2.3 },
  { month: "Aug", revenue: 6.8, expenses: 4.1, profit: 2.7 },
  { month: "Sep", revenue: 7.2, expenses: 4.3, profit: 2.9 },
  { month: "Oct", revenue: 6.9, expenses: 4.0, profit: 2.9 },
  { month: "Nov", revenue: 7.8, expenses: 4.5, profit: 3.3 },
  { month: "Dec", revenue: 8.6, expenses: 5.0, profit: 3.6 },
];

const cashFlowData = [
  { month: "Jul", inflow: 7.2, outflow: 4.1 },
  { month: "Aug", inflow: 6.9, outflow: 4.3 },
  { month: "Sep", inflow: 8.1, outflow: 5.2 },
  { month: "Oct", inflow: 7.4, outflow: 4.0 },
  { month: "Nov", inflow: 9.2, outflow: 5.6 },
  { month: "Dec", inflow: 10.2, outflow: 6.1 },
];

const expenseData = [
  {
    name: "Payroll",
    value: 42,
    color: "#5b5ff2",
  },
  {
    name: "Operations",
    value: 20,
    color: "#14b8d4",
  },
  {
    name: "Marketing",
    value: 15,
    color: "#13b981",
  },
  {
    name: "Technology",
    value: 13,
    color: "#f59e0b",
  },
  {
    name: "Other",
    value: 10,
    color: "#f43f5e",
  },
];

const summaryData = [
  {
    metric: "Revenue",
    q1: "$17.1M",
    q2: "$17.6M",
    q3: "$19.9M",
    q4: "$20.2M",
    yoy: "+12.4%",
  },
  {
    metric: "Gross Profit",
    q1: "$9.4M",
    q2: "$9.7M",
    q3: "$11.0M",
    q4: "$11.1M",
    yoy: "+10.8%",
  },
  {
    metric: "EBITDA",
    q1: "$5.2M",
    q2: "$5.5M",
    q3: "$6.6M",
    q4: "$6.9M",
    yoy: "+14.2%",
  },
  {
    metric: "Net Profit",
    q1: "$4.1M",
    q2: "$4.8M",
    q3: "$5.7M",
    q4: "$6.1M",
    yoy: "+16.5%",
  },
];

function KpiCard({
  title,
  icon,
  value,
  change,
  description,
  className,
}) {
  return (
    <div className={`kpi-card ${className}`}>
      <div className="kpi-title-row">
        <span>{title}</span>
        <span className="kpi-icon">{icon}</span>
      </div>

      <h2>{value}</h2>

      <div className="kpi-change">
        <span>{change}</span>
        <small>{description}</small>
      </div>
    </div>
  );
}

function renderPieLabel({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}) {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 22;

  const x =
    cx +
    radius *
      Math.cos(-midAngle * RADIAN);

  const y =
    cy +
    radius *
      Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#60718f"
      textAnchor={
        x > cx ? "start" : "end"
      }
      dominantBaseline="central"
      fontSize="11"
      fontWeight="700"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function FinanceDashboard() {
  const [language, setLanguage] =
    useState("MN");

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === "MN" ? "EN" : "MN"
    );
  };

  return (
    <div className="dashboard-layout">
      <DashboardNavbar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Finance Dashboard</h1>

            <p>
              Revenue, expenses, cash flow &
              financial health
            </p>
          </div>

          <div className="dashboard-header-right">
            <span>
              Tuesday, August 11, 2026
            </span>

            <button
              type="button"
              className="dashboard-language-button"
              onClick={toggleLanguage}
            >
              <span className="dashboard-language-flag">
                {language === "MN" ? "🇲🇳" : "🇬🇧"}
              </span>

              <span>{language}</span>

              <span className="dashboard-language-arrow">
                ▾
              </span>
            </button>

            <button
              type="button"
              className="dashboard-icon-button"
            >
              🔔
            </button>

            <button
              type="button"
              className="dashboard-icon-button"
            >
              🌙
            </button>
          </div>
        </header>

        <div className="dashboard-content finance-content">
          <section className="finance-kpi-grid">
            <KpiCard
              title="Total Revenue"
              icon="i"
              value="$74.8M"
              change="▲ +12.4%"
              description="vs last month"
              className="kpi-purple"
            />

            <KpiCard
              title="Total Expenses"
              icon="i"
              value="$50.6M"
              change="▲ +9.1%"
              description="vs last month"
              className="kpi-red"
            />

            <KpiCard
              title="Net Profit"
              icon="i"
              value="$24.2M"
              change="▲ +8.7%"
              description="vs last month"
              className="kpi-green"
            />

            <KpiCard
              title="Profit Margin"
              icon="i"
              value="32.4%"
              change="▲ +0.9%"
              description="vs last month"
              className="kpi-cyan"
            />
          </section>

          <section className="finance-chart-grid">
            <div className="dashboard-panel finance-chart-panel">
              <div className="panel-heading">
                <h3>
                  Revenue vs Expenses vs Profit
                </h3>

                <p>
                  Monthly breakdown • FY 2025
                </p>
              </div>

              <div className="finance-chart-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <ComposedChart
                    data={financeData}
                    margin={{
                      top: 15,
                      right: 10,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e8edf5"
                    />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      domain={[0, 10]}
                      ticks={[
                        0,
                        2.5,
                        5,
                        7.5,
                        10,
                      ]}
                      tickFormatter={(value) =>
                        `$${value.toFixed(1)}M`
                      }
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      formatter={(value) =>
                        `$${Number(value).toFixed(1)}M`
                      }
                    />

                    <Legend />

                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="#5b5ff2"
                      radius={[4, 4, 0, 0]}
                      barSize={13}
                    />

                    <Bar
                      dataKey="expenses"
                      name="Expenses"
                      fill="#f43f5e"
                      radius={[4, 4, 0, 0]}
                      barSize={13}
                    />

                    <Line
                      type="monotone"
                      dataKey="profit"
                      name="Profit"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{
                        r: 2,
                        fill: "#ffffff",
                        strokeWidth: 2,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-panel finance-chart-panel">
              <div className="panel-heading">
                <h3>Cash Flow Analysis</h3>

                <p>
                  Inflow vs outflow • Last 6 months
                </p>
              </div>

              <div className="finance-chart-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={cashFlowData}
                    margin={{
                      top: 15,
                      right: 10,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="cashInflow"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.18}
                        />

                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>

                      <linearGradient
                        id="cashOutflow"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#f59e0b"
                          stopOpacity={0.18}
                        />

                        <stop
                          offset="95%"
                          stopColor="#f59e0b"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e8edf5"
                    />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      domain={[0, 12]}
                      ticks={[0, 3, 6, 9, 12]}
                      tickFormatter={(value) =>
                        `$${value.toFixed(1)}M`
                      }
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      formatter={(value) =>
                        `$${Number(value).toFixed(1)}M`
                      }
                    />

                    <Legend />

                    <Area
                      type="monotone"
                      dataKey="inflow"
                      name="Cash Inflow"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#cashInflow)"
                    />

                    <Area
                      type="monotone"
                      dataKey="outflow"
                      name="Cash Outflow"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fill="url(#cashOutflow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="finance-bottom-grid">
            <div className="dashboard-panel finance-expense-panel">
              <div className="panel-heading">
                <h3>Expense Breakdown</h3>
                <p>By category</p>
              </div>

              <div className="finance-pie-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={expenseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="46%"
                      outerRadius={80}
                      labelLine
                      label={renderPieLabel}
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {expenseData.map((item) => (
                        <Cell
                          key={item.name}
                          fill={item.color}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        `${value}%`
                      }
                    />

                    <Legend
                      verticalAlign="bottom"
                      iconType="square"
                      iconSize={10}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-panel finance-summary-panel">
              <div className="panel-heading">
                <h3>Financial Summary</h3>
                <p>FY 2025 YTD</p>
              </div>

              <div className="finance-table-wrapper">
                <table className="finance-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Q1</th>
                      <th>Q2</th>
                      <th>Q3</th>
                      <th>Q4 (est.)</th>
                      <th>YoY</th>
                    </tr>
                  </thead>

                  <tbody>
                    {summaryData.map((row) => (
                      <tr key={row.metric}>
                        <td>
                          <strong>
                            {row.metric}
                          </strong>
                        </td>

                        <td>{row.q1}</td>
                        <td>{row.q2}</td>
                        <td>{row.q3}</td>
                        <td>{row.q4}</td>

                        <td className="finance-positive">
                          {row.yoy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FinanceDashboard;