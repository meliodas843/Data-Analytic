import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardNavbar from "./DashboardNavbar";

function DashboardLayout() {
  const [collapsed, setCollapsed] =
    useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((current) => !current);
  };

  return (
    <div
      className={
        collapsed
          ? "dashboard-layout sidebar-collapsed"
          : "dashboard-layout"
      }
    >
      <DashboardNavbar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
      />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;