import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  Info,
} from "lucide-react";

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
import AdminCompany from "./Admin/AdminCompany";
import AdminRequests from "./Admin/AdminRequests";
import AdminUsers from "./Admin/AdminUsers";

import AdminLayout from "./components/AdminLayout";

import useSubscription from "./hooks/useSubscription";

import "./styles/Dashboard.css";

const ADMIN_SESSION_KEY =
  "adminAuthenticated";

const ADMIN_USER_KEY =
  "adminUser";

const ADMIN_LAST_ACTIVITY_KEY =
  "adminLastActivity";

const ADMIN_TIMEOUT =
  10 * 60 * 1000;

function clearAdminSession() {
  sessionStorage.removeItem(
    ADMIN_SESSION_KEY
  );

  sessionStorage.removeItem(
    ADMIN_USER_KEY
  );

  sessionStorage.removeItem(
    ADMIN_LAST_ACTIVITY_KEY
  );
}

function ScrollToTop() {
  const {
    pathname,
  } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    document.documentElement.scrollTop =
      0;

    document.body.scrollTop =
      0;

    const selectors = [
      ".dashboard-main",
      ".dashboard-body",
      ".dashboard-content",
      ".settings-content",
      ".admin-main",
      ".admin-content",
    ];

    selectors.forEach(
      (selector) => {
        const element =
          document.querySelector(
            selector
          );

        if (element) {
          element.scrollTop =
            0;
        }
      }
    );
  }, [pathname]);

  return null;
}

function DashboardLayout({
  children,
}) {
  const navigate =
    useNavigate();

  const [
    collapsed,
    setCollapsed,
  ] = useState(false);

  const {
    active,
    loading,
  } = useSubscription();

  const handleToggleSidebar =
    () => {
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
        collapsed={
          collapsed
        }
        onToggle={
          handleToggleSidebar
        }
      />

      <main className="dashboard-main">
        <DashboardHeader />

        <div className="dashboard-body">
          <div className="dashboard-content">
            {!loading &&
              !active && (
                <div className="subscription-connect-banner">
                </div>
              )}

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function ProtectedUserRoute() {
  const token =
    localStorage.getItem(
      "token"
    );

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    ) === "true";

  if (
    !token ||
    !isLoggedIn
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}

function ProtectedAdminRoute() {
  const navigate =
    useNavigate();

  const adminAuthenticated =
    sessionStorage.getItem(
      ADMIN_SESSION_KEY
    ) === "true";

  useEffect(() => {
    if (
      !adminAuthenticated
    ) {
      return;
    }

    let timeoutId;

    const logoutAdmin =
      () => {
        clearAdminSession();

        navigate(
          "/admin/login",
          {
            replace: true,
          }
        );
      };

    const checkSession =
      () => {
        const lastActivity =
          Number(
            sessionStorage.getItem(
              ADMIN_LAST_ACTIVITY_KEY
            )
          );

        if (!lastActivity) {
          sessionStorage.setItem(
            ADMIN_LAST_ACTIVITY_KEY,
            Date.now().toString()
          );

          return false;
        }

        if (
          Date.now() -
            lastActivity >=
          ADMIN_TIMEOUT
        ) {
          logoutAdmin();

          return true;
        }

        return false;
      };

    const resetTimer =
      () => {
        if (
          checkSession()
        ) {
          return;
        }

        sessionStorage.setItem(
          ADMIN_LAST_ACTIVITY_KEY,
          Date.now().toString()
        );

        clearTimeout(
          timeoutId
        );

        timeoutId =
          setTimeout(
            logoutAdmin,
            ADMIN_TIMEOUT
          );
      };

    const existingLastActivity =
      Number(
        sessionStorage.getItem(
          ADMIN_LAST_ACTIVITY_KEY
        )
      );

    if (
      existingLastActivity &&
      Date.now() -
        existingLastActivity >=
        ADMIN_TIMEOUT
    ) {
      logoutAdmin();

      return;
    }

    if (
      !existingLastActivity
    ) {
      sessionStorage.setItem(
        ADMIN_LAST_ACTIVITY_KEY,
        Date.now().toString()
      );
    }

    timeoutId =
      setTimeout(
        logoutAdmin,
        ADMIN_TIMEOUT
      );

    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach(
      (eventName) => {
        window.addEventListener(
          eventName,
          resetTimer,
          {
            passive: true,
          }
        );
      }
    );

    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          if (
            !checkSession()
          ) {
            resetTimer();
          }
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      clearTimeout(
        timeoutId
      );

      events.forEach(
        (eventName) => {
          window.removeEventListener(
            eventName,
            resetTimer
          );
        }
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [
    adminAuthenticated,
    navigate,
  ]);

  if (
    !adminAuthenticated
  ) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}

function AdminLoginRedirect() {
  const adminAuthenticated =
    sessionStorage.getItem(
      ADMIN_SESSION_KEY
    ) === "true";

  if (
    adminAuthenticated
  ) {
    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  return <AdminLogin />;
}

function AdminIndexRedirect() {
  const adminAuthenticated =
    sessionStorage.getItem(
      ADMIN_SESSION_KEY
    ) === "true";

  if (
    !adminAuthenticated
  ) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/admin/dashboard"
      replace
    />
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup />
          }
        />

        <Route
          path="/verify-email"
          element={
            <VerifyEmail />
          }
        />

        <Route
          path="/setup"
          element={
            <Setup />
          }
        />

        <Route
          element={
            <ProtectedUserRoute />
          }
        >
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
            element={
              <Profile />
            }
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
        </Route>

        <Route
          path="/admin/login"
          element={
            <AdminLoginRedirect />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminIndexRedirect />
          }
        />

        <Route
          element={
            <ProtectedAdminRoute />
          }
        >
          <Route
            path="/admin"
            element={
              <AdminLayout />
            }
          >
            <Route
              path="dashboard"
              element={
                <AdminDashboard />
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
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
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