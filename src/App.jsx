import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";

import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyEmail from "./components/VerifyEmail";

import FinanceDashboard from "./pages/graphs/FinanceDashboard";
import SalesDashboard from "./pages/graphs/SalesDashboard";
import ArApDashboard from "./pages/graphs/ArApDashboard";
import InventoryDashboard from "./pages/graphs/InventoryDashboard";

import DashboardNavbar from "./components/DashboardNavbar";
import DashboardHeader from "./components/DashboardHeader";

import Profile from "./pages/Profile";

import SettingsLayout from "./pages/settings/SettingsLayout";
import OrganizationSettings from "./pages/settings/OrganizationSettings";
import DataConnectionSettings from "./pages/settings/DataConnectionSettings";
import UsersSettings from "./pages/settings/UsersSettings";
import BillingSettings from "./pages/settings/BillingSettings";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminHome from "./Admin/AdminHome";
import AdminCompany from "./Admin/AdminCompany";
import AdminRequests from "./Admin/AdminRequests";
import AdminUsers from "./Admin/AdminUsers";

import AdminLayout from "./components/AdminLayout";

import "./styles/Dashboard.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const dashboardMain =
      document.querySelector(
        ".dashboard-main"
      );

    if (dashboardMain) {
      dashboardMain.scrollTop = 0;
    }

    const dashboardBody =
      document.querySelector(
        ".dashboard-body"
      );

    if (dashboardBody) {
      dashboardBody.scrollTop = 0;
    }

    const dashboardContent =
      document.querySelector(
        ".dashboard-content"
      );

    if (dashboardContent) {
      dashboardContent.scrollTop = 0;
    }

    const settingsContent =
      document.querySelector(
        ".settings-content"
      );

    if (settingsContent) {
      settingsContent.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

function DashboardLayout({
  children,
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(
      (prev) => !prev
    );
  };

  return (
    <div
      className={`dashboard-layout ${
        collapsed
          ? "sidebar-collapsed"
          : ""
      }`}
    >
      <DashboardNavbar
        collapsed={collapsed}
        onToggle={
          handleToggleSidebar
        }
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

function AppRoutes() {
  return (
    <>
      <ScrollToTop />

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
          path="/verify-email"
          element={<VerifyEmail />}
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
          path="/cash-flow"
          element={
            <DashboardLayout>
              <InventoryDashboard />
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
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={
            <SettingsLayout />
          }
        >
          <Route
            index
            element={
              <OrganizationSettings />
            }
          />

          <Route
            path="organization"
            element={
              <OrganizationSettings />
            }
          />

          <Route
            path="data"
            element={
              <DataConnectionSettings />
            }
          />

          <Route
            path="users"
            element={
              <UsersSettings />
            }
          />

          <Route
            path="billing"
            element={
              <BillingSettings />
            }
          />
        </Route>

        <Route
          path="/billing"
          element={
            <Navigate
              to="/settings/billing"
              replace
            />
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
            element={
              <AdminDashboard />
            }
          />

          <Route
            path="home"
            element={
              <AdminHome />
            }
          />

          <Route
            path="company"
            element={
              <AdminCompany />
            }
          />

          <Route
            path="requests"
            element={
              <AdminRequests />
            }
          />

          <Route
            path="users"
            element={
              <AdminUsers />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;