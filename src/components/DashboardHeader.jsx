import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Bell,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  CircleHelp,
  Clock3,
  CreditCard,
  Download,
  Globe2,
  LogOut,
  Settings,
  UserRound,
  X,
} from "lucide-react";

function DashboardHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const [bannerVisible, setBannerVisible] =
    useState(true);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "mn"
  );

  const dataConnected =
    localStorage.getItem("dataConnected") ===
    "true";

  const usingDemoData =
    localStorage.getItem("usingDemoData") ===
    "true";

  const demoMode =
    usingDemoData && !dataConnected;

  const pageNames = {
    "/dashboard": "Удирдлагын самбар",
    "/finance": "Санхүү",
    "/sales": "Борлуулалт",
    "/cash-flow": "Мөнгөн урсгал",
    "/ar-ap": "AR / AP",
    "/inventory": "Бараа материал",
    "/settings": "Тохиргоо",
    "/profile": "Миний профайл",
    "/billing": "Багц & Төлбөр",
    "/help": "Тусламж & дэмжлэг",
  };

  const currentPage =
    pageNames[location.pathname] ||
    "Удирдлагын самбар";

  let onboarding = {};

  try {
    onboarding = JSON.parse(
      sessionStorage.getItem(
        "onboardingCompany"
      ) || "{}"
    );
  } catch {
    onboarding = {};
  }

  let user = {};

  try {
    user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
  } catch {
    user = {};
  }

  const companyName =
    onboarding.companyName ||
    user.companyName ||
    "Монголын Компани ХХК";

  const userName =
    user.fullName ||
    user.name ||
    "Бат-Эрдэнэ";

  const userEmail =
    user.email ||
    "demo@company.mn";

  const userRole =
    user.role ||
    "Admin";

  const avatarLetter =
    userName
      .trim()
      .charAt(0)
      .toUpperCase() || "Б";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setNotificationOpen(false);
  }, [location.pathname]);

  const connectData = () => {
    setProfileOpen(false);
    setNotificationOpen(false);

    navigate("/setup", {
      state: {
        step: 2,
      },
    });
  };

  const toggleProfile = () => {
    setProfileOpen(
      (current) => !current
    );

    setNotificationOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationOpen(
      (current) => !current
    );

    setProfileOpen(false);
  };

  const changeLanguage = (value) => {
    setLanguage(value);

    localStorage.setItem(
      "language",
      value
    );
  };

  const goTo = (path) => {
    setProfileOpen(false);
    setNotificationOpen(false);

    navigate(path);
  };

  const handleProfile = () => {
    goTo("/profile");
  };

  const handleSettings = () => {
    goTo("/settings");
  };

  const handleBilling = () => {
    goTo("/billing");
  };

  const handleHelp = () => {
    goTo("/help");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem(
      "dataConnected"
    );
    localStorage.removeItem(
      "usingDemoData"
    );

    sessionStorage.removeItem(
      "onboardingCompany"
    );

    setProfileOpen(false);
    setNotificationOpen(false);

    navigate("/");
  };

  return (
    <>
      {demoMode && bannerVisible && (
        <div className="demo-data-banner">
          <div className="demo-data-message">
            <CircleAlert
              size={17}
              strokeWidth={1.9}
            />

            <span>
              Та жишээ датаар харж байна.
              Өөрийн датагаа холбоод бодит
              тоогоо харна уу.
            </span>
          </div>

          <div className="demo-banner-actions">
            <button
              type="button"
              className="connect-data-button"
              onClick={connectData}
            >
              Дата холбох
            </button>

            <button
              type="button"
              className="demo-banner-close"
              onClick={() =>
                setBannerVisible(false)
              }
              aria-label="Хаах"
            >
              <X
                size={17}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>
      )}

      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1>
            {currentPage}
          </h1>

          <span className="header-company-divider" />

          <span className="header-company-name">
            {companyName}
          </span>
        </div>

        <div className="dashboard-header-actions">
          <select
            className="dashboard-filter-select branch-select"
            defaultValue="all"
          >
            <option value="all">
              Бүх салбар
            </option>

            <option value="1">
              Салбар 1
            </option>

            <option value="2">
              Салбар 2
            </option>
          </select>

          <select
            className="dashboard-filter-select month-select"
            defaultValue="2026-09"
          >
            <option value="2026-09">
              2026/09 сар
            </option>

            <option value="2026-08">
              2026/08 сар
            </option>

            <option value="2026-07">
              2026/07 сар
            </option>

            <option value="2026-06">
              2026/06 сар
            </option>
          </select>

          <button
            type="button"
            className="dashboard-export"
          >
            <Download
              size={16}
              strokeWidth={1.8}
            />

            <span>
              Экспорт
            </span>
          </button>

          <div
            className="dashboard-notification-wrapper"
            ref={notificationRef}
          >
            <button
              type="button"
              className={`dashboard-notification ${
                notificationOpen
                  ? "active"
                  : ""
              }`}
              aria-label="Мэдэгдэл"
              aria-expanded={
                notificationOpen
              }
              onClick={
                toggleNotifications
              }
            >
              <Bell
                size={18}
                strokeWidth={1.8}
              />
            </button>

            {notificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-dropdown-title">
                  Мэдэгдэл
                </div>

                <div className="notification-empty">
                  <Bell
                    size={22}
                    strokeWidth={1.45}
                  />

                  <strong>
                    Шинэ мэдэгдэл алга
                  </strong>

                  <p>
                    Sync алдаа, урилга,
                    туршилтын сануулга энд
                    гарна
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className="dashboard-profile-wrapper"
            ref={profileRef}
          >
            <button
              type="button"
              className={`dashboard-profile ${
                profileOpen
                  ? "active"
                  : ""
              }`}
              aria-expanded={profileOpen}
              onClick={toggleProfile}
            >
              <span className="dashboard-profile-avatar">
                {avatarLetter}
              </span>

              <span className="dashboard-profile-name">
                {userName}
              </span>

              {profileOpen ? (
                <ChevronUp
                  size={14}
                  strokeWidth={1.8}
                />
              ) : (
                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                />
              )}
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-user">
                  <div className="profile-dropdown-name-row">
                    <strong>
                      {userName}
                    </strong>

                    <span className="profile-admin-badge">
                      {userRole}
                    </span>
                  </div>

                  <span className="profile-dropdown-email">
                    {userEmail}
                  </span>

                  <span className="profile-dropdown-company">
                    {companyName}
                  </span>

                  {demoMode && (
                    <div className="profile-trial-status">
                      <Clock3
                        size={14}
                        strokeWidth={1.7}
                      />

                      <span>
                        Туршилт дата холбоход
                        эхэлнэ
                      </span>
                    </div>
                  )}
                </div>

                <div className="profile-dropdown-divider" />

                <div className="profile-dropdown-menu">
                  <button
                    type="button"
                    className="profile-dropdown-item"
                    onClick={
                      handleProfile
                    }
                  >
                    <UserRound
                      size={17}
                      strokeWidth={1.7}
                    />

                    <span>
                      Миний профайл
                    </span>
                  </button>

                  <button
                    type="button"
                    className="profile-dropdown-item"
                    onClick={
                      handleSettings
                    }
                  >
                    <Settings
                      size={17}
                      strokeWidth={1.7}
                    />

                    <span>
                      Тохиргоо
                    </span>
                  </button>

                  <button
                    type="button"
                    className="profile-dropdown-item"
                    onClick={
                      handleBilling
                    }
                  >
                    <CreditCard
                      size={17}
                      strokeWidth={1.7}
                    />

                    <span>
                      Багц & Төлбөр
                    </span>
                  </button>

                  <div className="profile-language-row">
                    <div className="profile-language-label">
                      <Globe2
                        size={17}
                        strokeWidth={1.7}
                      />

                      <span>
                        Хэл
                      </span>
                    </div>

                    <div className="profile-language-switch">
                      <button
                        type="button"
                        className={
                          language === "mn"
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          changeLanguage(
                            "mn"
                          )
                        }
                      >
                        Монгол
                      </button>

                      <button
                        type="button"
                        className={
                          language === "en"
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          changeLanguage(
                            "en"
                          )
                        }
                      >
                        English
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="profile-dropdown-item"
                    onClick={handleHelp}
                  >
                    <CircleHelp
                      size={17}
                      strokeWidth={1.7}
                    />

                    <span>
                      Тусламж & дэмжлэг
                    </span>
                  </button>
                </div>

                <div className="profile-dropdown-divider" />

                <button
                  type="button"
                  className="profile-logout"
                  onClick={handleLogout}
                >
                  <LogOut
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>
                    Гарах
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;