import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutGrid,
  DollarSign,
  TrendingUp,
  ArrowUpDown,
  BookOpen,
  Settings,
  LockKeyhole,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import logo from "../assets/logo-default.svg";

function DashboardNavbar({
  collapsed,
  onToggle,
}) {
  const navigate = useNavigate();

  const dataConnected =
    localStorage.getItem("dataConnected") === "true";

  const usingDemoData =
    localStorage.getItem("usingDemoData") === "true";

  const locked =
    usingDemoData && !dataConnected;

  const getLinkClass = ({
    isActive,
  }) =>
    `sidebar-item ${
      isActive ? "active" : ""
    }`;

  const handleSettings = () => {
    navigate("/setup");
  };

  return (
    <aside
      className={`dashboard-sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="sidebar-main">
        <div className="sidebar-logo">
          {!collapsed && (
            <img
              src={logo}
              alt="DataView Mongolia"
              className="sidebar-logo-image"
            />
          )}

          <button
            type="button"
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={
              collapsed
                ? "Меню дэлгэх"
                : "Меню хураах"
            }
          >
            {collapsed ? (
              <PanelLeftOpen
                size={19}
                strokeWidth={1.8}
              />
            ) : (
              <PanelLeftClose
                size={19}
                strokeWidth={1.8}
              />
            )}
          </button>
        </div>

        <nav className="sidebar-navigation">
          <NavLink
            to="/dashboard"
            end
            className={getLinkClass}
            title="Тойм"
          >
            <span className="sidebar-item-icon">
              <LayoutGrid
                size={18}
                strokeWidth={1.8}
              />
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                Тойм
              </span>
            )}
          </NavLink>

          <NavLink
            to="/finance"
            className={getLinkClass}
            title="Санхүү"
          >
            <span className="sidebar-item-icon">
              <DollarSign
                size={19}
                strokeWidth={1.8}
              />
            </span>

            {!collapsed && (
              <>
                <span className="sidebar-item-text">
                  Санхүү
                </span>

                {locked && (
                  <LockKeyhole
                    className="sidebar-lock"
                    size={14}
                    strokeWidth={1.9}
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/sales"
            className={getLinkClass}
            title="Борлуулалт"
          >
            <span className="sidebar-item-icon">
              <TrendingUp
                size={19}
                strokeWidth={1.8}
              />
            </span>

            {!collapsed && (
              <>
                <span className="sidebar-item-text">
                  Борлуулалт
                </span>

                {locked && (
                  <LockKeyhole
                    className="sidebar-lock"
                    size={14}
                    strokeWidth={1.9}
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/cash-flow"
            className={getLinkClass}
            title="Мөнгөн урсгал"
          >
            <span className="sidebar-item-icon">
              <ArrowUpDown
                size={19}
                strokeWidth={1.8}
              />
            </span>

            {!collapsed && (
              <>
                <span className="sidebar-item-text">
                  Мөнгөн урсгал
                </span>

                {locked && (
                  <LockKeyhole
                    className="sidebar-lock"
                    size={14}
                    strokeWidth={1.9}
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/ar-ap"
            className={getLinkClass}
            title="AR / AP"
          >
            <span className="sidebar-item-icon">
              <BookOpen
                size={19}
                strokeWidth={1.8}
              />
            </span>

            {!collapsed && (
              <>
                <span className="sidebar-item-text">
                  AR / AP
                </span>

                {locked && (
                  <LockKeyhole
                    className="sidebar-lock"
                    size={14}
                    strokeWidth={1.9}
                  />
                )}
              </>
            )}
          </NavLink>

          <div className="sidebar-divider" />

          <button
            type="button"
            className="sidebar-item"
            onClick={handleSettings}
            title="Тохиргоо"
          >
            <span className="sidebar-item-icon">
              <Settings
                size={19}
                strokeWidth={1.8}
              />
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                Тохиргоо
              </span>
            )}
          </button>
        </nav>
      </div>

      <div className="sidebar-bottom">
        {locked && !collapsed && (
          <div className="sidebar-trial-card">
            <strong>
              Туршилт эхлээгүй
            </strong>

            <span>
              Дата холбосноор 14 хоногийн
              туршилт эхэлнэ
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

export default DashboardNavbar;