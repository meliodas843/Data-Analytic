import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/Dashboard.css";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";


const revenueTrendData = [
  { month: "7-р", revenue: 570 },
  { month: "8-р", revenue: 600 },
  { month: "9-р", revenue: 585 },
  { month: "10-р", revenue: 630 },
  { month: "11-р", revenue: 670 },
  { month: "12-р", revenue: 650 },
  { month: "1-р", revenue: 630 },
  { month: "2-р", revenue: 655 },
  { month: "3-р", revenue: 675 },
  { month: "4-р", revenue: 700 },
  { month: "5-р", revenue: 725 },
  { month: "6-р", revenue: 705 },
  { month: "7-р", revenue: 735 },
];


const profitBreakdownData = [
  {
    name: "Орлого",
    value: 748,
    color: "#16a34a",
  },
  {
    name: "Борлуулалтын өртөг",
    value: 318,
    color: "#e52424",
  },
  {
    name: "Үйл ажиллагааны зардал",
    value: 188,
    color: "#e52424",
  },
  {
    name: "Цэвэр ашиг",
    value: 242,
    color: "#2ec9ba",
  },
];


const branchData = [
  {
    name: "Төв салбар",
    value: 285,
  },
  {
    name: "Дархан",
    value: 198,
  },
  {
    name: "Эрдэнэт",
    value: 158,
  },
  {
    name: "Чойбалсан",
    value: 92,
  },
  {
    name: "Өмнөговь",
    value: 61,
  },
];


const topCustomers = [
  {
    name: "Мишээл Групп",
    amount: "₮124 сая",
    percent: "32.5%",
  },
  {
    name: "Монголын Үндэсний",
    amount: "₮98 сая",
    percent: "25.7%",
  },
  {
    name: "Ази Фарм ХХК",
    amount: "₮74 сая",
    percent: "19.4%",
  },
  {
    name: "Говь Трейд",
    amount: "₮52 сая",
    percent: "13.6%",
  },
  {
    name: "Эрдмин ХХК",
    amount: "₮38 сая",
    percent: "9.8%",
  },
  {
    name: "Нарантуул Корп",
    amount: "₮22 сая",
    percent: "5.7%",
  },
];


const topProducts = [
  {
    name: "А бүтээгдэхүүн",
    quantity: "1,240",
    amount: "₮186 сая",
  },
  {
    name: "Б бүтээгдэхүүн",
    quantity: "980",
    amount: "₮147 сая",
  },
  {
    name: "В бүтээгдэхүүн",
    quantity: "742",
    amount: "₮111 сая",
  },
  {
    name: "Г бүтээгдэхүүн",
    quantity: "621",
    amount: "₮93 сая",
  },
  {
    name: "Д бүтээгдэхүүн",
    quantity: "398",
    amount: "₮60 сая",
  },
  {
    name: "Е бүтээгдэхүүн",
    quantity: "287",
    amount: "₮43 сая",
  },
];


const financialRows = [
  {
    label: "Орлого",
    current: "₮748 сая",
    previous: "₮665 сая",
    change: "+12.5%",
    type: "positive",
  },
  {
    label: "Борлуулалтын өртөг",
    current: "₮318 сая",
    previous: "₮286 сая",
    change: "+11.2%",
    type: "negative",
    indent: true,
  },
  {
    label: "Нийт ашиг",
    current: "₮430 сая",
    previous: "₮379 сая",
    change: "+13.5%",
    type: "positive",
  },
  {
    label: "Үйл ажиллагааны зардал",
    current: "₮188 сая",
    previous: "₮171 сая",
    change: "+9.9%",
    type: "negative",
    indent: true,
  },
  {
    label: "Цэвэр ашиг",
    current: "₮242 сая",
    previous: "₮208 сая",
    change: "+16.3%",
    type: "positive",
  },
];


const expenseData = [
  {
    name: "Цалин",
    value: 42,
    color: "#2ec9ba",
  },
  {
    name: "Түрээс",
    value: 18,
    color: "#7c83f5",
  },
  {
    name: "Маркетинг",
    value: 15,
    color: "#f59e0b",
  },
  {
    name: "Тээвэр",
    value: 14,
    color: "#f97316",
  },
  {
    name: "Бусад",
    value: 11,
    color: "#94a3b8",
  },
];


