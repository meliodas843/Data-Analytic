import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Signup.css";

const API_URL =
  "http://localhost:5000/api";

function Signup() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      companyName: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      industry: "",
      terms: false,
    });

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const industries = [
    "Эм зүйн бүтээгдэхүүн",
    "Санхүү, банк",
    "Худалдаа",
    "Үйлдвэрлэл",
    "Барилга",
    "Тээвэр, логистик",
    "Мэдээллийн технологи",
    "Эрүүл мэнд",
    "Боловсрол",
    "Зочид буудал, аялал жуулчлал",
    "Хөдөө аж ахуй",
    "Бусад",
  ];

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

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (
        form.password !==
        form.confirmPassword
      ) {
        throw new Error(
          "Нууц үг таарахгүй байна."
        );
      }

      if (
        form.password.length < 6
      ) {
        throw new Error(
          "Нууц үг хамгийн багадаа 6 тэмдэгт байна."
        );
      }

      if (!form.industry) {
        throw new Error(
          "Салбар сонгоно уу."
        );
      }

      if (!form.terms) {
        throw new Error(
          "Үйлчилгээний нөхцөлийг зөвшөөрнө үү."
        );
      }

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

                industry:
                  form.industry,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Бүртгэл үүсгэхэд алдаа гарлаа."
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      navigate("/setup");
    } catch (err) {
      console.error(
        "Signup error:",
        err
      );

      setError(
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-heading">
          <h1>
            Бүртгүүлэх
          </h1>

          <p>
            14 хоног үнэгүй турших
          </p>
        </div>

        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >
          <div className="signup-field">
            <label>
              Компанийн нэр *
            </label>

            <input
              type="text"
              name="companyName"
              value={
                form.companyName
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="signup-field">
            <label>
              Таны нэр *
            </label>

            <input
              type="text"
              name="fullName"
              value={
                form.fullName
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="signup-field">
            <label>
              И-мэйл *
            </label>

            <input
              type="email"
              name="email"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="signup-field">
            <label>
              Утасны дугаар
            </label>

            <input
              type="tel"
              name="phone"
              value={
                form.phone
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="signup-field">
            <label>
              Нууц үг *
            </label>

            <div className="signup-password-wrapper">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                required
              />

              <button
                type="button"
                className="signup-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (prev) =>
                      !prev
                  )
                }
              >
                👁
              </button>
            </div>
          </div>

          <div className="signup-field">
            <label>
              Нууц үг давтах *
            </label>

            <div className="signup-password-wrapper">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={
                  form.confirmPassword
                }
                onChange={
                  handleChange
                }
                required
              />

              <button
                type="button"
                className="signup-password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) =>
                      !prev
                  )
                }
              >
                👁
              </button>
            </div>
          </div>

          <div className="signup-field">
            <label>
              Салбар сонгох *
            </label>

            <select
              name="industry"
              value={
                form.industry
              }
              onChange={
                handleChange
              }
              required
            >
              <option value="">
                Салбар сонгоно уу
              </option>

              {industries.map(
                (industry) => (
                  <option
                    key={
                      industry
                    }
                    value={
                      industry
                    }
                  >
                    {industry}
                  </option>
                )
              )}
            </select>
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
            />

            <span>
              Үйлчилгээний нөхцөлийг
              зөвшөөрч байна
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
            disabled={
              loading
            }
          >
            {loading
              ? "Бүртгэж байна..."
              : "Бүртгүүлэх"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;