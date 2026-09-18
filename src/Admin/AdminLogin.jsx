import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin/AdminLogin.css";
import logo from "../assets/logo-default.svg";
import {
  Eye,
  EyeOff,
  CircleAlert,
} from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      setError(
        "Имэйл хаягаа оруулна уу."
      );
      return;
    }

    if (!password) {
      setError(
        "Нууц үгээ оруулна уу."
      );
      return;
    }

    setLoading(true);

    try {
      const ADMIN_EMAIL =
        "admin@gmail.com";

      const ADMIN_PASSWORD =
        "dataview123!";

      const isValidEmail =
        normalizedEmail ===
        ADMIN_EMAIL.toLowerCase();

      const isValidPassword =
        password === ADMIN_PASSWORD;

      if (
        !isValidEmail ||
        !isValidPassword
      ) {
        setError(
          "Имэйл хаяг эсвэл нууц үг буруу байна."
        );
        return;
      }

      const adminUser = {
        id: 1,
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "super_admin",
      };

      sessionStorage.setItem(
        "adminAuthenticated",
        "true"
      );

      sessionStorage.setItem(
        "adminUser",
        JSON.stringify(adminUser)
      );

      sessionStorage.setItem(
        "adminLastActivity",
        Date.now().toString()
      );

      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );

      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );
    } catch (err) {
      console.error(
        "Admin login error:",
        err
      );

      setError(
        "Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-wrapper">
        <div className="admin-login-brand">
          <img
            src={logo}
            alt="DataView"
            className="navbar-logo-image"
          />
        </div>

        <form
          className="admin-login-card"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="admin-login-heading">
            <h2>
              Админ нэвтрэх
            </h2>

            <p>
              Удирдлагын хэсэгт
              нэвтрэхийн тулд мэдээллээ
              оруулна уу.
            </p>
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-email">
              Имэйл хаяг
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={
                handleEmailChange
              }
              placeholder="Имэйл хаягаа оруулна уу"
              autoComplete="email"
              disabled={loading}
              className={
                error
                  ? "admin-input-error"
                  : ""
              }
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">
              Нууц үг
            </label>

            <div className="admin-password-input">
              <input
                id="admin-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={
                  handlePasswordChange
                }
                placeholder="Нууц үгээ оруулна уу"
                autoComplete="current-password"
                disabled={loading}
                className={
                  error
                    ? "admin-input-error"
                    : ""
                }
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showPassword
                    ? "Нууц үг нуух"
                    : "Нууц үг харах"
                }
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    strokeWidth={1.8}
                  />
                ) : (
                  <Eye
                    size={18}
                    strokeWidth={1.8}
                  />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              className="admin-login-error"
              role="alert"
            >
              <CircleAlert
                size={17}
                strokeWidth={2}
              />

              <span>
                {error}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading
              ? "Нэвтэрч байна..."
              : "Нэвтрэх"}
          </button>
        </form>

        <p className="admin-login-footer">
          © 2026 DataView
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;