import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import Navbar from "./Navbar";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Login.css";

const API_URL = "/api";

function Login() {
  const navigate = useNavigate();

  const languageContext = useLanguage();

  const language =
    languageContext?.language ||
    languageContext?.lang ||
    "en";

  const isMongolian = language === "mn";

  // =====================================================
  // TRANSLATIONS
  // =====================================================

  const translations = {
    en: {
      loginTitle: "Log In",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      hidePassword: "Hide password",
      showPassword: "Show password",
      loggingIn: "Logging in...",
      login: "Log In",

      noAccount: "Don't have an account?",
      register: "Sign Up",

      resetTitle: "Reset Password",
      resetDescription:
        "We will send a password reset link to your registered email address.",
      sendResetLink: "Send Reset Link",

      emailPasswordRequired:
        "Please enter your email and password.",
      invalidCredentials:
        "Incorrect email address or password.",
      serverError:
        "Could not connect to the server.",
      emailRequired:
        "Please enter your email address.",

      resetMessage:
        "The password reset request will be connected to the backend in the next step.",
    },

    mn: {
      loginTitle: "Нэвтрэх",
      email: "И-мэйл",
      password: "Нууц үг",
      forgotPassword: "Нууц үгээ мартсан?",
      hidePassword: "Нууц үг нуух",
      showPassword: "Нууц үг харах",
      loggingIn: "Нэвтэрч байна...",
      login: "Нэвтрэх",

      noAccount: "Бүртгэлгүй юу?",
      register: "Бүртгүүлэх",

      resetTitle: "Нууц үг сэргээх",
      resetDescription:
        "Бүртгэлтэй и-мэйл хаяг руу нууц үг сэргээх холбоос илгээнэ.",
      sendResetLink: "Сэргээх холбоос илгээх",

      emailPasswordRequired:
        "Имэйл болон нууц үгээ оруулна уу.",
      invalidCredentials:
        "Имэйл хаяг эсвэл нууц үг буруу байна.",
      serverError:
        "Сервертэй холбогдож чадсангүй.",
      emailRequired:
        "Имэйл хаягаа оруулна уу.",

      resetMessage:
        "Нууц үг сэргээх хүсэлтийг дараагийн алхамд backend-тэй холбоно.",
    },
  };

  const t = isMongolian
    ? translations.mn
    : translations.en;

  // =====================================================
  // STATE
  // =====================================================

  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] =
    useState("");

  const [resetMessage, setResetMessage] =
    useState("");

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setResetMessage("");
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const email = form.email
      .trim()
      .toLowerCase();

    const password = form.password;

    if (!email || !password) {
      setError(t.emailPasswordRequired);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        /*
         * Backend messages may be in one language.
         * Use translated frontend fallback when
         * backend doesn't provide a message.
         */
        setError(
          data.message ||
            t.invalidCredentials
        );

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "subscription",
        JSON.stringify(
          data.subscription || {
            subscribed: false,
            status: "none",
            plan: null,
          }
        )
      );

      window.dispatchEvent(
        new Event(
          "subscriptionChanged"
        )
      );

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      setError(
        t.serverError
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PASSWORD RESET
  // =====================================================

  const handleReset = (e) => {
    e.preventDefault();

    setError("");
    setResetMessage("");

    const email = form.email
      .trim()
      .toLowerCase();

    if (!email) {
      setError(
        t.emailRequired
      );

      return;
    }

    setResetMessage(
      t.resetMessage
    );
  };

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  const openForgotPassword = () => {
    setMode("forgot");

    setError("");
    setResetMessage("");
  };

  const backToLogin = () => {
    setMode("login");

    setError("");
    setResetMessage("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <Navbar />

      <main className="login-page">
        <div className="login-container">

          {mode === "login" ? (

            // =================================================
            // LOGIN CARD
            // =================================================

            <section className="login-card">

              <div className="login-heading">
                <h1>
                  {t.loginTitle}
                </h1>
              </div>

              <form
                className="login-form"
                onSubmit={handleLogin}
              >

                {/* EMAIL */}

                <div className="login-field">

                  <label htmlFor="email">
                    {t.email}
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="demo@company.mn"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={loading}
                    required
                  />

                </div>

                {/* PASSWORD */}

                <div className="login-field">

                  <div className="login-label-row">

                    <label htmlFor="password">
                      {t.password}
                    </label>

                    <button
                      type="button"
                      className="forgot-password-link"
                      onClick={
                        openForgotPassword
                      }
                      disabled={loading}
                    >
                      {t.forgotPassword}
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
                      autoComplete="current-password"
                      disabled={loading}
                      required
                    />

                    <button
                      type="button"
                      className="password-eye"
                      onClick={() =>
                        setShowPassword(
                          (prev) =>
                            !prev
                        )
                      }
                      aria-label={
                        showPassword
                          ? t.hidePassword
                          : t.showPassword
                      }
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* ERROR */}

                {error && (
                  <div
                    className="login-error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="login-submit"
                  disabled={loading}
                >
                  {loading
                    ? t.loggingIn
                    : t.login}
                </button>

              </form>

              {/* REGISTER */}

              <div className="login-register">

                <span>
                  {t.noAccount}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/signup"
                    )
                  }
                  disabled={loading}
                >
                  {t.register}
                </button>

              </div>

            </section>

          ) : (

            // =================================================
            // FORGOT PASSWORD CARD
            // =================================================

            <section className="login-card forgot-card">

              {/* BACK */}

              <button
                type="button"
                className="back-to-login"
                onClick={backToLogin}
              >
                <ArrowLeft size={17} />

                <span>
                  {t.login}
                </span>
              </button>

              {/* HEADING */}

              <div className="login-heading forgot-heading">

                <h1>
                  {t.resetTitle}
                </h1>

                <p>
                  {t.resetDescription}
                </p>

              </div>

              {/* RESET FORM */}

              <form
                className="login-form"
                onSubmit={handleReset}
              >

                <div className="login-field">

                  <label htmlFor="reset-email">
                    {t.email}
                  </label>

                  <input
                    id="reset-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="demo@company.mn"
                    autoComplete="email"
                    required
                  />

                </div>

                {/* ERROR */}

                {error && (
                  <div
                    className="login-error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                {/* SUCCESS */}

                {resetMessage && (
                  <div
                    className="login-success"
                    role="status"
                  >
                    {resetMessage}
                  </div>
                )}

                {/* RESET BUTTON */}

                <button
                  type="submit"
                  className="login-submit"
                >
                  {t.sendResetLink}
                </button>

              </form>

            </section>

          )}

        </div>
      </main>
    </>
  );
}

export default Login;