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

const collection = [
  70,
  12,
  15,
  9,
  11,
  16,
  23,
  19,
  25,
  28,
  32,
  45,
].map((value, index) => ({
  m: `${index + 1}-р`,
  v: value,
}));

const age = [
  {
    n: "1-30 хоног",
    v: 4,
    a: "₮180M",
    c: "#1db954",
  },
  {
    n: "31-60 хоног",
    v: 8,
    a: "₮360M",
    c: "#f4b000",
  },
  {
    n: "61-90 хоног",
    v: 3,
    a: "₮135M",
    c: "#ff7610",
  },
  {
    n: "90+ хоног",
    v: 85,
    a: "₮3.8bn",
    c: "#f33c3c",
  },
];

const branches = [
  {
    n: "Тавилга И...",
    r: 670,
    p: 568,
  },
  {
    n: "Стрийт",
    r: 116,
    p: 71,
  },
  {
    n: "Мишээл гр...",
    r: 102,
    p: 64,
  },
  {
    n: "Авто цент...",
    r: 24,
    p: 0,
  },
  {
    n: "МЛС-1",
    r: 38,
    p: 16,
  },
  {
    n: "Катеринг",
    r: 32,
    p: 4,
  },
  {
    n: "Бусад",
    r: 28,
    p: 13,
  },
];

const customers = [
  [
    "ТИД Түрээс",
    "₮2.9bn",
    "120+",
    "₮2.9bn",
    "▲ 2.2%",
    "☎",
  ],
  [
    "Менежмент ХХК",
    "₮751M",
    "90",
    "₮680M",
    "▲ 10.4%",
    "☎",
  ],
  [
    "Цахилгаан ХК",
    "₮236M",
    "60",
    "₮290M",
    "▼ 18.6%",
    "✓",
  ],
  [
    "Хоол сервис",
    "₮209M",
    "45",
    "₮195M",
    "▲ 7.2%",
    "☎",
  ],
  [
    "Харуул хамгаалалт",
    "₮200M",
    "92",
    "₮210M",
    "▼ 4.8%",
    "✓",
  ],
  [
    "Дулааны хангамж",
    "₮142M",
    "75",
    "₮118M",
    "▲ 20.3%",
    "⚠",
  ],
  [
    "Авто засвар",
    "₮98M",
    "30",
    "₮110M",
    "▼ 10.9%",
    "✓",
  ],
  [
    "Тээвэр ХХ",
    "₮87M",
    "55",
    "₮72M",
    "▲ 20.8%",
    "☎",
  ],
  [
    "Барилга групп",
    "₮64M",
    "20",
    "₮88M",
    "▼ 27.3%",
    "✓",
  ],
  [
    "Бусад ХХК",
    "₮51M",
    "15",
    "₮45M",
    "▲ 13.3%",
    "✓",
  ],
];

function Stat({
  title,
  value,
  prev,
  delta,
  bad = false,
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">
        {title}
      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div className="kpi-prev">
        {prev}
      </div>

      <div
        className={`kpi-delta ${
          bad ? "red" : "green"
        }`}
      >
        {delta}
      </div>
    </div>
  );
}