const budgetData = [
  {
    name: "Цалин",
    actual: 82,
    budget: 85,
  },
  {
    name: "Түрээс",
    actual: 35,
    budget: 30,
  },
  {
    name: "Тээвэр",
    actual: 28,
    budget: 32,
  },
  {
    name: "Маркетинг",
    actual: 26,
    budget: 24,
  },
  {
    name: "Бусад",
    actual: 21,
    budget: 22,
  },
];


const cashFlowData = [
  {
    month: "8-р",
    income: 605,
    expense: 525,
    balance: 82,
  },
  {
    month: "9-р",
    income: 585,
    expense: 500,
    balance: 95,
  },
  {
    month: "10-р",
    income: 625,
    expense: 575,
    balance: 108,
  },
  {
    month: "11-р",
    income: 670,
    expense: 595,
    balance: 125,
  },
  {
    month: "12-р",
    income: 655,
    expense: 570,
    balance: 112,
  },
  {
    month: "1-р",
    income: 620,
    expense: 550,
    balance: 98,
  },
  {
    month: "2-р",
    income: 655,
    expense: 565,
    balance: 118,
  },
  {
    month: "3-р",
    income: 680,
    expense: 585,
    balance: 129,
  },
  {
    month: "4-р",
    income: 705,
    expense: 602,
    balance: 133,
  },
  {
    month: "5-р",
    income: 720,
    expense: 590,
    balance: 120,
  },
  {
    month: "6-р",
    income: 700,
    expense: 615,
    balance: 103,
  },
  {
    month: "7-р",
    income: 730,
    expense: 625,
    balance: 95,
  },
];


const agingData = [
  {
    month: "2-р",
    current: 95,
    days30: 45,
    days60: 12,
    days90: 5,
  },
  {
    month: "3-р",
    current: 102,
    days30: 38,
    days60: 14,
    days90: 6,
  },
  {
    month: "4-р",
    current: 118,
    days30: 52,
    days60: 18,
    days90: 8,
  },
  {
    month: "5-р",
    current: 125,
    days30: 47,
    days60: 22,
    days90: 9,
  },
  {
    month: "6-р",
    current: 110,
    days30: 42,
    days60: 24,
    days90: 11,
  },
  {
    month: "7-р",
    current: 128,
    days30: 48,
    days60: 26,
    days90: 14,
  },
];


const upcomingPayables = [
  {
    supplier: "Монголын Нийлүүлэгч ХХК",
    amount: "₮48 сая",
    date: "2026-08-08",
    overdue: true,
  },
  {
    supplier: "Глобал Трейд ХХК",
    amount: "₮32 сая",
    date: "2026-08-14",
  },
  {
    supplier: "Ази Логистик",
    amount: "₮27 сая",
    date: "2026-08-17",
  },
  {
    supplier: "Дархан Постач",
    amount: "₮21 сая",
    date: "2026-08-22",
  },
  {
    supplier: "Монгол Пэйнер ХХК",
    amount: "₮18 сая",
    date: "2026-08-25",
  },
  {
    supplier: "Эрдэнэт Тоног ХХК",
    amount: "₮14 сая",
    date: "2026-08-31",
  },
  {
    supplier: "Говь Кемикал",
    amount: "₮9 сая",
    date: "2026-09-05",
  },
];


