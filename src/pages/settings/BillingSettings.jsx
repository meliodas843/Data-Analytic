import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Check,
  CreditCard,
  QrCode,
  Landmark,
} from "lucide-react";

export default function BillingSettings() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("qpay");

  const comparisonRows = [
    [
      "Dashboard хуудас",
      "2",
      "5",
      "5 + захиалгат",
    ],
    [
      "Системийн холболт",
      "1",
      "3",
      "Хязгааргүй",
    ],
    [
      "Хэрэглэгч",
      "5",
      "Хязгааргүй",
      "Хязгааргүй",
    ],
    [
      "Sync давтамж",
      "Өдөрт 1",
      "Цаг тутам",
      "15 минут тутам",
    ],
    [
      "Салбараар шүүх",
      "—",
      "✓",
      "✓",
    ],
    [
      "PDF / Excel экспорт",
      "—",
      "✓",
      "✓",
    ],
    [
      "Role-based эрх",
      "Admin, Viewer",
      "Admin, Editor, Viewer",
      "Захиалгат",
    ],
    [
      "Дэмжлэг",
      "И-мэйл",
      "Утас, и-мэйл",
      "Тусгай менежер, SLA",
    ],
  ];

  const handleConnectDatabase = () => {
    navigate("/setup", {
      state: {
        step: 2,
      },
    });
  };

  return (
    <div className="settings-inner">
      <div className="settings-page-title">
        <h1>Багц & Төлбөр</h1>

        <p>
          Туршилт, багц, төлбөрийн хэлбэр ба
          нэхэмжлэл
        </p>
      </div>

      <section className="settings-card trial-card">
        <div>
          <h3>Туршилт эхлээгүй</h3>

          <p>
            Дата холбосноор Pro багцын 14
            хоногийн үнэгүй туршилт эхэлнэ.
            Карт шаардлагагүй.
          </p>
        </div>

        <button
          type="button"
          className="settings-primary-button"
          onClick={handleConnectDatabase}
        >
          Дата холбох
        </button>
      </section>

      <div className="billing-heading-row">
        <h2>Багц сонгох</h2>

        <div className="billing-period">
          <button
            type="button"
            className="active"
          >
            Сараар
          </button>

          <button type="button">
            Жилээр
          </button>

          <span>-15%</span>
        </div>
      </div>

      <div className="pricing-grid">
        <PlanCard
          title="Starter"
          subtitle="Жижиг баг, нэг систем"
          price="₮99,000"
          features={[
            "1 холболт",
            "5 хүртэл хэрэглэгч",
            "Өдөрт 1 sync",
            "Тойм, Санхүү хуудас",
          ]}
          button="Starter сонгох"
        />

        <PlanCard
          title="Pro"
          subtitle="Олон салбартай бизнес"
          price="₮249,000"
          popular
          features={[
            "3 холболт",
            "Хэрэглэгч хязгааргүй",
            "Цаг тутам sync",
            "Бүх 5 хуудас + PDF/Excel экспорт",
          ]}
          button="Pro сонгох"
        />

        <PlanCard
          title="Enterprise"
          subtitle="Тусгай шаардлагатай байгууллага"
          price="Тохиролцоно"
          features={[
            "Холболт хязгааргүй",
            "15 минут тутам sync",
            "SLA баталгаа",
            "Тусгай менежер",
          ]}
          button="Холбоо барих"
        />
      </div>

      <section className="settings-card comparison-card">
        <h3>Багцуудын харьцуулалт</h3>

        <div className="comparison-table">
          <div className="comparison-row comparison-head">
            <span>Боломж</span>

            <strong>
              Starter
            </strong>

            <strong className="comparison-pro">
              Pro
            </strong>

            <strong>
              Enterprise
            </strong>
          </div>

          {comparisonRows.map((row) => (
            <div
              className="comparison-row"
              key={row[0]}
            >
              <span>
                {row[0]}
              </span>

              <span>
                {row[1]}
              </span>

              <span className="comparison-pro">
                {row[2]}
              </span>

              <span>
                {row[3]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="billing-bottom-grid">
        <section className="settings-card">
          <h3>
            Төлбөрийн хэлбэр
          </h3>

          <p className="settings-card-subtitle">
            Нэхэмжлэл дээр харагдах үндсэн
            хэлбэр
          </p>

          <PaymentMethod
            icon={
              <QrCode size={19} />
            }
            title="QPay"
            subtitle="Банкны апп-аар QR уншуулна"
            active={
              paymentMethod === "qpay"
            }
            onClick={() =>
              setPaymentMethod("qpay")
            }
          />

          <PaymentMethod
            icon={
              <Landmark size={19} />
            }
            title="Банкны шилжүүлэг"
            subtitle="Нэхэмжлэлээр шилжүүлнэ"
            active={
              paymentMethod === "bank"
            }
            onClick={() =>
              setPaymentMethod("bank")
            }
          />

          <PaymentMethod
            icon={
              <CreditCard size={19} />
            }
            title="Карт"
            subtitle="Visa, Mastercard"
            active={
              paymentMethod === "card"
            }
            onClick={() =>
              setPaymentMethod("card")
            }
          />
        </section>

        <section className="settings-card">
          <h3>
            Нэхэмжлэлийн түүх
          </h3>

          <div className="invoice-head">
            <span>Огноо</span>
            <span>Тайлбар</span>
            <span>Дүн</span>
            <span>Төлөв</span>
            <span>И-баримт</span>
            <span>Татах</span>
          </div>

          <div className="invoice-empty">
            Анхны төлбөр хийгдсэний дараа
            нэхэмжлэл, и-баримт энд гарна
          </div>
        </section>
      </div>
    </div>
  );
}

function PlanCard({
  title,
  subtitle,
  price,
  features,
  button,
  popular,
}) {
  return (
    <section
      className={`pricing-card ${
        popular ? "popular" : ""
      }`}
    >
      {popular && (
        <span className="popular-badge">
          Хамгийн түгээмэл
        </span>
      )}

      <h3>
        {title}
      </h3>

      <p>
        {subtitle}
      </p>

      <div className="plan-price">
        {price}

        {price.includes("₮") && (
          <span>
            /сар
          </span>
        )}
      </div>

      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <Check size={16} />

            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={
          popular
            ? "settings-primary-button"
            : "settings-secondary-button"
        }
      >
        {button}
      </button>
    </section>
  );
}

function PaymentMethod({
  icon,
  title,
  subtitle,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`payment-method ${
        active ? "active" : ""
      }`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="payment-icon">
        {icon}
      </span>

      <span className="payment-method-content">
        <strong>
          {title}
        </strong>

        <small>
          {subtitle}
        </small>
      </span>

      <span
        className={`payment-radio ${
          active ? "active" : ""
        }`}
      >
        {active && (
          <Check size={13} />
        )}
      </span>
    </button>
  );
}