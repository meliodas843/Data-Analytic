import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import "../styles/Login.css";

function DataViewLogo() {
  return (
    <div className="auth-brand">
      <div className="auth-brand-icon">
        <span />
        <span />
        <span />
      </div>

      <span className="auth-brand-name">
        DataView Mongolia
      </span>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] =
    useState("login");

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  const handleReset = (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      return;
    }

    console.log(
      "Reset password:",
      form.email
    );
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <DataViewLogo />

        {mode === "login" ? (
          <section className="login-card">
            <div className="login-heading">
              <h1>Нэвтрэх</h1>

              <p>
                Dashboard-даа нэвтэрнэ үү
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleLogin}
            >
              <div className="login-field">
                <label htmlFor="email">
                  И-мэйл
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="demo@company.mn"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="password">
                    Нууц үг
                  </label>

                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() =>
                      setMode("forgot")
                    }
                  >
                    Нууц үгээ мартсан?
                  </button>
                </div>

                <div className="login-password">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-eye"
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
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-submit"
              >
                Нэвтрэх
              </button>
            </form>

            <div className="login-register">
              <span>
                Бүртгэлгүй юу?
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate("/signup")
                }
              >
                Үнэгүй бүртгүүлэх
              </button>
            </div>
          </section>
        ) : (
          <section className="login-card forgot-card">
            <button
              type="button"
              className="back-to-login"
              onClick={() =>
                setMode("login")
              }
            >
              <ArrowLeft size={17} />

              <span>Нэвтрэх</span>
            </button>

            <div className="login-heading forgot-heading">
              <h1>Нууц үг сэргээх</h1>

              <p>
                Бүртгэлтэй и-мэйл рүү
                сэргээх холбоос илгээнэ
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleReset}
            >
              <div className="login-field">
                <input
                  type="email"
                  name="email"
                  placeholder="demo@company.mn"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={!form.email.trim()}
              >
                Холбоос илгээх
              </button>
            </form>
          </section>
        )}

        <button
          type="button"
          className="invitation-example"
        >
          Урилгын холбоосын жишээ харах
        </button>
      </div>
    </main>
  );
}

export default Login;