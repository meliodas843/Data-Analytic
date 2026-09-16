import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo-default.svg";

function DashboardNavbar({
  collapsed,
  onToggle,
}) {
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    `sidebar-item ${isActive ? "active" : ""}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <aside
      className={`dashboard-sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div>
        <div className="sidebar-logo">
          {!collapsed && (
            <img
              src={logo}
              alt="DataView"
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
            title={
              collapsed
                ? "Меню дэлгэх"
                : "Меню хураах"
            }
          >
            {collapsed ? "☰" : "←"}
          </button>
        </div>

        <div className="sidebar-section">
          {!collapsed && (
            <p className="sidebar-label">
              DASHBOARDS
            </p>
          )}

          <NavLink
            to="/dashboard"
            end
            className={getLinkClass}
            title="CEO Dashboard"
          >
            <span className="sidebar-item-icon">
              🏢
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                CEO Dashboard
              </span>
            )}
          </NavLink>

          <NavLink
            to="/finance"
            className={getLinkClass}
            title="Finance Dashboard"
          >
            <span className="sidebar-item-icon">
              💰
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                Finance Dashboard
              </span>
            )}
          </NavLink>

          <NavLink
            to="/sales"
            className={getLinkClass}
            title="Sales Dashboard"
          >
            <span className="sidebar-item-icon">
              📈
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                Sales Dashboard
              </span>
            )}
          </NavLink>

          <NavLink
            to="/ar-ap"
            className={getLinkClass}
            title="AR/AP Dashboard"
          >
            <span className="sidebar-item-icon">
              🧾
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                AR/AP Dashboard
              </span>
            )}
          </NavLink>

          <NavLink
            to="/inventory"
            className={getLinkClass}
            title="Inventory Dashboard"
          >
            <span className="sidebar-item-icon">
              📦
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                Inventory Dashboard
              </span>
            )}
          </NavLink>
        </div>

        <div className="sidebar-section">
          {!collapsed && (
            <p className="sidebar-label">
              TOOLS
            </p>
          )}

          <button
            type="button"
            className="sidebar-item"
            title="Chart Templates"
          >
            <span className="sidebar-item-icon">
              📊
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                Chart Templates
              </span>
            )}
          </button>

          <button
            type="button"
            className="sidebar-item"
            title="Dashboard Builder"
          >
            <span className="sidebar-item-icon">
              🔧
            </span>

            {!collapsed && (
              <span className="sidebar-item-text">
                Dashboard Builder
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="sidebar-user">
        {!collapsed && (
          <div className="sidebar-user-left">
            <div className="user-avatar">
              D
            </div>

            <div className="sidebar-user-info">
              <strong>demo</strong>
              <span>demo@dataviz.pro</span>
            </div>
          </div>
        )}

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
          title="Гарах"
        >
          ⏻
        </button>
      </div>
    </aside>
  );
}

export default DashboardNavbar;