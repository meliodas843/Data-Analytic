import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "../../styles/Dashboard.css";

const cash = [
  1950,
  1700,
  1500,
  1370,
  1510,
  1300,
  1100,
  650,
  210,
  -290,
  -590,
  -180,
].map((value, index) => ({
  m: `${index + 1}-р`,
  v: value,
}));

export default function InventoryDashboard() {
  return (
    <div className="inventory-dashboard">
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
            🏦 МӨНГӨН ҮЛДЭГДЭЛ
          </div>

          <div className="kpi-value">
            ₮1.1bn
          </div>

          <div className="kpi-prev">
            ₮1.3bn өмнөх жил
          </div>

          <div className="kpi-delta red">
            ▼ 15.4% &nbsp; -₮200M
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
            📥 ОРЛОГО (МӨНГӨӨР)
          </div>

          <div className="kpi-value">
            ₮890M
          </div>

          <div className="kpi-prev">
            ₮720M өмнөх жил
          </div>

          <div className="kpi-delta green">
            ▲ 23.6% &nbsp; +₮170M
          </div>
        </div>

        <div
          className="kpi-card"
          style={{
            background: "#fff5f5",
            borderColor: "#ffb2b2",
          }}
        >
          <div className="kpi-label">
            📤 ЗАРЛАГА (МӨНГӨӨР)
          </div>

          <div className="kpi-value">
            ₮1.19bn
          </div>

          <div className="kpi-prev">
            ₮980M өмнөх жил
          </div>

          <div className="kpi-delta red">
            ▲ 21.4% &nbsp; +₮210M
          </div>
        </div>
      </section>

      <section
        className="grid-2 mb22"
        style={{
          gridTemplateColumns:
            "minmax(0, 1fr) minmax(0, 1.7fr)",
        }}
      >
        <div className="dash-card chart-card">
          <h3 className="section-title">
            Мөнгөн нөөц — runway
          </h3>

          <p className="section-sub mono">
            Одоогийн trend-ээр хэдэн сар
            хүрэлцэх
          </p>

          <div
            style={{
              height: 220,
              display: "grid",
              placeItems: "center",
              position: "relative",
            }}
          >
            <svg
              viewBox="0 0 260 150"
              style={{
                width: "100%",
                maxWidth: 260,
              }}
            >
              <path
                d="M35 130 A95 95 0 0 1 225 130"
                fill="none"
                stroke="#d8f8e8"
                strokeWidth="20"
                strokeLinecap="round"
              />

              <path
                d="M35 130 A95 95 0 0 1 95 43"
                fill="none"
                stroke="#f2b500"
                strokeWidth="20"
                strokeLinecap="round"
              />

              <circle
                cx="93"
                cy="45"
                r="8"
                fill="#f2b500"
                stroke="#fff"
                strokeWidth="3"
              />
            </svg>

            <div
              style={{
                position: "absolute",
                top: 92,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#e9a900",
                }}
              >
                3
              </div>

              <div className="muted">
                сар
              </div>
            </div>
          </div>

          <div
            className="legend-row"
            style={{
              justifyContent: "center",
            }}
          >
            <span>
              <i
                className="legend-dot"
                style={{
                  background: "#19b858",
                }}
              />
              6+ сар
            </span>

            <span>
              <i
                className="legend-dot"
                style={{
                  background: "#f2b500",
                }}
              />
              3–6 сар
            </span>

            <span>
              <i
                className="legend-dot"
                style={{
                  background: "#f14545",
                }}
              />
              &lt;3 сар
            </span>
          </div>

          <div
            className="callout"
            style={{
              borderColor: "#f3cf4e",
              background: "#fffbe9",
              color: "#b86c00",
              textAlign: "center",
            }}
          >
            ⚠ Одоогоор 3 сарын нөөц үлдсэн
          </div>
        </div>

        <div className="dash-card chart-card">
          <h3 className="section-title">
            Үйл ажиллагааны ангиллаар
          </h3>

          <p className="section-sub mono">
            Тухайн сарын мөнгөн урсгал
          </p>

          {[
            [
              "Үндсэн",
              88,
              "₮-2,242M",
              "Өмнөх: ₮-1,810M",
            ],
            [
              "Санхүүжилт",
              1,
              "₮-23M",
              "Өмнөх: ₮-45M",
            ],
            [
              "Хөрөнгө",
              0.5,
              "₮-3M",
              "Өмнөх: ₮-5M",
            ],
          ].map((item, index) => (
            <div
              key={item[0]}
              style={{
                marginTop: 22,
              }}
            >
              <div className="progress-head">
                <b>{item[0]}</b>

                <b className="red mono">
                  {item[2]}
                </b>
              </div>

              <div
                className="progress-track"
                style={{
                  height: 13,
                }}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${item[1]}%`,
                    background:
                      index === 0
                        ? "#e95a58"
                        : "#9cb0cd",
                  }}
                />
              </div>

              <div className="section-sub mono right">
                {item[3]}
              </div>
            </div>
          ))}

          <div className="callout">
            ⚠ Үндсэн үйл ажиллагааны
            зарлага 24% өссөн
          </div>
        </div>
      </section>

      <section className="dash-card chart-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <h3 className="section-title">
              Мөнгөн үлдэгдэл — trend ба
              таамаглал
            </h3>

            <p className="section-sub mono">
              — Бодит &nbsp; – – Таамаглал
              &nbsp; | Улаан шугам = тэг
            </p>
          </div>

          <span className="pill yellow">
            10-р сард -₮290M
          </span>
        </div>

        <div
          style={{
            height: 330,
            marginTop: 15,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={cash}>
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
                dataKey="v"
                stroke="#0fa344"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}