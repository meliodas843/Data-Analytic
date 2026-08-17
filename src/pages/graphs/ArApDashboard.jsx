import { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import DashboardNavbar from "../../components/DashboardNavbar";
import "../../styles/graphs/ArApDashboard.css";


const arAgingData = [
  {
    name: "Current",
    value: 3.85,
    color: "#14b981",
  },
  {
    name: "1–30 days",
    value: 1.28,
    color: "#12b4cf",
  },
  {
    name: "31–60 days",
    value: 0.72,
    color: "#f59e0b",
  },
  {
    name: "61–90 days",
    value: 0.38,
    color: "#f97316",
  },
  {
    name: "90+ days",
    value: 0.19,
    color: "#f43f5e",
  },
];


const apAgingData = [
  {
    name: "Current",
    value: 1.85,
    color: "#14b981",
  },
  {
    name: "1–30 days",
    value: 0.98,
    color: "#12b4cf",
  },
  {
    name: "31–60 days",
    value: 0.62,
    color: "#8b5cf6",
  },
  {
    name: "61–90 days",
    value: 0.28,
    color: "#f59e0b",
  },
  {
    name: "90+ days",
    value: 0.12,
    color: "#f43f5e",
  },
];


const invoices = [
  {
    invoice: "INV-2025-0891",
    customer: "Acme Corp",
    issueDate: "Nov 1",
    dueDate: "Dec 1",
    amount: "$284,000",
    overdue: "34d",
    status: "Overdue",
  },
  {
    invoice: "INV-2025-0847",
    customer: "GlobalTech",
    issueDate: "Nov 8",
    dueDate: "Dec 8",
    amount: "$198,400",
    overdue: "27d",
    status: "Overdue",
  },
  {
    invoice: "INV-2025-0912",
    customer: "NexaCloud",
    issueDate: "Nov 20",
    dueDate: "Dec 20",
    amount: "$156,200",
    overdue: "15d",
    status: "Overdue",
  },
  {
    invoice: "INV-2025-0928",
    customer: "Vertex Labs",
    issueDate: "Nov 25",
    dueDate: "Dec 25",
    amount: "$128,600",
    overdue: "10d",
    status: "Overdue",
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
    <div
      className={`kpi-card ${className}`}
    >
      <div className="kpi-title-row">
        <span>
          {title}
        </span>

        <span className="kpi-icon">
          {icon}
        </span>
      </div>

      <h2>
        {value}
      </h2>

      <div className="kpi-change">
        <span>
          {change}
        </span>

        <small>
          {description}
        </small>
      </div>
    </div>
  );
}


function AgingChart({
  data,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 10,
          right: 20,
          left: 15,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke="#e8edf5"
        />

        <XAxis
          type="number"
          domain={[
            0,
            "dataMax",
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

        <YAxis
          type="category"
          dataKey="name"
          width={75}
          tick={{
            fill: "#7d8eaa",
            fontSize: 11,
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          cursor={{
            fill:
              "rgba(100, 116, 139, 0.05)",
          }}
          formatter={(value) => [
            `$${Number(
              value
            ).toFixed(2)}M`,
            "Amount",
          ]}
        />

        <Bar
          dataKey="value"
          radius={[
            0,
            5,
            5,
            0,
          ]}
          barSize={36}
        >
          {data.map(
            (item) => (
              <Cell
                key={
                  item.name
                }
                fill={
                  item.color
                }
              />
            )
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}


function ArApDashboard() {
  const [
    language,
    setLanguage,
  ] = useState("MN");


  const toggleLanguage = () => {
    setLanguage(
      (prev) =>
        prev === "MN"
          ? "EN"
          : "MN"
    );
  };


  return (
    <div className="dashboard-layout">

      <DashboardNavbar />


      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>
              AR/AP Dashboard
            </h1>

            <p>
              Receivables, payables &
              payment aging
            </p>
          </div>


          <div className="dashboard-header-right">

            <span>
              Tuesday, August 11, 2026
            </span>


            <button
              type="button"
              className="dashboard-language-button"
              onClick={
                toggleLanguage
              }
            >
              <span className="dashboard-language-flag">
                {language === "MN"
                  ? "🇲🇳"
                  : "🇬🇧"}
              </span>

              <span>
                {language}
              </span>

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


        <div className="dashboard-content arap-content">

          <section className="arap-kpi-grid">

            <KpiCard
              title="Total Receivables"
              icon="📩"
              value="$6.39M"
              change="▼ -4.2%"
              description="vs last month"
              className="kpi-cyan"
            />


            <KpiCard
              title="Total Payables"
              icon="📤"
              value="$3.84M"
              change="▲ +2.8%"
              description="vs last month"
              className="kpi-orange"
            />


            <KpiCard
              title="DSO"
              icon="⏱"
              value="38.4 days"
              change="▼ -2.1d"
              description="vs last month"
              className="kpi-purple"
            />


            <KpiCard
              title="DPO"
              icon="📅"
              value="44.2 days"
              change="▲ +1.8d"
              description="vs last month"
              className="kpi-green"
            />

          </section>


          <section className="arap-chart-grid">

            <div className="dashboard-panel arap-chart-panel">

              <div className="panel-heading">

                <h3>
                  AR Aging Buckets
                </h3>

                <p>
                  Outstanding
                  receivables by age
                </p>

              </div>


              <div className="arap-chart-wrapper">

                <AgingChart
                  data={
                    arAgingData
                  }
                />

              </div>

            </div>


            <div className="dashboard-panel arap-chart-panel">

              <div className="panel-heading">

                <h3>
                  AP Aging Buckets
                </h3>

                <p>
                  Outstanding payables
                  by age
                </p>

              </div>


              <div className="arap-chart-wrapper">

                <AgingChart
                  data={
                    apAgingData
                  }
                />

              </div>

            </div>

          </section>


          <section className="dashboard-panel arap-table-panel">

            <div className="panel-heading">

              <h3>
                Top Outstanding
                Invoices
              </h3>

              <p>
                Sorted by amount due
              </p>

            </div>


            <div className="arap-table-container">

              <table className="arap-table">

                <thead>

                  <tr>
                    <th>
                      Invoice #
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Issue Date
                    </th>

                    <th>
                      Due Date
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Days Overdue
                    </th>

                    <th>
                      Status
                    </th>
                  </tr>

                </thead>


                <tbody>

                  {invoices.map(
                    (item) => (

                      <tr
                        key={
                          item.invoice
                        }
                      >

                        <td className="invoice-number">
                          {
                            item.invoice
                          }
                        </td>


                        <td className="customer-name">
                          {
                            item.customer
                          }
                        </td>


                        <td>
                          {
                            item.issueDate
                          }
                        </td>


                        <td>
                          {
                            item.dueDate
                          }
                        </td>


                        <td className="invoice-amount">
                          {
                            item.amount
                          }
                        </td>


                        <td className="overdue-days">
                          {
                            item.overdue
                          }
                        </td>


                        <td>

                          <span className="overdue-badge">
                            {
                              item.status
                            }
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


export default ArApDashboard;