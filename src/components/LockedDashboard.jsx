import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/Dashboard.css";

const LOCKED_CONTENT = {
  finance: {
    title: "Санхүүгийн тайлан",
    items: [
      "Ашиг алдагдлын waterfall",
      "Маржины өөрчлөлт",
      "НӨАТ ба улирлын харьцуулалт",
    ],
  },

  sales: {
    title: "Борлуулалт & Авлага",
    items: [
      "Цуглуулалтын хувь",
      "Авлагын насжилт",
      "Топ 10 өртэй харилцагч",
    ],
  },

  cashflow: {
    title: "Мөнгөн урсгал",
    items: [
      "Мөнгөн үлдэгдлийн хяналт",
      "Орлого, зарлагын мөнгөн урсгал",
      "Runway ба таамаглал",
    ],
  },

  arap: {
    title: "AR / AP",
    items: [
      "Авлага ба өглөгийн үлдэгдэл",
      "Насжилтын шинжилгээ",
      "Харилцагчийн дэлгэрэнгүй",
    ],
  },
};

export default function LockedDashboard({
  type,
  children,
}) {
  const navigate = useNavigate();

  const dataConnected =
    localStorage.getItem("dataConnected") === "true";

  const usingDemoData =
    localStorage.getItem("usingDemoData") === "true";

  const locked =
    usingDemoData && !dataConnected;

  const content =
    LOCKED_CONTENT[type] ||
    LOCKED_CONTENT.finance;

  if (!locked) {
    return children;
  }

  const handleConnect = () => {
    navigate("/setup", {
      state: {
        step: 2,
      },
    });
  };

  return (
    <div className="locked-dashboard">
      <div className="locked-dashboard-preview">
        {children}
      </div>

      <div className="locked-dashboard-overlay">
        <div className="locked-connect-card">
          <div className="locked-icon">
            <LockKeyhole
              size={28}
              strokeWidth={2}
            />
          </div>

          <h2>{content.title}</h2>

          <ul>
            {content.items.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="locked-connect-button"
            onClick={handleConnect}
          >
            Дата холбож туршиж үзэх
          </button>

          <div className="locked-connect-time">
            Холбоход 5–10 минут
          </div>

          <div className="locked-connect-support">
            <span>▣ Odoo</span>
            <span>▣ 1C</span>
            <span>▦ Excel</span>
            <span>дэмжинэ</span>
          </div>
        </div>
      </div>
    </div>
  );
}