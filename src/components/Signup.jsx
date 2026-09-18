import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
} from "lucide-react";

import Navbar from "./Navbar";

import "../styles/Signup.css";

const API_URL =
  "http://localhost:5000/api";

function Signup() {
  const navigate =
    useNavigate();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    form,
    setForm,
  ] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm(
      (prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );

    setError("");
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const companyName =
      form.companyName.trim();

    const fullName =
      form.fullName.trim();

    const email =
      form.email
        .trim()
        .toLowerCase();

    const phone =
      form.phone
        .replace(/\s+/g, "")
        .replace("+976", "")
        .trim();

    const password =
      form.password;

    if (!companyName) {
      setError(
        "Байгууллагын нэрээ оруулна уу."
      );

      return;
    }

    if (!fullName) {
      setError(
        "Нэрээ оруулна уу."
      );

      return;
    }

    if (!email) {
      setError(
        "И-мэйл хаягаа оруулна уу."
      );

      return;
    }

    if (!phone) {
      setError(
        "Утасны дугаараа оруулна уу."
      );

      return;
    }

    if (
      !/^\d{8}$/.test(phone)
    ) {
      setError(
        "Утасны дугаар 8 оронтой байна."
      );

      return;
    }

    if (
      password.length < 8
    ) {
      setError(
        "Нууц үг хамгийн багадаа 8 тэмдэгт байна."
      );

      return;
    }

    if (
      !/[A-Za-zА-Яа-яӨөҮүЁё]/.test(
        password
      )
    ) {
      setError(
        "Нууц үг дор хаяж нэг үсэг агуулсан байна."
      );

      return;
    }

    if (
      !/\d/.test(password)
    ) {
      setError(
        "Нууц үг дор хаяж нэг тоо агуулсан байна."
      );

      return;
    }

    if (!form.terms) {
      setError(
        "Үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрнө үү."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          `${API_URL}/auth/signup`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                companyName,
                fullName,
                email,
                phone:
                  `+976${phone}`,
                password,
              }),
          }
        );

      let data;

      try {
        data =
          await response.json();
      } catch {
        throw new Error(
          "Backend буруу хариу буцаалаа."
        );
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Бүртгэл үүсгэхэд алдаа гарлаа."
        );
      }

      localStorage.setItem(
        "pendingVerificationEmail",
        email
      );

      localStorage.setItem(
        "pendingSignupUser",
        JSON.stringify(
          data.user
        )
      );

      navigate(
        "/verify-email",
        {
          state: {
            email,
          },
        }
      );
    } catch (err) {
      console.error(
        "SIGNUP ERROR:",
        err
      );

      if (
        err instanceof TypeError
      ) {
        setError(
          "Backend сервертэй холбогдож чадсангүй. Сервер ажиллаж байгаа эсэхийг шалгана уу."
        );

        return;
      }

      setError(
        err?.message ||
          "Бүртгэл үүсгэхэд алдаа гарлаа."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="signup-page">
        <div className="signup-container">
          <section className="signup-card">
            <div className="signup-heading">
              <h1>
                Бүртгүүлэх
              </h1>

              <p>
                14 хоног үнэгүй туршилт ·
                Карт шаардахгүй
              </p>
            </div>

            <form
              className="signup-form"
              onSubmit={
                handleSubmit
              }
            >
              <div className="signup-field">
                <label htmlFor="companyName">
                  Байгууллагын нэр
                  <b>*</b>
                </label>

                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  placeholder="Монголын Компани ХХК"
                  value={
                    form.companyName
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="organization"
                  disabled={
                    loading
                  }
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="fullName">
                  Таны нэр
                  <b>*</b>
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Бат-Эрдэнэ"
                  value={
                    form.fullName
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="name"
                  disabled={
                    loading
                  }
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="signupEmail">
                  И-мэйл
                  <b>*</b>
                </label>

                <input
                  id="signupEmail"
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

              <div className="signup-field">
                <label htmlFor="phone">
                  Утасны дугаар
                  <b>*</b>
                </label>

                <div className="phone-input">
                  <div className="phone-code">
                    +976
                  </div>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    placeholder="9911 2233"
                    value={
                      form.phone
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="tel"
                    disabled={
                      loading
                    }
                    required
                  />
                </div>
              </div>

              <div className="signup-field">
                <label htmlFor="signupPassword">
                  Нууц үг
                  <b>*</b>
                </label>

                <div className="signup-password">
                  <input
                    id="signupPassword"
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
                    autoComplete="new-password"
                    disabled={
                      loading
                    }
                    required
                  />

                  <button
                    type="button"
                    className="signup-eye"
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

                <span className="password-help">
                  8+ тэмдэгт, үсэг ба тоо
                </span>
              </div>

              <label className="signup-terms">
                <input
                  type="checkbox"
                  name="terms"
                  checked={
                    form.terms
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    loading
                  }
                />

                <span className="custom-checkbox" />

                <span>
                  <button
                    type="button"
                    className="terms-link"
                  >
                    Үйлчилгээний нөхцөл
                  </button>

                  {" "}
                  болон
                  {" "}

                  <button
                    type="button"
                    className="terms-link"
                  >
                    Нууцлалын бодлого
                  </button>

                  -ыг зөвшөөрч байна
                </span>
              </label>

              {error && (
                <div
                  className="signup-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="signup-submit"
                disabled={
                  loading
                }
              >
                {loading
                  ? "Бүртгэж байна..."
                  : "Бүртгүүлэх"}
              </button>
            </form>

            <div className="signup-login-row">
              <span>
                Бүртгэлтэй юу?
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/login"
                  )
                }
              >
                Нэвтрэх
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Signup;