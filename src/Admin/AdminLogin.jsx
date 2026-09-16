import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      navigate("/admin");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-wrapper">
        <div className="admin-login-brand">
          <div className="admin-login-logo">
            DV
          </div>

          <div>
            <h1>DataView</h1>

            <span>
              Удирдлагын систем
            </span>
          </div>
        </div>

        <form
          className="admin-login-card"
          onSubmit={handleSubmit}
        >
          <div className="admin-login-heading">
            <h2>
              Админ нэвтрэх
            </h2>

            <p>
              Удирдлагын хэсэгт нэвтрэхийн тулд
              мэдээллээ оруулна уу.
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
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Имэйл хаягаа оруулна уу"
              autoComplete="email"
              required
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
                onChange={(e) =>
                  setPassword(
                    e.target.value,
                  )
                }
                placeholder="Нууц үгээ оруулна уу"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (current) =>
                      !current,
                  )
                }
                title={
                  showPassword
                    ? "Нууц үг нуух"
                    : "Нууц үг харах"
                }
              >
                {showPassword
                  ? "◉"
                  : "○"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-button"
          >
            Нэвтрэх
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