export default function SalesDashboard() {
  return (
    <div className="sales-dashboard">
      <section
        className="kpi-grid mb22"
        style={{
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
        }}
      >
        <Stat
          title="💰 НИЙТ БОРЛУУЛАЛТ"
          value="₮2.19bn"
          prev="₮1.79bn өмнөх жил"
          delta="+₮400M"
        />

        <Stat
          title="📄 НЭХЭМЖЛЭХ ТОО"
          value="847"
          prev="712 өмнөх жил"
          delta="+135 ширхэг"
        />

        <Stat
          title="✅ ЦУГЛУУЛАЛТ %"
          value="23.3%"
          prev="16.5% өмнөх жил"
          delta="+6.8 нэгж"
        />

        <Stat
          title="⚠ ХУГАЦАА ХЭТЭРСЭН"
          value="₮3.8bn"
          prev="₮4.1bn өмнөх жил"
          delta="-₮300M"
        />
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
                Авлага цуглуулалтын хувь
              </h3>

              <p className="section-sub mono">
                Зорилт: 20% | Ногоон =
                биелсэн, улаан = биелээгүй
              </p>
            </div>

            <span className="pill green">
              23.3% ✓
            </span>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={collection}
              >
                <CartesianGrid
                  strokeDasharray="2 4"
                />

                <XAxis dataKey="m" />

                <YAxis
                  domain={[0, 80]}
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                />

                <Tooltip />

                <Line
                  dataKey="v"
                  stroke="#14a34a"
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
                          payload.v >= 20
                            ? "#13a34a"
                            : "#e94242"
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
            Авлагын насжилт
          </h3>

          <div style={{ height: 150 }}>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={age}
                  dataKey="v"
                  innerRadius={46}
                  outerRadius={68}
                  paddingAngle={2}
                >
                  {age.map((item) => (
                    <Cell
                      key={item.n}
                      fill={item.c}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {age.map((item) => (
            <div
              key={item.n}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1fr) 40px 70px",
                gap: 8,
                padding:
                  item.v === 85
                    ? "9px"
                    : "6px 0",
                background:
                  item.v === 85
                    ? "#fff1f1"
                    : "transparent",
                borderRadius: 7,
                fontSize: 12,
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

          <div className="callout">
            ⚠ 90+ хоногийн авлага нийт-ийн
            85%
          </div>
        </div>
      </section>

      <section className="dash-card chart-card mb22">
        <h3 className="section-title">
          Салбарын борлуулалт — орлого ба
          ашиг
        </h3>

        <p className="section-sub mono">
          Авто центр алдагдалтай тул ашиг =
          0 харуулав
        </p>

        <div
          style={{
            height: 340,
            marginTop: 12,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={branches}
              layout="vertical"
              margin={{
                left: 50,
                right: 30,
              }}
            >
              <CartesianGrid
                strokeDasharray="2 4"
              />

              <XAxis
                type="number"
                tickFormatter={(value) =>
                  `₮${value}M`
                }
              />

              <YAxis
                type="category"
                dataKey="n"
                width={90}
              />

              <Tooltip />

              <Bar
                dataKey="r"
                fill="#53b86d"
                radius={[0, 4, 4, 0]}
              />

              <Bar
                dataKey="p"
                fill="#daa242"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="dash-card chart-card mb22">
        <h3 className="section-title">
          Нэхэмжлэхийн статус
        </h3>

        <div className="metric-grid mt22">
          <div className="metric-box">
            <div className="title">
              🟢 Төлөгдсөн
            </div>

            <div className="value">
              421
            </div>

            <div className="foot green">
              ₮890M
            </div>
          </div>

          <div
            className="metric-box"
            style={{
              background: "#f0f8ff",
              borderColor: "#a9d8ff",
            }}
          >
            <div className="title">
              🔵 Хугацаандаа
            </div>

            <div className="value">
              198
            </div>

            <div
              className="foot"
              style={{
                color: "#13a7e2",
              }}
            >
              ₮620M
            </div>
          </div>

          <div className="metric-box warn">
            <div className="title">
              🟠 Ойрхон хугацаа
            </div>

            <div className="value">
              112
            </div>

            <div className="foot orange">
              ₮380M
            </div>
          </div>

          <div className="metric-box danger">
            <div className="title">
              🔴 Хэтэрсэн
            </div>

            <div className="value">
              116
            </div>

            <div className="foot red">
              ₮2300M
            </div>
          </div>
        </div>
      </section>

      <section className="dash-card table-card">
        <div className="table-title-row">
          <h3 className="section-title">
            Хамгийн их авлагатай
            харилцагчид (Топ 10)
          </h3>

          <span className="pill red">
            Нийт: ₮4.5bn
          </span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Харилцагч</th>
              <th className="right">
                Авлага
              </th>
              <th className="right">
                Хоног
              </th>
              <th className="right">
                Өмнөх сар
              </th>
              <th className="right">
                Trend
              </th>
              <th className="right">
                Арга
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map(
              (row, index) => {
                const days = Number(
                  row[2].replace("+", ""),
                );

                const dayStatus =
                  days > 89
                    ? "status-bad"
                    : days > 30
                      ? "status-warn"
                      : "status-ok";

                return (
                  <tr key={row[0]}>
                    <td className="muted">
                      {index + 1}
                    </td>

                    <td>
                      <b>{row[0]}</b>
                    </td>

                    <td className="right mono">
                      <b>{row[1]}</b>
                    </td>

                    <td className="right">
                      <span
                        className={`status-badge ${dayStatus}`}
                      >
                        {row[2]}
                      </span>
                    </td>

                    <td className="right mono muted">
                      {row[3]}
                    </td>

                    <td
                      className={`right mono ${
                        row[4].startsWith(
                          "▲",
                        )
                          ? "red"
                          : "green"
                      }`}
                    >
                      <b>{row[4]}</b>
                    </td>

                    <td className="right">
                      {row[5]}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}