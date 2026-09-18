import { useState } from "react";

import DashboardNavbar from "./DashboardNavbar";
import DashboardHeader from "./DashboardHeader";

import "../styles/Dashboard.css";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`dashboard-layout ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <DashboardNavbar
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
      />

      <main className="dashboard-main">
        <DashboardHeader />

        <div className="dashboard-body">
          <div className="dashboard-content">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;