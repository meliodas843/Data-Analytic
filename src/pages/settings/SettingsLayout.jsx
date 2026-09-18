import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "../../styles/Settings.css";
import {
  Building2,
  Database,
  Users,
  CreditCard,
  ArrowLeft,
  Bell,
  ChevronDown,
} from "lucide-react";

import logo from "../../assets/logo-default.svg";

export default function SettingsLayout() {
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    `settings-sidebar-item ${
      isActive ? "active" : ""
    }`;

  return (
    <div className="settings-layout">
      <header className="settings-header">
        <div className="settings-header-left">
          <img
            src={logo}
            alt="DataView"
            className="settings-header-logo"
          />

          <div className="settings-header-divider" />

          <button
            type="button"
            className="settings-back-button"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>

          <span className="settings-slash">/</span>

          <strong>Тохиргоо</strong>
        </div>

        <div className="settings-header-right">
          <button
            type="button"
            className="settings-header-icon"
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            className="settings-header-profile"
          >
            <span className="settings-avatar">
              Б
            </span>

            <span>Бат-Эрдэнэ</span>

            <ChevronDown size={15} />
          </button>
        </div>
      </header>

      <div className="settings-page">
        <aside className="settings-sidebar">
          <nav>
            <NavLink
              to="/settings"
              end
              className={getLinkClass}
            >
              <Building2 size={18} />
              <span>Байгууллага</span>
            </NavLink>

            <NavLink
              to="/settings/data"
              className={getLinkClass}
            >
              <Database size={18} />
              <span>Дата холболт</span>
            </NavLink>

            <NavLink
              to="/settings/users"
              className={getLinkClass}
            >
              <Users size={18} />
              <span>Хэрэглэгчид & эрх</span>
            </NavLink>

            <NavLink
              to="/settings/billing"
              className={getLinkClass}
            >
              <CreditCard size={18} />
              <span>Багц & Төлбөр</span>
            </NavLink>
          </nav>

          <button
            type="button"
            className="settings-status-button"
          >
            ◉ Төлөв
          </button>
        </aside>

        <main className="settings-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}