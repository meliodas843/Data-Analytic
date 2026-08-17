import { useState } from "react";

import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

import DashboardNavbar from "../../components/DashboardNavbar";
import "../../styles/graphs/SalesDashboard.css";

const salesByProductData = [
  {
    name: "Enterprise",
    revenue: 18.4,
  },
  {
    name: "Professional",
    revenue: 15.8,
  },
  {
    name: "Starter",
    revenue: 12.1,
  },
  {
    name: "Add-ons",
    revenue: 9.7,
  },
  {
    name: "Services",
    revenue: 7.8,
  },
];

const pipelineData = [
  {
    stage: "Lead",
    value: 18.5,
  },
  {
    stage: "Qualified",
    value: 14.2,
  },
  {
    stage: "Proposal",
    value: 10.8,
  },
  {
    stage: "Negotiation",
    value: 7.6,
  },
  {
    stage: "Closed Won",
    value: 5.4,
  },
];

const repPerformanceData = [
  {
    rep: "Sarah",
    quota: 100,
    actual: 124,
  },
  {
    rep: "Michael",
    quota: 100,
    actual: 116,
  },
  {
    rep: "Emma",
    quota: 100,
    actual: 109,
  },
  {
    rep: "Daniel",
    quota: 100,
    actual: 103,
  },
  {
    rep: "Olivia",
    quota: 100,
    actual: 96,
  },
  {
    rep: "James",
    quota: 100,
    actual: 91,
  },
];

const dealScatterData = [
  {
    deals: 24,
    revenue: 1.4,
    size: 120,
  },
  {
    deals: 31,
    revenue: 1.9,
    size: 150,
  },
  {
    deals: 38,
    revenue: 2.4,
    size: 170,
  },
  {
    deals: 45,
    revenue: 3.1,
    size: 210,
  },
  {
    deals: 52,
    revenue: 3.7,
    size: 230,
  },
  {
    deals: 59,
    revenue: 4.3,
    size: 250,
  },
  {
    deals: 66,
    revenue: 5,
    size: 280,
  },
  {
    deals: 72,
    revenue: 5.6,
    size: 300,
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

function CurrencyTooltip({
  active,
  payload,
  label,
}) {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  return (
    <div className="sales-tooltip">
      <strong>{label}</strong>

      {payload.map((item) => (
        <div key={item.dataKey}>
          {item.name}: ${item.value}M
        </div>
      ))}
    </div>
  );
}

function SalesDashboard() {
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
            <h1>Sales Dashboard</h1>

            <p>
              Pipeline, performance & revenue
              analysis
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

        <div className="dashboard-content sales-content">
          <section className="sales-kpi-grid">
            <KpiCard
              title="Total Sales"
              icon="💰"
              value="$63.8M"
              change="▲ +11.8%"
              description="vs last month"
              className="kpi-purple"
            />

            <KpiCard
              title="Deals Closed"
              icon="🤝"
              value="842"
              change="▲ +9.4%"
              description="vs last month"
              className="kpi-green"
            />

            <KpiCard
              title="Avg Deal Size"
              icon="📊"
              value="$75.8K"
              change="▲ +4.1%"
              description="vs last month"
              className="kpi-cyan"
            />

            <KpiCard
              title="Win Rate"
              icon="🎯"
              value="38.6%"
              change="▲ +2.7%"
              description="vs last month"
              className="kpi-orange"
            />
          </section>

          <section className="sales-chart-grid">
            <div className="dashboard-panel sales-chart-panel">
              <div className="panel-heading">
                <h3>
                  Sales by Product Line
                </h3>

                <p>
                  Revenue contribution by product
                </p>
              </div>

              <div className="sales-chart-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={salesByProductData}
                    margin={{
                      top: 15,
                      right: 15,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e8edf5"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 10,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tickFormatter={(value) =>
                        `$${value}M`
                      }
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      content={
                        <CurrencyTooltip />
                      }
                    />

                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="#5b5ff2"
                      radius={[5, 5, 0, 0]}
                      barSize={34}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-panel sales-chart-panel">
              <div className="panel-heading">
                <h3>Pipeline by Stage</h3>

                <p>
                  Current opportunity value
                </p>
              </div>

              <div className="sales-chart-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={pipelineData}
                    layout="vertical"
                    margin={{
                      top: 15,
                      right: 15,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e8edf5"
                      horizontal={false}
                    />

                    <XAxis
                      type="number"
                      tickFormatter={(value) =>
                        `$${value}M`
                      }
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="stage"
                      width={80}
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      formatter={(value) =>
                        `$${value}M`
                      }
                    />

                    <Bar
                      dataKey="value"
                      radius={[0, 5, 5, 0]}
                      barSize={28}
                    >
                      {pipelineData.map(
                        (item, index) => {
                          const colors = [
                            "#5b5ff2",
                            "#16b8d4",
                            "#13b981",
                            "#f59e0b",
                            "#f43f5e",
                          ];

                          return (
                            <Cell
                              key={item.stage}
                              fill={
                                colors[index]
                              }
                            />
                          );
                        }
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="sales-bottom-grid">
            <div className="dashboard-panel sales-bottom-panel">
              <div className="panel-heading">
                <h3>
                  Sales Rep Performance
                </h3>

                <p>
                  Quota attainment percentage
                </p>
              </div>

              <div className="sales-bottom-chart-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={repPerformanceData}
                    margin={{
                      top: 15,
                      right: 15,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e8edf5"
                    />

                    <XAxis
                      dataKey="rep"
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 10,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      domain={[0, 140]}
                      tickFormatter={(value) =>
                        `${value}%`
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
                        `${value}%`
                      }
                    />

                    <Legend
                      iconType="square"
                      iconSize={9}
                    />

                    <Bar
                      dataKey="quota"
                      name="Quota"
                      fill="#e7eaf3"
                      radius={[5, 5, 0, 0]}
                      barSize={18}
                    />

                    <Bar
                      dataKey="actual"
                      name="Actual"
                      fill="#13b981"
                      radius={[5, 5, 0, 0]}
                      barSize={18}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-panel sales-bottom-panel">
              <div className="panel-heading">
                <h3>
                  Deal Volume vs Revenue
                </h3>

                <p>
                  Monthly sales relationship
                </p>
              </div>

              <div className="sales-bottom-chart-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <ScatterChart
                    margin={{
                      top: 15,
                      right: 20,
                      bottom: 5,
                      left: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e8edf5"
                    />

                    <XAxis
                      type="number"
                      dataKey="deals"
                      name="Deals"
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      type="number"
                      dataKey="revenue"
                      name="Revenue"
                      unit="M"
                      tickFormatter={(value) =>
                        `$${value}M`
                      }
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <ZAxis
                      type="number"
                      dataKey="size"
                      range={[80, 260]}
                    />

                    <Tooltip
                      cursor={{
                        strokeDasharray: "3 3",
                      }}
                      formatter={(
                        value,
                        name
                      ) => {
                        if (
                          name === "Revenue"
                        ) {
                          return [
                            `$${value}M`,
                            name,
                          ];
                        }

                        return [
                          value,
                          name,
                        ];
                      }}
                    />

                    <Scatter
                      name="Sales"
                      data={dealScatterData}
                      fill="#5b5ff2"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SalesDashboard;