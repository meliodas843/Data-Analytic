import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Info,
} from "lucide-react";

import DashboardNavbar from "./DashboardNavbar";
import DashboardHeader from "./DashboardHeader";

import useSubscription from "../hooks/useSubscription";

import "../styles/Dashboard.css";

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

  const showConnectBanner =
    !loading &&
    !active;

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
        onToggle={() =>
          setCollapsed(
            (current) =>
              !current
          )
        }
      />

      <main className="dashboard-main">
        <DashboardHeader />

        <div className="dashboard-body">
          <div className="dashboard-content">
            {showConnectBanner && (
              <div className="subscription-connect-banner">
                <div className="subscription-connect-banner-left">
                  <Info
                    size={18}
                    strokeWidth={2}
                  />

                  <div>
                    <strong>
                      Датагаа холбоорой
                    </strong>

                    <span>
                      Багц сонгож,
                      байгууллагын датагаа
                      холбоод бүх dashboard-аа
                      ашиглаарай.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/settings/billing"
                    )
                  }
                >
                  Дата холбох
                </button>
              </div>
            )}

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;