function Dashboard() {
  const [overviewKpis, setOverviewKpis] = useState({
    revenue: 0,
    expense: 0,
    receivable: 0,
    payable: 0,
  });

  const [overviewKpisLoading, setOverviewKpisLoading] = useState(true);
  const [overviewKpisError, setOverviewKpisError] = useState("");
  const [language, setLanguage] =
    useState("MN");

  const [activeTab, setActiveTab] =
    useState("overview");

  const [period, setPeriod] =
    useState("month");

  const [branch, setBranch] =
    useState("all");

  const [customDate, setCustomDate] =
    useState({
      start: "",
      end: "",
    });

  useEffect(() => {
    const loadOverviewKpis = async () => {
      try {
        setOverviewKpisLoading(true);
        setOverviewKpisError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/dashboard/overview-kpis",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "KPI мэдээлэл авахад алдаа гарлаа."
          );
        }

        setOverviewKpis({
          revenue: Number(data.kpis?.revenue || 0),
          expense: Number(data.kpis?.expense || 0),
          receivable: Number(data.kpis?.receivable || 0),
          payable: Number(data.kpis?.payable || 0),
        });
      } catch (error) {
        console.error("OVERVIEW KPI ERROR:", error);
        setOverviewKpisError(error.message);
      } finally {
        setOverviewKpisLoading(false);
      }
    };

    loadOverviewKpis();
  }, []);

  const formatMoney = (value) => {
    const number = Number(value || 0);
    const absolute = Math.abs(number);

    if (absolute >= 1000000000) {
      return `₮${(number / 1000000000).toFixed(2)} тэрбум`;
    }

    if (absolute >= 1000000) {
      return `₮${(number / 1000000).toFixed(1)} сая`;
    }

    if (absolute >= 1000) {
      return `₮${(number / 1000).toFixed(1)} мянга`;
    }

    return `₮${number.toLocaleString()}`;
  };


  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === "MN"
        ? "EN"
        : "MN"
    );
  };


  const handleDateChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setCustomDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const renderProfitLabel = ({
    x,
    y,
    width,
    value,
    index,
  }) => {
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        textAnchor="middle"
        fill={
          profitBreakdownData[index]
            ?.color || "#17233c"
        }
        fontSize="12"
        fontWeight="700"
      >
        ₮{value} сая
      </text>
    );
  };


  const renderPeriodControls = () => (
    <div className="overview-toolbar-right">

      <div className="overview-period-tabs">

        <button
          type="button"
          className={`overview-period ${
            period === "month"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setPeriod("month")
          }
        >
          Энэ сар
        </button>


        <button
          type="button"
          className={`overview-period ${
            period === "quarter"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setPeriod("quarter")
          }
        >
          Энэ улирал
        </button>


        <button
          type="button"
          className={`overview-period ${
            period === "year"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setPeriod("year")
          }
        >
          Энэ жил
        </button>


        <button
          type="button"
          className={`overview-period ${
            period === "custom"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setPeriod("custom")
          }
        >
          Өөрөө сонгох
        </button>

      </div>


      {period === "custom" && (
        <div className="overview-custom-dates">

          <input
            type="date"
            name="start"
            value={customDate.start}
            onChange={handleDateChange}
          />

          <span>—</span>

          <input
            type="date"
            name="end"
            value={customDate.end}
            onChange={handleDateChange}
          />

        </div>
      )}


      <select
        className="overview-branch-select"
        value={branch}
        onChange={(e) =>
          setBranch(e.target.value)
        }
      >
        <option value="all">
          Салбар: Бүгд
        </option>

        <option value="center">
          Салбар: Төв
        </option>

        <option value="darkhan">
          Салбар: Дархан
        </option>

        <option value="erdenet">
          Салбар: Эрдэнэт
        </option>

        <option value="choibalsan">
          Салбар: Чойбалсан
        </option>
      </select>

    </div>
  );


  return (
    <div className="dashboard-layout">

      <DashboardNavbar />


      <div className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>
              CEO Dashboard
            </h1>

            <p>
              Company-wide overview &
              strategic KPIs
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

                <span>
                  {language}
                </span>

                <span className="dashboard-language-arrow">
                  ▾
                </span>
            </button>

            <button
              type="button"
              className="dashboard-notification-button"
            >
              🔔
            </button>

            <button
              type="button"
              className="dashboard-theme-button"
            >
              🌙
            </button>

          </div>

        </header>


        <div className="dashboard-content">

          <div className="dashboard-tabs">

            <button
              type="button"
              className={`dashboard-tab ${
                activeTab === "overview"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("overview")
              }
            >
              🏢 Overview
            </button>


            <button
              type="button"
              className={`dashboard-tab performance ${
                activeTab ===
                "performance"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(
                  "performance"
                )
              }
            >
              ⚡ Performance
            </button>


            <button
              type="button"
              className={`dashboard-tab financial ${
                activeTab ===
                "financial"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(
                  "financial"
                )
              }
            >
              💰 Financial Summary
            </button>


            <button
              type="button"
              className={`dashboard-tab goals ${
                activeTab === "goals"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("goals")
              }
            >
              🎯 Strategic Goals
            </button>

          </div>


          {activeTab === "overview" && (
            <>

              <div className="overview-toolbar">
                <h2>
                  Ерөнхий тойм
                </h2>

                {renderPeriodControls()}
              </div>


              <section className="kpi-grid overview-style-kpis">

                <div className="overview-kpi-card">
                  <div className="overview-kpi-title">
                    <span>
                      Орлого
                    </span>
                    <span className="overview-info">
                      i
                    </span>
                  </div>

                  <h2>
                    {overviewKpisLoading
                      ? "..."
                      : formatMoney(overviewKpis.revenue)}
                  </h2>

                  <div className="overview-change positive">
                    Нийт орлого
                  </div>
                </div>


                <div className="overview-kpi-card">
                  <div className="overview-kpi-title">
                    <span>
                      Зардал
                    </span>
                    <span className="overview-info">
                      i
                    </span>
                  </div>

                  <h2>
                    {overviewKpisLoading
                      ? "..."
                      : formatMoney(overviewKpis.expense)}
                  </h2>

                  <div className="overview-change negative">
                    Нийт зардал
                  </div>
                </div>


                <div className="overview-kpi-card">
                  <div className="overview-kpi-title">
                    <span>
                      Авлага
                    </span>
                    <span className="overview-info">
                      i
                    </span>
                  </div>

                  <h2>
                    {overviewKpisLoading
                      ? "..."
                      : formatMoney(overviewKpis.receivable)}
                  </h2>

                  <div className="overview-change positive">
                    Нийт авлага
                  </div>
                </div>


                <div className="overview-kpi-card">
                  <div className="overview-kpi-title">
                    <span>
                      Өглөг
                    </span>
                    <span className="overview-info">
                      i
                    </span>
                  </div>

                  <h2>
                    {overviewKpisLoading
                      ? "..."
                      : formatMoney(overviewKpis.payable)}
                  </h2>

                  <div className="overview-change negative">
                    Нийт өглөг
                  </div>
                </div>

              </section>

              {overviewKpisError && (
                <div className="dashboard-kpi-error">
                  {overviewKpisError}
                </div>
              )}


              <section className="dashboard-panel overview-revenue-panel">

                <div className="panel-heading">
                  <h3>
                    Орлогын хандлага
                    (13 сар)
                  </h3>
                </div>


                <div className="overview-revenue-chart">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart
                      data={
                        revenueTrendData
                      }
                    >
                      <defs>
                        <linearGradient
                          id="dashboardRevenueGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#2ec9ba"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="#2ec9ba"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#e8eef5"
                      />

                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        domain={[0, 800]}
                        ticks={[
                          0,
                          200,
                          400,
                          600,
                          800,
                        ]}
                        tickFormatter={(
                          value
                        ) =>
                          `₮${value} сая`
                        }
                        axisLine={false}
                        tickLine={false}
                        width={82}
                      />

                      <Tooltip
                        formatter={(
                          value
                        ) => [
                          `₮${value} сая`,
                          "Орлого",
                        ]}
                      />

                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2ec9ba"
                        strokeWidth={3}
                        fill="url(#dashboardRevenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                </div>

              </section>


              <section className="dashboard-panel overview-profit-panel">

                <div className="panel-heading">
                  <h3>
                    Ашгийн задаргаа
                  </h3>
                </div>


                <div className="overview-profit-chart">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={
                        profitBreakdownData
                      }
                    >
                      <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#e8eef5"
                      />

                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        domain={[0, 800]}
                        ticks={[
                          0,
                          200,
                          400,
                          600,
                          800,
                        ]}
                        tickFormatter={(
                          value
                        ) =>
                          `₮${value} сая`
                        }
                        axisLine={false}
                        tickLine={false}
                        width={82}
                      />

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        radius={[
                          5,
                          5,
                          0,
                          0,
                        ]}
                        maxBarSize={76}
                      >
                        {profitBreakdownData.map(
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

                        <LabelList
                          dataKey="value"
                          content={
                            renderProfitLabel
                          }
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                </div>

              </section>

            </>
          )}


          {activeTab === "performance" && (
            <>

              <div className="overview-toolbar">
                <h2>
                  Борлуулалт
                </h2>

                {renderPeriodControls()}
              </div>


              <section className="performance-kpi-grid">

                <div className="overview-kpi-card">
                  <div className="overview-kpi-title">
                    <span>
                      Борлуулалт
                    </span>
                    <span className="overview-info">
                      i
                    </span>
                  </div>

                  <h2>
                    ₮790 сая
                  </h2>

                  <div className="overview-change positive">
                    ▲ 14.2% өмнөх сараас
                  </div>
                </div>


                <div className="overview-kpi-card">
                  <div className="overview-kpi-title">
                    <span>
                      Захиалгын тоо
                    </span>
                    <span className="overview-info">
                      i
                    </span>
                  </div>

                  <h2>
                    3,842
                  </h2>

                  <div className="overview-change positive">
                    ▲ 9.6% өмнөх сараас
                  </div>
                </div>


                <div className="overview-kpi-card">
                  <div className="overview-kpi-title">
                    <span>
                      Дундаж захиалга
                    </span>
                    <span className="overview-info">
                      i
                    </span>
                  </div>

                  <h2>
                    ₮206k
                  </h2>

                  <div className="overview-change positive">
                    ▲ 4.2% өмнөх сараас
                  </div>
                </div>

              </section>


              <section className="performance-grid">

                <div className="dashboard-panel performance-branch-panel">

                  <div className="panel-heading">
                    <h3>
                      Салбараар
                    </h3>
                  </div>


                  <div className="performance-branch-chart">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={branchData}
                        layout="vertical"
                      >
                        <CartesianGrid
                          strokeDasharray="4 4"
                          horizontal={false}
                          stroke="#e8eef5"
                        />

                        <XAxis
                          type="number"
                          domain={[
                            0,
                            300,
                          ]}
                          axisLine={false}
                          tickLine={false}
                        />

                        <YAxis
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          width={90}
                        />

                        <Tooltip />

                        <Bar
                          dataKey="value"
                          fill="#2ec9ba"
                          radius={[
                            0,
                            5,
                            5,
                            0,
                          ]}
                          barSize={24}
                        />
                      </BarChart>
                    </ResponsiveContainer>

                  </div>

                </div>


                <div className="performance-side">

                  <div className="dashboard-panel performance-table-panel">

                    <div className="panel-heading">
                      <h3>
                        Топ харилцагч
                      </h3>
                    </div>


                    <div className="performance-table">

                      <div className="performance-table-head">
                        <span>Нэр</span>
                        <span>Дүн</span>
                        <span>
                          Эзлэх %
                        </span>
                      </div>


                      {topCustomers.map(
                        (
                          customer,
                          index
                        ) => (
                          <div
                            className={`performance-table-row ${
                              index === 0
                                ? "highlighted"
                                : ""
                            }`}
                            key={
                              customer.name
                            }
                          >
                            <strong>
                              {
                                customer.name
                              }
                            </strong>

                            <span>
                              {
                                customer.amount
                              }
                            </span>

                            <b>
                              {
                                customer.percent
                              }
                            </b>
                          </div>
                        )
                      )}

                    </div>

                  </div>


                  <div className="dashboard-panel performance-table-panel">

                    <div className="panel-heading">
                      <h3>
                        Топ бүтээгдэхүүн
                      </h3>
                    </div>


                    <div className="performance-table product-table">

                      <div className="performance-table-head">
                        <span>Нэр</span>
                        <span>Тоо</span>
                        <span>Дүн</span>
                      </div>


                      {topProducts.map(
                        (product) => (
                          <div
                            className="performance-table-row"
                            key={
                              product.name
                            }
                          >
                            <strong>
                              {
                                product.name
                              }
                            </strong>

                            <span>
                              {
                                product.quantity
                              }
                            </span>

                            <b>
                              {
                                product.amount
                              }
                            </b>
                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>

              </section>

            </>
          )}


          {activeTab === "financial" && (
            <>

              <div className="overview-toolbar">
                <h2>
                  Санхүү
                </h2>

                {renderPeriodControls()}
              </div>


              <div className="financial-summary-layout">

                <section className="dashboard-panel financial-result-panel">

                  <div className="panel-heading">
                    <h3>
                      Орлого, үр дүн
                    </h3>
                  </div>


                  <div className="financial-result-table">

                    <div className="financial-result-header">
                      <span>
                        Үзүүлэлт
                      </span>
                      <span>
                        Сонгосон үе
                      </span>
                      <span>
                        Өмнөх үе
                      </span>
                      <span>
                        Өөрчлөлт %
                      </span>
                    </div>


                    {financialRows.map(
                      (row) => (
                        <div
                          className="financial-result-row"
                          key={
                            row.label
                          }
                        >
                          <strong
                            className={
                              row.indent
                                ? "financial-indent"
                                : ""
                            }
                          >
                            {
                              row.label
                            }
                          </strong>

                          <b>
                            {
                              row.current
                            }
                          </b>

                          <span>
                            {
                              row.previous
                            }
                          </span>

                          <em
                            className={
                              row.type ===
                              "positive"
                                ? "financial-change-positive"
                                : "financial-change-negative"
                            }
                          >
                            {
                              row.change
                            }
                          </em>
                        </div>
                      )
                    )}

                  </div>

                </section>


                <div className="financial-summary-right">

                  <section className="dashboard-panel financial-expense-structure">

                    <div className="panel-heading">
                      <h3>
                        Зардлын бүтэц
                      </h3>
                    </div>


                    <div className="financial-donut-chart">

                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <PieChart>
                          <Pie
                            data={
                              expenseData
                            }
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="45%"
                            innerRadius={48}
                            outerRadius={78}
                          >
                            {expenseData.map(
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
                          </Pie>

                          <Tooltip />

                          <Legend
                            iconType="square"
                            iconSize={8}
                          />
                        </PieChart>
                      </ResponsiveContainer>

                    </div>

                  </section>


                  <section className="dashboard-panel financial-budget-panel">

                    <div className="panel-heading">
                      <h3>
                        Төсөв ба гүйцэтгэл
                      </h3>
                    </div>


                    <div className="financial-budget-chart">

                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={
                            budgetData
                          }
                        >
                          <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                          />

                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                          />

                          <YAxis
                            axisLine={false}
                            tickLine={false}
                          />

                          <Tooltip />

                          <Bar
                            dataKey="actual"
                            barSize={14}
                          >
                            {budgetData.map(
                              (
                                item,
                                index
                              ) => (
                                <Cell
                                  key={
                                    item.name
                                  }
                                  fill={
                                    index ===
                                      0 ||
                                    index ===
                                      2
                                      ? "#16a34a"
                                      : "#dc2626"
                                  }
                                />
                              )
                            )}
                          </Bar>

                          <Bar
                            dataKey="budget"
                            fill="transparent"
                            stroke="#94a3b8"
                            strokeDasharray="4 3"
                            barSize={14}
                          />
                        </BarChart>
                      </ResponsiveContainer>

                    </div>

                  </section>

                </div>

              </div>

            </>
          )}


          {activeTab === "goals" && (
            <>

              <div className="overview-toolbar">
                <h2>
                  Мөнгөн урсгал ба авлага
                </h2>

                {renderPeriodControls()}
              </div>


              <section className="dashboard-panel strategic-cash-panel">

                <div className="panel-heading">
                  <h3>
                    Мөнгөн урсгал
                    (12 сар)
                  </h3>
                </div>


                <div className="strategic-cash-chart">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <ComposedChart
                      data={
                        cashFlowData
                      }
                      margin={{
                        top: 20,
                        right: 45,
                        bottom: 5,
                        left: 15,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#e7edf4"
                      />

                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill:
                            "#8293ad",
                          fontSize:
                            11,
                        }}
                      />

                      <YAxis
                        yAxisId="left"
                        domain={[
                          0,
                          800,
                        ]}
                        ticks={[
                          0,
                          200,
                          400,
                          600,
                          800,
                        ]}
                        tickFormatter={(
                          value
                        ) =>
                          `₮${value} сая`
                        }
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill:
                            "#8293ad",
                          fontSize:
                            10,
                        }}
                      />

                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[
                          0,
                          140,
                        ]}
                        ticks={[
                          0,
                          35,
                          70,
                          105,
                          140,
                        ]}
                        tickFormatter={(
                          value
                        ) =>
                          `₮${value} сая`
                        }
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill:
                            "#8293ad",
                          fontSize:
                            10,
                        }}
                      />

                      <Tooltip
                        formatter={(
                          value
                        ) =>
                          `₮${value} сая`
                        }
                      />

                      <Bar
                        yAxisId="left"
                        dataKey="income"
                        name="Орлого"
                        fill="#16a34a"
                        barSize={15}
                        radius={[
                          3,
                          3,
                          0,
                          0,
                        ]}
                      />

                      <Bar
                        yAxisId="left"
                        dataKey="expense"
                        name="Зардал"
                        fill="#dc2626"
                        barSize={15}
                        radius={[
                          3,
                          3,
                          0,
                          0,
                        ]}
                      />

                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="balance"
                        name="Үлдэгдэл"
                        stroke="#2ec9ba"
                        strokeWidth={3}
                        dot={{
                          r: 4,
                          fill:
                            "#2ec9ba",
                          strokeWidth:
                            0,
                        }}
                      />

                      <Legend
                        verticalAlign="bottom"
                        iconType="square"
                        iconSize={9}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>

                </div>

              </section>


              <section className="strategic-bottom-grid">

                <div className="dashboard-panel strategic-aging-panel">

                  <div className="panel-heading">
                    <h3>
                      Авлагын насжилт
                    </h3>
                  </div>


                  <div className="strategic-aging-chart">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={
                          agingData
                        }
                        margin={{
                          top: 20,
                          right: 10,
                          bottom: 15,
                          left: 5,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray="4 4"
                          vertical={false}
                          stroke="#e8eef5"
                        />

                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill:
                              "#8293ad",
                            fontSize:
                              10,
                          }}
                        />

                        <YAxis
                          domain={[
                            0,
                            220,
                          ]}
                          ticks={[
                            0,
                            55,
                            110,
                            165,
                            220,
                          ]}
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill:
                              "#8293ad",
                            fontSize:
                              10,
                          }}
                        />

                        <Tooltip />

                        <Bar
                          dataKey="current"
                          name="0-30 хоног"
                          stackId="aging"
                          fill="#16a34a"
                          barSize={28}
                        />

                        <Bar
                          dataKey="days30"
                          name="31-60 хоног"
                          stackId="aging"
                          fill="#f59e0b"
                        />

                        <Bar
                          dataKey="days60"
                          name="61-90 хоног"
                          stackId="aging"
                          fill="#f97316"
                        />

                        <Bar
                          dataKey="days90"
                          name="90+ хоног"
                          stackId="aging"
                          fill="#dc2626"
                          radius={[
                            4,
                            4,
                            0,
                            0,
                          ]}
                        />

                        <Legend
                          verticalAlign="bottom"
                          iconType="square"
                          iconSize={8}
                          wrapperStyle={{
                            fontSize:
                              "10px",
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>

                  </div>

                </div>


                <div className="dashboard-panel strategic-payables-panel">

                  <div className="panel-heading">
                    <h3>
                      Ойрын 30 хоногт
                      төлөх өглөг
                    </h3>
                  </div>


                  <div className="strategic-payables-table">

                    <div className="strategic-payables-head">
                      <span>
                        Нийлүүлэгч
                      </span>
                      <span>
                        Дүн
                      </span>
                      <span>
                        Огноо
                      </span>
                    </div>


                    {upcomingPayables.map(
                      (item) => (
                        <div
                          className={`strategic-payables-row ${
                            item.overdue
                              ? "overdue"
                              : ""
                          }`}
                          key={
                            item.supplier
                          }
                        >
                          <strong>
                            {
                              item.supplier
                            }
                          </strong>

                          <b>
                            {
                              item.amount
                            }
                          </b>

                          <span>
                            {
                              item.date
                            }
                          </span>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </section>

            </>
          )}

        </div>

      </div>

    </div>
  );
}
export default Dashboard; 