import { useState } from "react";
import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import Navbar from "./Navbar";

import "../styles/Login.css";

const API_URL =
  "http://localhost:5000/api";

function Login() {
  const navigate =
    useNavigate();

  const [
    mode,
    setMode,
  ] = useState("login");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState({
    email: "",
    password: "",
  });

  const [
    error,
    setError,
  ] = useState("");

  const [
    resetMessage,
    setResetMessage,
  ] = useState("");

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

    setError("");
    setResetMessage("");
  };

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const email =
      form.email
        .trim()
        .toLowerCase();

    const password =
      form.password;

    if (
      !email ||
      !password
    ) {
      setError(
        "Имэйл болон нууц үгээ оруулна уу."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          `${API_URL}/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                email,
                password,
              }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.message ||
            "Имэйл хаяг эсвэл нууц үг буруу байна."
        );

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(
          data.user
        )
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
        "Сервертэй холбогдож чадсангүй."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (
    e
  ) => {
    e.preventDefault();

    setError("");
    setResetMessage("");

    const email =
      form.email
        .trim()
        .toLowerCase();

    if (!email) {
      setError(
        "Имэйл хаягаа оруулна уу."
      );

      return;
    }

    setResetMessage(
      "Нууц үг сэргээх хүсэлтийг дараагийн алхамд backend-тэй холбоно."
    );
  };

  const openForgotPassword =
    () => {
      setMode("forgot");
      setError("");
      setResetMessage("");
    };

  const backToLogin =
    () => {
      setMode("login");
      setError("");
      setResetMessage("");
    };

  return (
    <>
      <Navbar />

      <main className="login-page">
        <div className="login-container">
          {mode === "login" ? (
            <section className="login-card">
              <div className="login-heading">
                <h1>
                  Нэвтрэх
                </h1>

                <p>
                  Dashboard-даа
                  нэвтэрнэ үү
                </p>
              </div>

              <form
                className="login-form"
                onSubmit={
                  handleLogin
                }
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
                    value={
                      form.email
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="email"
                    disabled={
                      loading
                    }
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
                      onClick={
                        openForgotPassword
                      }
                      disabled={
                        loading
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
                      value={
                        form.password
                      }
                      onChange={
                        handleChange
                      }
                      autoComplete="current-password"
                      disabled={
                        loading
                      }
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
                          ? "Нууц үг нуух"
                          : "Нууц үг харах"
                      }
                      disabled={
                        loading
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          size={19}
                        />
                      ) : (
                        <Eye
                          size={19}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    className="login-error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-submit"
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? "Нэвтэрч байна..."
                    : "Нэвтрэх"}
                </button>
              </form>

              <div className="login-register">
                <span>
                  Бүртгэлгүй юу?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/signup"
                    )
                  }
                  disabled={
                    loading
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
                onClick={
                  backToLogin
                }
              >
                <ArrowLeft
                  size={17}
                />

                <span>
                  Нэвтрэх
                </span>
              </button>

              <div className="login-heading forgot-heading">
                <h1>
                  Нууц үг сэргээх
                </h1>

                <p>
                  Бүртгэлтэй
                  и-мэйл рүү сэргээх
                  холбоос илгээнэ
                </p>
              </div>

              <form
                className="login-form"
                onSubmit={
                  handleReset
                }
              >
                <div className="login-field">
                  <label htmlFor="reset-email">
                    И-мэйл
                  </label>

                  <input
                    id="reset-email"
                    type="email"
                    name="email"
                    value={
                      form.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="demo@company.mn"
                    autoComplete="email"
                    required
                  />
                </div>

                {error && (
                  <div
                    className="login-error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                {resetMessage && (
                  <div
                    className="login-success"
                    role="status"
                  >
                    {resetMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-submit"
                >
                  Сэргээх холбоос
                  илгээх
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