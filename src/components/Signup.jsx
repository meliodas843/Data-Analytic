import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
} from "lucide-react";

import "../styles/Signup.css";

function DataViewLogo() {
  return (
    <div className="signup-brand">
      <div className="signup-brand-icon">
        <span />
        <span />
        <span />
      </div>

      <span className="signup-brand-name">
        DataView Mongolia
      </span>
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (form.password.length < 8) {
        throw new Error(
          "Нууц үг хамгийн багадаа 8 тэмдэгт байна."
        );
      }

      if (!form.terms) {
        throw new Error(
          "Үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрнө үү."
        );
      }

      /*
        Backend холбоход энд API request хийнэ.

        Жишээ:
        const response = await fetch(
          "/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              companyName:
                form.companyName,
              fullName:
                form.fullName,
              email:
                form.email,
              phone:
                form.phone,
              password:
                form.password,
            }),
          }
        );
      */

      navigate("/verify-email", {
        state: {
          email: form.email,
        },
      });
    } catch (err) {
      setError(err.message);
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
              <div className="signup-error">
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