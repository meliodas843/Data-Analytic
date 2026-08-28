import {
  Bar,
  ComposedChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "../styles/Dashboard.css";

const monthly = [
  { m: "1-р", income: 1150, expense: 980, profit: 180 },
  { m: "2-р", income: 1450, expense: 1180, profit: 290 },
  { m: "3-р", income: 1620, expense: 1290, profit: 350 },
  { m: "4-р", income: 1380, expense: 1210, profit: 205 },
  { m: "5-р", income: 1800, expense: 1420, profit: 385 },
  { m: "6-р", income: 1850, expense: 1510, profit: 350 },
  { m: "7-р", income: 2200, expense: 1910, profit: 300 },
  { m: "8-р", income: 1950, expense: 1620, profit: 330 },
  { m: "9-р", income: 2100, expense: 1720, profit: 370 },
  { m: "10-р", income: 2250, expense: 1800, profit: 450 },
  { m: "11-р", income: 2120, expense: 1900, profit: 225 },
  { m: "12-р", income: 2450, expense: 2120, profit: 330 },
];

const cards = [
  [
    "📈 НИЙТ ОРЛОГО",
    "₮2.19bn",
    "₮1.79bn өмнөх жил",
    "+₮400M өссөн",
    "▲ 22.2%",
    87,
    "#17a34a",
  ],
  [
    "💵 ЦЭВЭР АШИГ",
    "₮286M",
    "₮245M өмнөх жил",
    "+₮41M өссөн",
    "▲ 16.7%",
    72,
    "#17a34a",
  ],
  [
    "% АШГИЙН МАРЖИН",
    "13.1%",
    "14.2% өмнөх жил",
    "-1.1pp буурсан",
    "▼ 13.1%",
    87,
    "#f2b705",
  ],
  [
    "📈 НИЙТ ЗАРДАЛ",
    "₮1.1bn",
    "₮1.3bn өмнөх жил",
    "-₮200M буурсан",
    "▼ 15.4%",
    55,
    "#ff3038",
  ],
  [
    "📥 АВЛАГЫН ҮЛДЭГДЭЛ",
    "₮4.5bn",
    "₮4.8bn өмнөх жил",
    "-₮300M буурсан",
    "▲ 6.3%",
    63,
    "#17a34a",
  ],
  [
    "📤 ӨГЛӨГИЙН ҮЛДЭГДЭЛ",
    "₮890M",
    "₮960M өмнөх жил",
    "-₮70M буурсан",
    "▲ 7.3%",
    75,
    "#17a34a",
  ],
];

function Spark({ color = "#17a34a" }) {
  return (
    <svg
      className="spark"
      viewBox="0 0 80 28"
    >
      <polyline
        points="2,17 15,14 28,17 40,11 55,10 76,4"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
      />
    </svg>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="kpi-grid overview-card-grid mb22">
        {cards.map((card, index) => (
          <div
            className="kpi-card overview-card"
            key={card[0]}
          >
            <div className="kpi-label">
              {card[0]}
            </div>

            <div className="kpi-value">
              {card[1]}
            </div>

            <div className="kpi-prev">
              {card[2]}
            </div>

            <div
              className={`kpi-delta ${
                index === 2 || index === 3
                  ? "orange"
                  : "green"
              }`}
            >
              {card[3]}
            </div>

            <span
              className={`pill ${
                index === 3
                  ? "red"
                  : index === 2
                    ? "yellow"
                    : "green"
              }`}
              style={{
                position: "absolute",
                right: 16,
                top: 15,
              }}
            >
              {card[4]}
            </span>

            <Spark color={card[6]} />

            <div className="goal-row">
              <div className="goal-head">
                <span>Зорилт</span>
                <b>{card[5]}%</b>
              </div>

              <div className="goal-track">
                <div
                  className="goal-fill"
                  style={{
                    width: `${card[5]}%`,
                    background: card[6],
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="dash-card chart-card mb22">
        <h3 className="section-title">
          Орлого, Зардал, Ашиг — сараар
        </h3>

        <p className="section-sub">
          Дундаж ашиг: ₮292M/сар
        </p>

        <div className="chart-wrap">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <ComposedChart
              data={monthly}
              margin={{
                top: 12,
                right: 12,
                left: 4,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="2 4"
                vertical
              />

              <XAxis dataKey="m" />

              <YAxis
                tickFormatter={(value) =>
                  `₮${value}M`
                }
              />

              <Tooltip />

              <Legend
                align="right"
                verticalAlign="top"
              />

              <Bar
                dataKey="income"
                name="Орлого"
                fill="#4fb56b"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="expense"
                name="Зардал"
                fill="#4978bd"
                radius={[4, 4, 0, 0]}
              />

              <Line
                dataKey="profit"
                name="Ашиг"
                stroke="#e49a00"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "#e49a00",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="dash-card chart-card mb22">
        <h3 className="section-title">
          Санхүүгийн гол харьцаа
        </h3>

        <div className="metric-grid mt22">
          <div className="metric-box">
            <div className="title">
              Эргэлтийн харьцаа
            </div>

            <div className="value green">
              1.42
            </div>

            <div className="foot green">
              &gt;1.2 зорилт
            </div>
          </div>

          <div className="metric-box">
            <div className="title">
              Өрийн харьцаа
            </div>

            <div className="value green">
              0.38
            </div>

            <div className="foot green">
              &lt;0.5 зорилт
            </div>
          </div>

          <div className="metric-box warn">
            <div className="title">
              EBITDA маржин
            </div>

            <div className="value orange">
              18.4%
            </div>

            <div className="foot orange">
              Зорилт 20%
            </div>
          </div>

          <div className="metric-box danger">
            <div className="title">
              Авлага эргэлт
            </div>

            <div className="value red">
              14.2 хоног
            </div>

            <div className="foot red">
              Зорилт 30 хон
            </div>
          </div>
        </div>
      </section>

      <section className="dash-card action-card">
        <h3 className="section-title">
          📋 Энэ сард хийх зүйлс
        </h3>

        <p className="section-sub">
          Захирлын хийх ажлын жагсаалт — priority дарааллаар
        </p>

        <div className="action-item danger">
          <span className="action-num">
            1
          </span>

          <div className="action-kicker red">
            🔴 ЯАРАЛТАЙ
          </div>

          <div className="action-title red">
            Авлагын цуглуулалтыг эрчимжүүлэх
          </div>

          <div className="action-text">
            90+ хоногийн авлага ₮3.8bn
            (85%). Топ 3: ТИД Түрээс
            (₮2.9bn), Менежмент
            (₮751M), Цахилгаан
            (₮236M)
          </div>

          <div className="action-note">
            Зорилт: Энэ сард ₮500M
            цуглуулах
          </div>

          <span className="action-link red">
            Авлага →
          </span>
        </div>

        <div className="action-item">
          <span className="action-num">
            2
          </span>

          <div className="action-kicker orange">
            🟡 АНХААРАХ
          </div>

          <div className="action-title orange">
            Авто центрийн алдагдлыг шалгах
          </div>

          <div className="action-text">
            Орлого ₮24M vs Зардал ₮89M =
            -₮65M. Өмнөх сараас 45%
            муудсан.
          </div>

          <div className="action-note">
            Шалтгаан тодорхойлж шийдвэр
            гаргах
          </div>

          <span className="action-link orange">
            Санхүү →
          </span>
        </div>

        <div className="action-item">
          <span className="action-num">
            3
          </span>

          <div className="action-kicker orange">
            🟡 АНХААРАХ
          </div>

          <div className="action-title orange">
            Мөнгөн үлдэгдэл буурч буй trend
          </div>

          <div className="action-text">
            3 сар: ₮1.5bn → ₮1.3bn →
            ₮1.1bn. Таамаглалаар 10-р
            сард -₮290M болно.
          </div>

          <div className="action-note">
            Зардал хэмнэх эсвэл зээл авах
            шийдвэр гаргах
          </div>

          <span className="action-link orange">
            Урсгал →
          </span>
        </div>
      </section>
    </div>
  );
}