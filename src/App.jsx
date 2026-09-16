import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useState } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Setup from "./pages/Setup";

import FinanceDashboard from "./pages/graphs/FinanceDashboard";
import SalesDashboard from "./pages/graphs/SalesDashboard";
import ArApDashboard from "./pages/graphs/ArApDashboard";
import InventoryDashboard from "./pages/graphs/InventoryDashboard";

import DashboardNavbar from "./components/DashboardNavbar";
import DashboardHeader from "./components/DashboardHeader";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminHome from "./Admin/AdminHome";
import AdminCompany from "./Admin/AdminCompany";
import AdminRequests from "./Admin/AdminRequests";
import AdminUsers from "./Admin/AdminUsers";
import AdminLayout from "./components/AdminLayout";

import "./styles/Dashboard.css";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] =
    useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`dashboard-layout ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <DashboardNavbar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
      />

      <main className="dashboard-main">
        <DashboardHeader />

        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/setup"
          element={<Setup />}
        />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/finance"
          element={
            <DashboardLayout>
              <FinanceDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/sales"
          element={
            <DashboardLayout>
              <SalesDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/ar-ap"
          element={
            <DashboardLayout>
              <ArApDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/inventory"
          element={
            <DashboardLayout>
              <InventoryDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="home"
            element={<AdminHome />}
          />

          <Route
            path="company"
            element={<AdminCompany />}
          />

          <Route
            path="requests"
            element={<AdminRequests />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;