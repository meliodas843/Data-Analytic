import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  House,
  Building2,
  Users,
  ClipboardList,
  Globe2,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import "../styles/Admin/Admin.css";
import logo from "../assets/logo-default.svg";

function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const getLinkClass = ({ isActive }) =>
    `admin-nav-item ${isActive ? "active" : ""}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  const menuItems = [
    {
      to: "/admin",
      label: "Хяналтын самбар",
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: "/admin/home",
      label: "Нүүр хуудас",
      icon: House,
    },
    {
      to: "/admin/company",
      label: "Харилцагчид",
      icon: Building2,
    },
    {
      to: "/admin/users",
      label: "Хэрэглэгчид",
      icon: Users,
    },
    {
      to: "/admin/requests",
      label: "Хүсэлтүүд",
      icon: ClipboardList,
    },
  ];

  return (
    <div
      className={`admin-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-logo">
            <button
              type="button"
              className="admin-logo-button"
              onClick={() => navigate("/admin")}
              aria-label="DataView admin"
            >
              <img
                src={logo}
                alt="DataView"
                className="admin-logo-image"
              />
            </button>

            <button
              type="button"
              className="admin-sidebar-toggle"
              onClick={() =>
                setSidebarCollapsed(
                  (current) => !current
                )
              }
              aria-label={
                sidebarCollapsed
                  ? "Меню дэлгэх"
                  : "Меню агшаах"
              }
              title={
                sidebarCollapsed
                  ? "Меню дэлгэх"
                  : "Меню агшаах"
              }
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen
                  size={18}
                  strokeWidth={2}
                />
              ) : (
                <PanelLeftClose
                  size={18}
                  strokeWidth={2}
                />
              )}
            </button>
          </div>

          <nav className="admin-nav">
            <div className="admin-nav-label">
              МЕНЮ
            </div>

            {menuItems.map(
              ({
                to,
                label,
                icon: Icon,
                end,
              }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={getLinkClass}
                  title={
                    sidebarCollapsed
                      ? label
                      : undefined
                  }
                >
                  <span className="admin-nav-icon">
                    <Icon
                      size={19}
                      strokeWidth={1.9}
                    />
                  </span>

                  <span className="admin-nav-text">
                    {label}
                  </span>
                </NavLink>
              )
            )}
          </nav>
        </div>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-bottom-line" />

          <button
            type="button"
            className="admin-view-site"
            onClick={() => navigate("/")}
            title={
              sidebarCollapsed
                ? "Вэбсайт үзэх"
                : undefined
            }
          >
            <span className="admin-bottom-icon">
              <Globe2
                size={18}
                strokeWidth={1.9}
              />
            </span>

            <span className="admin-bottom-text">
              Вэбсайт үзэх
            </span>
          </button>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
            title={
              sidebarCollapsed
                ? "Гарах"
                : undefined
            }
          >
            <span className="admin-bottom-icon">
              <LogOut
                size={18}
                strokeWidth={1.9}
              />
            </span>

            <span className="admin-bottom-text">
              Гарах
            </span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">
            <h1>
              DataView удирдлагын хэсэг
            </h1>

            <p>
              Вэбсайтын агуулга болон хэрэглэгчдийг
              удирдах
            </p>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;