import {
  useNavigate,
} from "react-router-dom";

import {
  LockKeyhole,
  CheckCircle2,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import useSubscription from "../hooks/useSubscription";

function LockedDashboard({
  children,
}) {
  const navigate =
    useNavigate();

  const {
    active,
    loading,
  } = useSubscription();

  if (loading) {
    return (
      <div className="locked-dashboard-loading">
        Багцын мэдээллийг шалгаж байна...
      </div>
    );
  }

  if (active) {
    return children;
  }

  return (
    <div className="locked-dashboard">
      <div className="locked-dashboard-preview">
        {children}
      </div>

      <div className="locked-dashboard-overlay">
        <div className="locked-connect-card">
          <div className="locked-icon">
            <LockKeyhole
              size={27}
              strokeWidth={2}
            />
          </div>

          <h2>
            Датагаа холбоод
            dashboard-аа нээнэ үү
          </h2>

          <ul>
            <li>
              Санхүүгийн мэдээллээ
              нэг дор харах
            </li>

            <li>
              Борлуулалтын
              үзүүлэлтүүдийг хянах
            </li>

            <li>
              Мөнгөн урсгал болон
              AR / AP мэдээлэл харах
            </li>
          </ul>

          <button
            type="button"
            className="locked-connect-button"
            onClick={() =>
              navigate(
                "/setup",
                {
                  state: {
                    step: 2,
                  },
                }
              )
            }
          >
            Дата холбох
          </button>

          <div className="locked-connect-time">
            Дата холболт хэдхэн минут
            үргэлжилнэ
          </div>

          <div className="locked-connect-support">
            <span>
              <CheckCircle2
                size={14}
              />
              Аюулгүй холболт
            </span>

            <span>
              <ShieldCheck
                size={14}
              />
              Нууцлал хамгаалагдсан
            </span>

            <span>
              <Clock3
                size={14}
              />
              Хурдан тохиргоо
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockedDashboard;