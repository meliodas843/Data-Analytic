import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "../../styles/Dashboard.css";

const margin = [
  12,
  18,
  20,
  12,
  20,
  18,
  13,
  16,
  17,
  20,
  11,
  14,
];

const marginData = margin.map(
  (value, index) => ({
    m: `${index + 1}-р`,
    v: value,
  }),
);

const expense = [
  {
    n: "Цалин, НДШ",
    v: 53,
    c: "#19a84e",
    a: "₮3.5bn",
  },
  {
    n: "Ашиглалт",
    v: 20,
    c: "#18a9dc",
    a: "₮1.3bn",
  },
  {
    n: "Засвар",
    v: 5,
    c: "#f39a00",
    a: "₮344M",
  },
  {
    n: "Зээлийн хүү",
    v: 5,
    c: "#e02c2c",
    a: "₮308M",
  },
  {
    n: "Бусад",
    v: 17,
    c: "#7e50ed",
    a: "₮432M",
  },
];

const q = [
  {
    q: "Q1",
    r: 4100,
    e: 3500,
    p: 750,
  },
  {
    q: "Q2",
    r: 5800,
    e: 4600,
    p: 1180,
  },
  {
    q: "Q3",
    r: 6200,
    e: 5200,
    p: 980,
  },
  {
    q: "Q4",
    r: 6800,
    e: 5700,
    p: 1100,
  },
];

const rows = [
  [
    "Тавилга И.Д",
    "₮670M",
    "₮102M",
    "₮568M",
    "▲ 18%",
    "green",
  ],
  [
    "Стрийт",
    "₮116M",
    "₮45M",
    "₮71M",
    "▲ 5%",
    "orange",
  ],
  [
    "Мишээл групп",
    "₮102M",
    "₮38M",
    "₮64M",
    "▼ 12%",
    "red",
  ],
  [
    "МЛС-1",
    "₮38M",
    "₮22M",
    "₮16M",
    "▲ 3%",
    "orange",
  ],
];

