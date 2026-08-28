import { useLocation } from "react-router-dom";

function DashboardHeader() {
  const location = useLocation();

  const pageNames = {
    "/dashboard": "CEO Dashboard",
    "/finance": "Finance Dashboard",
    "/sales": "Sales Dashboard",
    "/ar-ap": "AR/AP Dashboard",
    "/inventory": "Inventory Dashboard",
  };

  const currentPage =
    pageNames[location.pathname] || "Dashboard";

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <h1>{currentPage}</h1>
        <p>Компанийн гүйцэтгэлийн хяналтын самбар</p>
      </div>

      <div className="dashboard-header-actions">
        <div className="header-control">
          <span className="header-control-icon">📅</span>

          <input
            type="date"
            className="header-date"
            defaultValue="2026-08-27"
          />
        </div>

        <div className="header-control">
          <span className="header-control-icon">🌐</span>

          <select
            className="header-language"
            defaultValue="mn"
          >
            <option value="mn">Монгол</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;