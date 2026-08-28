import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "../../styles/Dashboard.css";

const trend = [
  5300,
  5450,
  5100,
  4950,
  4750,
  4830,
  4500,
  4380,
  4100,
  3800,
  3450,
  3100,
].map((ar, i) => ({
  m: `${i + 1}-р`,
  ar,
  ap: [
    980,
    1050,
    920,
    860,
    820,
    800,
    690,
    650,
    720,
    850,
    1050,
    760,
  ][i],
}));

const aging = [
  {
    n: "0-30",
    ar: 180,
    ap: 320,
  },
  {
    n: "31-60",
    ar: 360,
    ap: 55,
  },
  {
    n: "61-90",
    ar: 135,
    ap: 18,
  },
  {
    n: "90+",
    ar: 3800,
    ap: 12,
  },
];

const invoices = [
  [
    "ТИД Түрээс",
    "INV-2024-0841",
    "2026-04-10",
    "2026-05-10",
    "₮2,912M",
    "—",
    "₮2.91bn",
    "120+",
    "Хэтэрсэн",
  ],
  [
    "Менежмент ХХК",
    "INV-2024-0879",
    "2026-05-01",
    "2026-05-31",
    "₮751M",
    "—",
    "₮751M",
    "90",
    "Хэтэрсэн",
  ],
  [
    "Цахилгаан ХК",
    "INV-2024-0902",
    "2026-05-18",
    "2026-06-18",
    "₮290M",
    "₮54M",
    "₮236M",
    "60",
    "Хоцрогдол",
  ],
  [
    "Хоол сервис",
    "INV-2024-0918",
    "2026-06-05",
    "2026-07-05",
    "₮209M",
    "—",
    "₮209M",
    "45",
    "Хоцрогдол",
  ],
  [
    "Харуул хамгаалалт",
    "INV-2024-0921",
    "2026-05-12",
    "2026-06-12",
    "₮210M",
    "₮10M",
    "₮200M",
    "92",
    "Хэтэрсэн",
  ],
  [
    "Дулааны хангамж",
    "INV-2024-0935",
    "2026-06-15",
    "2026-07-15",
    "₮142M",
    "—",
    "₮142M",
    "75",
    "Хоцрогдол",
  ],
  [
    "Авто засвар",
    "INV-2024-0948",
    "2026-07-05",
    "2026-08-05",
    "₮110M",
    "₮12M",
    "₮98M",
    "30",
    "Хэвийн",
  ],
  [
    "Тээвэр ХХ",
    "INV-2024-0955",
    "2026-06-20",
    "2026-07-20",
    "₮87M",
    "—",
    "₮87M",
    "55",
    "Хоцрогдол",
  ],
  [
    "Барилга групп",
    "INV-2024-0961",
    "2026-07-12",
    "2026-08-12",
    "₮88M",
    "₮24M",
    "₮64M",
    "20",
    "Хэвийн",
  ],
  [
    "Бусад ХХК",
    "INV-2024-0967",
    "2026-07-18",
    "2026-08-18",
    "₮51M",
    "—",
    "₮51M",
    "15",
    "Хэвийн",
  ],
];

