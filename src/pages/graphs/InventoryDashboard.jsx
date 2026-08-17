import { useState } from "react";

import {
  BarChart,
  Bar,
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

import "../../styles/graphs/InventoryDashboard.css";

const stockCategoryData = [
  {
    name: "Electronics",
    inStock: 820,
    reorder: 130,
  },
  {
    name: "Components",
    inStock: 690,
    reorder: 110,
  },
  {
    name: "Accessories",
    inStock: 580,
    reorder: 85,
  },
  {
    name: "Networking",
    inStock: 470,
    reorder: 75,
  },
  {
    name: "Storage",
    inStock: 390,
    reorder: 65,
  },
  {
    name: "Other",
    inStock: 310,
    reorder: 55,
  },
];

const inventoryValueData = [
  {
    name: "Electronics",
    value: 32,
    color: "#5b5ff2",
  },
  {
    name: "Components",
    value: 24,
    color: "#13b981",
  },
  {
    name: "Accessories",
    value: 18,
    color: "#16b8d4",
  },
  {
    name: "Networking",
    value: 14,
    color: "#f59e0b",
  },
  {
    name: "Other",
    value: 12,
    color: "#9b5de5",
  },
];

const inventoryItems = [
  {
    sku: "SKU-10042",
    product: "Wireless Headset Pro",
    category: "Electronics",
    stock: 124,
    reorder: 40,
    value: "$18,600",
    status: "Healthy",
  },
  {
    sku: "SKU-10057",
    product: "USB-C Docking Station",
    category: "Accessories",
    stock: 28,
    reorder: 35,
    value: "$8,960",
    status: "Low Stock",
  },
  {
    sku: "SKU-10081",
    product: "Enterprise Router X1",
    category: "Networking",
    stock: 12,
    reorder: 20,
    value: "$24,000",
    status: "Low Stock",
  },
  {
    sku: "SKU-10114",
    product: "NVMe SSD 2TB",
    category: "Storage",
    stock: 0,
    reorder: 30,
    value: "$0",
    status: "Out of Stock",
  },
  {
    sku: "SKU-10139",
    product: "Mechanical Keyboard",
    category: "Accessories",
    stock: 86,
    reorder: 25,
    value: "$10,320",
    status: "Healthy",
  },
  {
    sku: "SKU-10152",
    product: "32-inch Monitor",
    category: "Electronics",
    stock: 64,
    reorder: 20,
    value: "$28,800",
    status: "Healthy",
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

function InventoryDashboard() {
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
            <h1>Inventory Dashboard</h1>

            <p>
              Stock levels, turnover & inventory
              health
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

        <div className="dashboard-content inventory-content">
          <section className="inventory-kpi-grid">
            <KpiCard
              title="Total SKUs"
              icon="📦"
              value="1,248"
              change="▲ +4.8%"
              description="vs last month"
              className="kpi-purple"
            />

            <KpiCard
              title="Inventory Value"
              icon="💰"
              value="$8.42M"
              change="▲ +6.2%"
              description="vs last month"
              className="kpi-green"
            />

            <KpiCard
              title="Turnover Rate"
              icon="🔄"
              value="6.8x"
              change="▲ +0.4x"
              description="vs last quarter"
              className="kpi-cyan"
            />

            <KpiCard
              title="Out of Stock"
              icon="⚠️"
              value="18"
              change="▼ -6"
              description="vs last month"
              className="kpi-red"
            />
          </section>

          <section className="inventory-chart-grid">
            <div className="dashboard-panel inventory-stock-panel">
              <div className="panel-heading">
                <h3>
                  Stock Levels by Category
                </h3>

                <p>
                  Current stock vs reorder level
                </p>
              </div>

              <div className="inventory-chart-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={stockCategoryData}
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
                      tick={{
                        fill: "#7d8eaa",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Legend
                      iconType="square"
                      iconSize={10}
                    />

                    <Bar
                      dataKey="inStock"
                      name="In Stock"
                      fill="#5b5ff2"
                      radius={[5, 5, 0, 0]}
                      barSize={24}
                    />

                    <Bar
                      dataKey="reorder"
                      name="Reorder Level"
                      fill="#f59e0b"
                      radius={[5, 5, 0, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-panel inventory-value-panel">
              <div className="panel-heading">
                <h3>Inventory Value Mix</h3>

                <p>
                  Value distribution by category
                </p>
              </div>

              <div className="inventory-pie-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={inventoryValueData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="44%"
                      innerRadius={55}
                      outerRadius={82}
                      paddingAngle={2}
                      labelLine
                      label={renderPieLabel}
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {inventoryValueData.map(
                        (item) => (
                          <Cell
                            key={item.name}
                            fill={item.color}
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [
                        `${value}%`,
                        "Share",
                      ]}
                    />

                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      iconType="square"
                      iconSize={9}
                      wrapperStyle={{
                        fontSize: "11px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="dashboard-panel inventory-table-panel">
            <div className="inventory-table-heading">
              <div className="panel-heading">
                <h3>Inventory Status</h3>

                <p>
                  Products requiring attention
                </p>
              </div>

              <button
                type="button"
                className="inventory-view-button"
              >
                View All Inventory
              </button>
            </div>

            <div className="inventory-table-wrapper">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Reorder Level</th>
                    <th>Inventory Value</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.sku}>
                      <td className="inventory-sku">
                        {item.sku}
                      </td>

                      <td className="inventory-product">
                        {item.product}
                      </td>

                      <td>
                        {item.category}
                      </td>

                      <td>
                        {item.stock}
                      </td>

                      <td>
                        {item.reorder}
                      </td>

                      <td className="inventory-value">
                        {item.value}
                      </td>

                      <td>
                        <span
                          className={
                            item.status === "Healthy"
                              ? "inventory-status status-healthy"
                              : item.status === "Low Stock"
                              ? "inventory-status status-low"
                              : "inventory-status status-out"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default InventoryDashboard;