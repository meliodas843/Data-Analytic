import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "../../styles/Settings.css";

import {
  Building2,
  Database,
  Users,
  CreditCard,
  ArrowLeft,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import logo from "../../assets/logo-default.svg";

export default function SettingsLayout() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef = useRef(null);

  const getLinkClass = ({ isActive }) =>
    `settings-sidebar-item ${
      isActive ? "active" : ""
    }`;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const goTo = (path) => {
    setProfileOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    setProfileOpen(false);

    navigate("/");
  };

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
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>

          <span className="settings-slash">
            /
          </span>

          <strong>Тохиргоо</strong>
        </div>

        <div className="settings-header-right">
          <button
            type="button"
            className="settings-header-icon"
          >
            <Bell size={18} />
          </button>

          <div
            className="settings-profile-wrapper"
            ref={profileRef}
          >
            <button
              type="button"
              className={`settings-profile-button ${
                profileOpen
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setProfileOpen(
                  (prev) => !prev
                )
              }
            >
              <span className="settings-profile-avatar">
                Б
              </span>

              <span className="settings-profile-name">
                Бат-Эрдэнэ
              </span>

              <ChevronDown
                size={15}
                className={
                  profileOpen
                    ? "rotate"
                    : ""
                }
              />
            </button>

            {profileOpen && (
              <div className="settings-profile-dropdown">
                <div className="settings-profile-info">
                  <div className="settings-profile-title">
                    <strong>
                      Бат-Эрдэнэ
                    </strong>

                    <span>
                      ADMIN
                    </span>
                  </div>

                  <p>
                    demo@company.mn
                  </p>

                  <small>
                    Монголын Компани ХХК
                  </small>
                </div>

                <div className="settings-profile-separator" />

                <div className="settings-profile-menu">
                  <button
                    type="button"
                    onClick={() =>
                      goTo("/profile")
                    }
                  >
                    <User size={16} />
                    <span>
                      Миний профайл
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      goTo("/settings")
                    }
                  >
                    <Settings
                      size={16}
                    />

                    <span>
                      Тохиргоо
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      goTo(
                        "/settings/billing"
                      )
                    }
                  >
                    <CreditCard
                      size={16}
                    />

                    <span>
                      Багц & Төлбөр
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      goTo("/help")
                    }
                  >
                    <HelpCircle
                      size={16}
                    />

                    <span>
                      Тусламж & дэмжлэг
                    </span>
                  </button>
                </div>

                <div className="settings-profile-separator" />

                <button
                  type="button"
                  className="settings-profile-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />

                  <span>
                    Гарах
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="settings-page">
        <aside className="settings-sidebar">
          <nav>
            <NavLink
              to="/settings"
              end
              className={
                getLinkClass
              }
            >
              <Building2
                size={18}
              />

              <span>
                Байгууллага
              </span>
            </NavLink>

            <NavLink
              to="/settings/data"
              className={
                getLinkClass
              }
            >
              <Database
                size={18}
              />

              <span>
                Дата холболт
              </span>
            </NavLink>

            <NavLink
              to="/settings/users"
              className={
                getLinkClass
              }
            >
              <Users size={18} />

              <span>
                Хэрэглэгчид & эрх
              </span>
            </NavLink>

            <NavLink
              to="/settings/billing"
              className={
                getLinkClass
              }
            >
              <CreditCard
                size={18}
              />

              <span>
                Багц & Төлбөр
              </span>
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