export default function ArApDashboard() {
  return (
    <div className="arap-dashboard">
      <section
        className="kpi-grid mb22"
        style={{
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
        }}
      >
        <div
          className="kpi-card"
          style={{
            background: "#fff5f5",
            borderColor: "#ffb2b2",
          }}
        >
          <div className="kpi-label">
            НИЙТ АВЛАГА (AR)
          </div>

          <div className="kpi-value">
            ₮4.8bn
          </div>

          <div className="kpi-delta red">
            81% хэтэрсэн
          </div>
        </div>

        <div
          className="kpi-card"
          style={{
            background: "#f2fcfa",
            borderColor: "#8bded3",
          }}
        >
          <div className="kpi-label">
            НИЙТ ӨГЛӨГ (AP)
          </div>

          <div className="kpi-value">
            ₮420M
          </div>

          <div className="kpi-delta green">
            ₮104M 7 хоногт
          </div>
        </div>

        <div
          className="kpi-card"
          style={{
            background: "#f2fcfa",
            borderColor: "#8bded3",
          }}
        >
          <div className="kpi-label">
            ЦЭВЭР БАЙР СУУРЬ (AR−AP)
          </div>

          <div className="kpi-value">
            ₮4.33bn
          </div>

          <div className="kpi-delta green">
            Компани авлагатай
          </div>
        </div>
      </section>

      <section className="grid-2 mb22">
        <div className="dash-card chart-card">
          <h3 className="section-title">
            AR ба AP — сарын trend
          </h3>

          <p className="section-sub mono">
            Авлага буурч, өглөг тогтвортой
            байна
          </p>

          <div className="chart-wrap">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={trend}>
                <CartesianGrid
                  strokeDasharray="2 4"
                />

                <XAxis dataKey="m" />

                <YAxis
                  tickFormatter={(value) =>
                    `₮${value}M`
                  }
                />

                <Tooltip />

                <Line
                  dataKey="ar"
                  stroke="#e32b2b"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#e32b2b",
                  }}
                />

                <Line
                  dataKey="ap"
                  stroke="#0da33e"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#0da33e",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card chart-card">
          <h3 className="section-title">
            DSO / DPO хэмжүүр
          </h3>

          {[
            [
              "DSO (Авлагын хоног)",
              74,
              "74 хоног",
              "45 хоног",
              "#ef5350",
            ],
            [
              "DPO (Өглөгийн хоног)",
              62,
              "28 хоног",
              "30 хоног",
              "#4caf63",
            ],
            [
              "Цуглуулалтын хувь",
              78,
              "23.3 %",
              "20 %",
              "#4caf63",
            ],
            [
              "AR эргэлт (жилд)",
              41,
              "4.9 удаа",
              "8 удаа",
              "#ef5350",
            ],
          ].map((item) => (
            <div
              className="progress-row"
              key={item[0]}
            >
              <div className="progress-head">
                <span>{item[0]}</span>

                <b
                  style={{
                    color: item[4],
                  }}
                >
                  {item[2]}
                </b>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${item[1]}%`,
                    background: item[4],
                  }}
                />
              </div>

              <div className="section-sub mono">
                Зорилт: {item[3]}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="grid-2 mb22"
        style={{
          gridTemplateColumns:
            "minmax(0, 1fr) minmax(0, 1.45fr)",
        }}
      >
        <div className="dash-card chart-card">
          <h3 className="section-title">
            Насжилтын тойм
          </h3>

          <div className="chart-wrap">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={aging}>
                <CartesianGrid
                  strokeDasharray="2 4"
                />

                <XAxis dataKey="n" />

                <YAxis
                  tickFormatter={(value) =>
                    `₮${value}M`
                  }
                />

                <Tooltip />

                <Bar
                  dataKey="ar"
                  fill="#e63f3f"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="ap"
                  fill="#3dae64"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="legend-row">
            <span>
              <i
                className="legend-dot"
                style={{
                  background: "#e63f3f",
                }}
              />
              AR авлага
            </span>

            <span>
              <i
                className="legend-dot"
                style={{
                  background: "#3dae64",
                }}
              />
              AP өглөг
            </span>
          </div>
        </div>

        <div className="dash-card chart-card">
          <h3 className="section-title">
            Хугацааны анализ
          </h3>

          {[
            [
              "AR хугацаандаа",
              4,
              "₮213M",
              "#4caf63",
            ],
            [
              "AR 90+ хоногийн",
              85,
              "₮3.9bn",
              "#e85151",
            ],
            [
              "AP яаралтай (7 хоног)",
              25,
              "₮104M",
              "#dda33e",
            ],
            [
              "AP хэтэрсэн",
              7,
              "₮28M",
              "#ff8840",
            ],
          ].map((item) => (
            <div
              key={item[0]}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "180px minmax(0, 1fr) 42px 80px",
                gap: 12,
                alignItems: "center",
                marginTop: 18,
                fontSize: 13,
              }}
            >
              <span>{item[0]}</span>

              <div
                className="progress-track"
                style={{ margin: 0 }}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${item[1]}%`,
                    background: item[3],
                  }}
                />
              </div>

              <b
                style={{
                  color: item[3],
                }}
              >
                {item[1]}%
              </b>

              <span className="right mono">
                {item[2]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-card table-card">
        <div className="table-title-row">
          <div>
            <span
              className="pill"
              style={{
                background: "#eef2f7",
                marginRight: 8,
              }}
            >
              📥 Авлага (AR)
            </span>

            <span
              className="pill"
              style={{
                background: "#eef2f7",
                color: "#8ca1bd",
              }}
            >
              📤 Өглөг (AP)
            </span>
          </div>

          <span className="section-sub mono">
            10 нэхэмжлэх | ₮4.75bn
          </span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Харилцагч</th>
              <th>Нэхэмжлэх №</th>
              <th>Нэхэмжилсэн огноо</th>
              <th>Дуусах огноо</th>
              <th className="right">
                Нийт дүн
              </th>
              <th className="right">
                Төлсөн
              </th>
              <th className="right">
                Үлдэгдэл
              </th>
              <th className="right">
                Хоног
              </th>
              <th className="right">
                Статус
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((row) => {
              const statusClass =
                row[8] === "Хэвийн"
                  ? "status-ok"
                  : row[8] === "Хоцрогдол"
                    ? "status-warn"
                    : "status-bad";

              const colorClass =
                row[8] === "Хэвийн"
                  ? "green"
                  : row[8] === "Хоцрогдол"
                    ? "orange"
                    : "red";

              return (
                <tr key={row[1]}>
                  <td>
                    <b>{row[0]}</b>
                  </td>

                  <td className="mono muted">
                    {row[1]}
                  </td>

                  <td className="mono muted">
                    {row[2]}
                  </td>

                  <td className="mono muted">
                    {row[3]}
                  </td>

                  <td className="right mono">
                    <b>{row[4]}</b>
                  </td>

                  <td className="right mono muted">
                    {row[5]}
                  </td>

                  <td
                    className={`right mono ${colorClass}`}
                  >
                    <b>{row[6]}</b>
                  </td>

                  <td className="right">
                    <span
                      className={`status-badge ${statusClass}`}
                    >
                      {row[7]}
                    </span>
                  </td>

                  <td className="right">
                    <span
                      className={`status-badge ${statusClass}`}
                    >
                      {row[8]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4">
                <b>
                  Нийт (10 нэхэмжлэх)
                </b>
              </td>

              <td className="right mono">
                <b>₮4,850M</b>
              </td>

              <td className="right mono">
                <b>₮100M</b>
              </td>

              <td className="right mono red">
                <b>₮4.75bn</b>
              </td>

              <td />

              <td />
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}