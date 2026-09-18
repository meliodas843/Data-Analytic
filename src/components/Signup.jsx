import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
} from "lucide-react";

import logo from "../assets/logo-default.svg";
import "../styles/Signup.css";

function DataViewLogo() {
  return (
    <div className="signup-brand">
      <img
        src={logo}
        alt="DataView"
        className="navbar-logo-image"
      />
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");
  };

  const getSavedUsers = () => {
    try {
      const users = JSON.parse(
        localStorage.getItem("users") ||
          "[]"
      );

      return Array.isArray(users)
        ? users
        : [];
    } catch {
      return [];
    }
  };

  const generateUserId = () => {
    if (
      typeof crypto !== "undefined" &&
      crypto.randomUUID
    ) {
      return crypto.randomUUID();
    }

    return `user-${Date.now()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const companyName =
        form.companyName.trim();

      const fullName =
        form.fullName.trim();

      const email = form.email
        .trim()
        .toLowerCase();

      const phone = form.phone
        .replace(/\s+/g, "")
        .trim();

      const password = form.password;

      if (!companyName) {
        throw new Error(
          "Байгууллагын нэрээ оруулна уу."
        );
      }

      if (!fullName) {
        throw new Error(
          "Нэрээ оруулна уу."
        );
      }

      if (!email) {
        throw new Error(
          "И-мэйл хаягаа оруулна уу."
        );
      }

      if (!phone) {
        throw new Error(
          "Утасны дугаараа оруулна уу."
        );
      }

      if (!/^\d{8}$/.test(phone)) {
        throw new Error(
          "Утасны дугаар 8 оронтой байна."
        );
      }

      if (password.length < 8) {
        throw new Error(
          "Нууц үг хамгийн багадаа 8 тэмдэгт байна."
        );
      }

      if (!/[A-Za-zА-Яа-яӨөҮүЁё]/.test(password)) {
        throw new Error(
          "Нууц үг дор хаяж нэг үсэг агуулсан байна."
        );
      }

      if (!/\d/.test(password)) {
        throw new Error(
          "Нууц үг дор хаяж нэг тоо агуулсан байна."
        );
      }

      if (!form.terms) {
        throw new Error(
          "Үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрнө үү."
        );
      }

      const users =
        getSavedUsers();

      const emailExists =
        users.some(
          (user) =>
            user.email
              ?.trim()
              .toLowerCase() === email
        );

      if (emailExists) {
        throw new Error(
          "Энэ и-мэйл хаягаар бүртгэл үүссэн байна. Нэвтэрнэ үү."
        );
      }

      const newUser = {
        id: generateUserId(),
        companyName,
        company: companyName,
        fullName,
        name: fullName,
        email,
        phone: `+976${phone}`,
        password,
        role: "admin",
        emailVerified: false,
        createdAt:
          new Date().toISOString(),
      };

      const updatedUsers = [
        ...users,
        newUser,
      ];

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      localStorage.setItem(
        "pendingVerificationEmail",
        email
      );

      navigate("/verify-email", {
        state: {
          email,
        },
      });
    } catch (err) {
      setError(
        err?.message ||
          "Бүртгэл үүсгэхэд алдаа гарлаа."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container">
        <DataViewLogo />

        <section className="signup-card">
          <div className="signup-heading">
            <h1>Бүртгүүлэх</h1>

            <p>
              14 хоног үнэгүй туршилт ·
              Карт шаардахгүй
            </p>
          </div>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
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
                value={form.companyName}
                onChange={handleChange}
                autoComplete="organization"
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
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
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
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
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
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
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
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="signup-eye"
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

              <span className="password-help">
                8+ тэмдэгт, үсэг ба тоо
              </span>
            </div>

            <label className="signup-terms">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />

              <span className="custom-checkbox" />

              <span>
                <button
                  type="button"
                  className="terms-link"
                >
                  Үйлчилгээний нөхцөл
                </button>

                {" "}болон{" "}

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
              disabled={loading}
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
                navigate("/login")
              }
            >
              Нэвтрэх
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;