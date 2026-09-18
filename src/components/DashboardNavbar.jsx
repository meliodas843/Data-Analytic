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

import useSubscription from "../hooks/useSubscription";

function DashboardNavbar({
  collapsed,
  onToggle,
}) {
  const navigate =
    useNavigate();

  const {
    active,
    loading,
  } = useSubscription();

  const locked =
    loading || !active;

  const menuItems = [
    {
      to: "/dashboard",
      label: "Тойм",
      icon: LayoutGrid,
      paid: false,
    },
    {
      to: "/finance",
      label: "Санхүү",
      icon: DollarSign,
      paid: true,
    },
    {
      to: "/sales",
      label: "Борлуулалт",
      icon: TrendingUp,
      paid: true,
    },
    {
      to: "/cash-flow",
      label: "Мөнгөн урсгал",
      icon: ArrowUpDown,
      paid: true,
    },
    {
      to: "/ar-ap",
      label: "AR / AP",
      icon: BookOpen,
      paid: true,
    },
  ];

  return (
    <aside
      className={`dashboard-sidebar ${
        collapsed
          ? "collapsed"
          : ""
      }`}
    >
      <div className="sidebar-main">
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
            onClick={
              onToggle
            }
            aria-label={
              collapsed
                ? "Меню дэлгэх"
                : "Меню агшаах"
            }
          >
            {collapsed ? (
              <PanelLeftOpen
                size={19}
              />
            ) : (
              <PanelLeftClose
                size={19}
              />
            )}
          </button>
        </div>

        <nav className="sidebar-navigation">
          {menuItems.map(
            (item) => {
              const Icon =
                item.icon;

              const itemLocked =
                item.paid &&
                locked;

              return (
                <NavLink
                  key={
                    item.to
                  }
                  to={
                    item.to
                  }
                  end={
                    item.to ===
                    "/dashboard"
                  }
                  className={({
                    isActive,
                  }) =>
                    `sidebar-item ${
                      isActive
                        ? "active"
                        : ""
                    } ${
                      itemLocked
                        ? "sidebar-item-locked"
                        : ""
                    }`
                  }
                >
                  <span className="sidebar-item-icon">
                    <Icon
                      size={19}
                      strokeWidth={
                        1.8
                      }
                    />
                  </span>

                  {!collapsed && (
                    <span className="sidebar-item-text">
                      {
                        item.label
                      }
                    </span>
                  )}

                  {itemLocked &&
                    !collapsed && (
                      <LockKeyhole
                        className="sidebar-lock"
                        size={14}
                        strokeWidth={
                          2
                        }
                      />
                    )}
                </NavLink>
              );
            }
          )}

          <div className="sidebar-divider" />

          <button
            type="button"
            className="sidebar-item"
            onClick={() =>
              navigate(
                "/settings"
              )
            }
          >
            <span className="sidebar-item-icon">
              <Settings
                size={19}
                strokeWidth={
                  1.8
                }
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
    </aside>
  );
}

export default DashboardNavbar;