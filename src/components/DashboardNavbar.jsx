import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function DashboardNavbar() {
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    `sidebar-item ${isActive ? "active" : ""}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <aside className="dashboard-sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            D
          </div>

          <span>DataView</span>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">
            DASHBOARDS
          </p>

          <NavLink
            to="/dashboard"
            className={getLinkClass}
          >
            <span>🏢</span>
            <span>CEO Dashboard</span>
          </NavLink>

          <NavLink
            to="/finance"
            className={getLinkClass}
          >
            <span>💰</span>
            <span>Finance Dashboard</span>
          </NavLink>

          <NavLink
            to="/sales"
            className={getLinkClass}
          >
            <span>📈</span>
            <span>Sales Dashboard</span>
          </NavLink>

          <NavLink
            to="/ar-ap"
            className={getLinkClass}
          >
            <span>🧾</span>
            <span>AR/AP Dashboard</span>
          </NavLink>

          <NavLink
            to="/inventory"
            className={getLinkClass}
          >
            <span>📦</span>
            <span>Inventory Dashboard</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">
            TOOLS
          </p>

          <button
            type="button"
            className="sidebar-item"
          >
            <span>📊</span>
            <span>Chart Templates</span>
          </button>

          <button
            type="button"
            className="sidebar-item"
          >
            <span>🔧</span>
            <span>Dashboard Builder</span>
          </button>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-left">
          <div className="user-avatar">
            D
          </div>

          <div>
            <strong>demo</strong>
            <span>demo@dataviz.pro</span>
          </div>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
          title="Log out"
        >
          ⏻
        </button>
      </div>
    </aside>
  );
}

export default DashboardNavbar;