function Waterfall() {
  const data = [
    {
      n: "Нийт орлого",
      v: 2190,
      c: "#52b66a",
    },
    {
      n: "НӨАТ (10%)",
      v: 219,
      c: "#4778bd",
    },
    {
      n: "Цэвэр орлого",
      v: 1971,
      c: "#52b66a",
    },
    {
      n: "COGS",
      v: 1060,
      c: "#4778bd",
    },
    {
      n: "Нийт ашиг",
      v: 911,
      c: "#52b66a",
    },
    {
      n: "Үйл ажиллагааны зардал",
      v: 625,
      c: "#4778bd",
    },
    {
      n: "Цэвэр ашиг",
      v: 286,
      c: "#d99b00",
    },
  ];

  return (
    <div style={{ marginTop: 18 }}>
      {data.map((item, index) => (
        <div
          key={item.n}
          style={{
            display: "grid",
            gridTemplateColumns:
              "230px minmax(0, 1fr) 110px",
            alignItems: "center",
            gap: 14,
            margin: "15px 0",
            padding:
              index === 6
                ? "8px 10px"
                : "0",
            background:
              index === 6
                ? "#fff9e7"
                : "transparent",
            borderRadius: 8,
          }}
        >
          <b
            style={{
              fontSize: 13,
              color:
                index === 6
                  ? "#1b2437"
                  : "#667793",
            }}
          >
            {item.n}
          </b>

          <div
            style={{
              height: 20,
              background: "#f3f6f8",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${
                  (item.v / 2190) * 100
                }%`,
                background: item.c,
                borderRadius: 4,
              }}
            />
          </div>

          <b
            className="mono"
            style={{
              textAlign: "right",
              color:
                index === 6
                  ? "#a14a0c"
                  : index === 1 ||
                      index === 3 ||
                      index === 5
                    ? "#1d385e"
                    : "#087936",
            }}
          >
            {index === 1 ||
            index === 3 ||
            index === 5
              ? "-"
              : ""}
            ₮{item.v.toLocaleString()}M
          </b>
        </div>
      ))}
    </div>
  );
}

export default function FinanceDashboard() {
  return (
    <div className="finance-dashboard">
      <section className="dash-card chart-card mb22">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <h3 className="section-title">
            Ашиг, алдагдлын тайлан (P&amp;L)
          </h3>

          <div className="section-sub mono">
            Өмнөх: ₮245M{" "}
            <span className="pill green">
              ▲ 16.7%
            </span>
          </div>
        </div>

        <Waterfall />
      </section>

      <section className="grid-2 mb22">
        <div className="dash-card chart-card">
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              gap: 16,
            }}
          >
            <div>
              <h3 className="section-title">
                Ашгийн маржин — сараар
              </h3>

              <p className="section-sub mono">
                Дундаж: 17.2% | Зорилт:
                15%
              </p>
            </div>

            <span className="pill red">
              ▼ 13.1% одоо
            </span>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={marginData}
              >
                <CartesianGrid
                  strokeDasharray="2 4"
                />

                <XAxis dataKey="m" />

                <YAxis
                  domain={[0, 28]}
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    `${value}%`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#13a34a"
                  strokeWidth={3}
                  dot={(props) => {
                    const {
                      cx,
                      cy,
                      payload,
                    } = props;

                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={
                          payload.v < 15
                            ? "#f5a000"
                            : "#14a34a"
                        }
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card chart-card">
          <h3 className="section-title">
            Зардлын бүтэц
          </h3>

          <p
            className="red"
            style={{
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            ⚠ Цалингийн зардал 12% өссөн
          </p>

          <div style={{ height: 150 }}>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={expense}
                  dataKey="v"
                  nameKey="n"
                  innerRadius={45}
                  outerRadius={67}
                  paddingAngle={2}
                >
                  {expense.map((item) => (
                    <Cell
                      key={item.n}
                      fill={item.c}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {expense.map((item) => (
            <div
              key={item.n}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1fr) 45px 70px",
                gap: 8,
                fontSize: 12,
                marginTop: 8,
              }}
            >
              <span>
                <i
                  style={{
                    display: "inline-block",
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: item.c,
                    marginRight: 8,
                  }}
                />
                {item.n}
              </span>

              <span className="muted">
                {item.v}%
              </span>

              <b>{item.a}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-card chart-card mb22">
        <h3 className="section-title">
          НӨАТ тооцоо
        </h3>

        <div
          className="metric-grid mt22"
          style={{
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
          }}
        >
          <div className="metric-box">
            <div className="title">
              НӨАТ цуглуулсан
            </div>

            <div className="value green">
              ₮219M
            </div>
          </div>

          <div
            className="metric-box"
            style={{
              background: "#f8fafc",
            }}
          >
            <div className="title">
              НӨАТ буцаалт
            </div>

            <div className="value">
              ₮156M
            </div>
          </div>

          <div className="metric-box danger">
            <div className="title">
              Цэвэр НӨАТ төлбөр
            </div>

            <div className="value red">
              ₮63M
            </div>

            <div className="foot red">
              Энэ сар төлөх
            </div>
          </div>
        </div>
      </section>

      <section className="dash-card chart-card mb22">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <h3 className="section-title">
            Улирлын харьцуулалт (2026)
          </h3>

          <span className="section-sub mono">
            *Q3 = 7-р сар л орсон · Q4 =
            таамаглал
          </span>
        </div>

        <div className="chart-wrap">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={q}>
              <CartesianGrid
                strokeDasharray="2 4"
              />

              <XAxis dataKey="q" />

              <YAxis
                tickFormatter={(value) =>
                  `₮${value}M`
                }
              />

              <Tooltip />

              <Bar
                dataKey="r"
                fill="#52b66a"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="e"
                fill="#4978bd"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="p"
                fill="#d9a142"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="dash-card table-card">
        <div className="table-title-row">
          <h3 className="section-title">
            Салбарын гүйцэтгэл
          </h3>

          <span className="section-sub">
            Багаас дарж эрэмбэлэх
          </span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Салбар</th>
              <th className="right">
                Орлого
              </th>
              <th className="right">
                Зардал
              </th>
              <th className="right">
                Ашиг ↓
              </th>
              <th className="right">
                Өөрчлөлт
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                <td>
                  <b>{row[0]}</b>
                </td>

                <td className="right mono">
                  {row[1]}
                </td>

                <td className="right mono muted">
                  {row[2]}
                </td>

                <td className="right mono green">
                  <b>{row[3]}</b>
                </td>

                <td
                  className={`right mono ${row[5]}`}
                >
                  <b>{row[4]}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}