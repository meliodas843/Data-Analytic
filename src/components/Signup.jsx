import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Navbar from "./Navbar";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Signup.css";

const API_URL = "/api";

function Signup() {
  const navigate = useNavigate();
  const languageContext = useLanguage();

  const language =
    languageContext?.language ||
    languageContext?.lang ||
    "en";

  const isMongolian =
    language === "mn";

  const translations = {
    en: {
      title: "Sign Up",
      companyName: "Company Name",
      companyPlaceholder:
        "Mongolian Company LLC",
      fullName: "Your Name",
      fullNamePlaceholder: "John Doe",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      passwordHelp:
        "8+ characters, letters and numbers",
      hidePassword: "Hide password",
      showPassword: "Show password",
      terms: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy",
      accept: "I agree to the",
      signingUp:
        "Creating account...",
      signup: "Sign Up",
      skip: "Skip",
      skipping:
        "Opening demo...",
      alreadyRegistered:
        "Already have an account?",
      login: "Log In",
      companyRequired:
        "Please enter your company name.",
      nameRequired:
        "Please enter your name.",
      emailRequired:
        "Please enter your email address.",
      phoneRequired:
        "Please enter your phone number.",
      phoneInvalid:
        "Phone number must contain 8 digits.",
      passwordLength:
        "Password must contain at least 8 characters.",
      passwordLetter:
        "Password must contain at least one letter.",
      passwordNumber:
        "Password must contain at least one number.",
      termsRequired:
        "Please agree to the Terms of Service and Privacy Policy.",
      invalidBackend:
        "The server returned an invalid response.",
      signupError:
        "An error occurred while creating your account.",
      demoError:
        "Could not open the demo account.",
      serverError:
        "Could not connect to the server.",
    },

    mn: {
      title: "Бүртгүүлэх",
      companyName:
        "Байгууллагын нэр",
      companyPlaceholder:
        "Монголын Компани ХХК",
      fullName: "Таны нэр",
      fullNamePlaceholder:
        "Бат-Эрдэнэ",
      email: "И-мэйл",
      phone: "Утасны дугаар",
      password: "Нууц үг",
      passwordHelp:
        "8+ тэмдэгт, үсэг ба тоо",
      hidePassword:
        "Нууц үг нуух",
      showPassword:
        "Нууц үг харах",
      terms:
        "Үйлчилгээний нөхцөл",
      and: "болон",
      privacy:
        "Нууцлалын бодлого",
      accept:
        "-ыг зөвшөөрч байна",
      signingUp:
        "Бүртгэж байна...",
      signup: "Бүртгүүлэх",
      skip: "Алгасах",
      skipping:
        "Демо нээж байна...",
      alreadyRegistered:
        "Бүртгэлтэй юу?",
      login: "Нэвтрэх",
      companyRequired:
        "Байгууллагын нэрээ оруулна уу.",
      nameRequired:
        "Нэрээ оруулна уу.",
      emailRequired:
        "И-мэйл хаягаа оруулна уу.",
      phoneRequired:
        "Утасны дугаараа оруулна уу.",
      phoneInvalid:
        "Утасны дугаар 8 оронтой байна.",
      passwordLength:
        "Нууц үг хамгийн багадаа 8 тэмдэгт байна.",
      passwordLetter:
        "Нууц үг дор хаяж нэг үсэг агуулсан байна.",
      passwordNumber:
        "Нууц үг дор хаяж нэг тоо агуулсан байна.",
      termsRequired:
        "Үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрнө үү.",
      invalidBackend:
        "Backend буруу хариу буцаалаа.",
      signupError:
        "Бүртгэл үүсгэхэд алдаа гарлаа.",
      demoError:
        "Демо хэрэглэгчээр нэвтэрч чадсангүй.",
      serverError:
        "Backend сервертэй холбогдож чадсангүй.",
    },
  };

  const t =
    isMongolian
      ? translations.mn
      : translations.en;

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    skipLoading,
    setSkipLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [form, setForm] =
    useState({
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

  const saveLoginData = (
    data
  ) => {
    if (data?.token) {
      localStorage.setItem(
        "token",
        data.token
      );
    }

    if (data?.user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(
          data.user
        )
      );
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "subscription",
      JSON.stringify(
        data?.subscription || {
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
  };

  const handleSkip =
    async () => {
      try {
        setSkipLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/auth/demo-login`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              t.demoError
          );
        }

        saveLoginData(data);

        localStorage.setItem(
          "usingDemoData",
          "true"
        );

        localStorage.setItem(
          "dataConnected",
          "false"
        );

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );
      } catch (err) {
        console.error(
          "DEMO LOGIN ERROR:",
          err
        );

        setError(
          err?.message ||
            t.demoError
        );
      } finally {
        setSkipLoading(false);
      }
    };

  const handleSubmit =
    async (e) => {
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
          t.companyRequired
        );
        return;
      }

      if (!fullName) {
        setError(
          t.nameRequired
        );
        return;
      }

      if (!email) {
        setError(
          t.emailRequired
        );
        return;
      }

      if (!phone) {
        setError(
          t.phoneRequired
        );
        return;
      }

      if (
        !/^\d{8}$/.test(
          phone
        )
      ) {
        setError(
          t.phoneInvalid
        );
        return;
      }

      if (
        password.length < 8
      ) {
        setError(
          t.passwordLength
        );
        return;
      }

      if (
        !/[A-Za-zА-Яа-яӨөҮүЁё]/.test(
          password
        )
      ) {
        setError(
          t.passwordLetter
        );
        return;
      }

      if (
        !/\d/.test(password)
      ) {
        setError(
          t.passwordNumber
        );
        return;
      }

      if (!form.terms) {
        setError(
          t.termsRequired
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

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              t.signupError
          );
        }

        saveLoginData(data);

        localStorage.removeItem(
          "usingDemoData"
        );

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );
      } catch (err) {
        console.error(
          "SIGNUP ERROR:",
          err
        );

        setError(
          err?.message ||
            t.signupError
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
                {t.title}
              </h1>
            </div>

            <form
              className="signup-form"
              onSubmit={
                handleSubmit
              }
            >
              <div className="signup-field">
                <label htmlFor="companyName">
                  {t.companyName}
                  <b>*</b>
                </label>

                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  placeholder={
                    t.companyPlaceholder
                  }
                  value={
                    form.companyName
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    loading ||
                    skipLoading
                  }
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="fullName">
                  {t.fullName}
                  <b>*</b>
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder={
                    t.fullNamePlaceholder
                  }
                  value={
                    form.fullName
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    loading ||
                    skipLoading
                  }
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="signupEmail">
                  {t.email}
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
                  disabled={
                    loading ||
                    skipLoading
                  }
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="phone">
                  {t.phone}
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
                    disabled={
                      loading ||
                      skipLoading
                    }
                    required
                  />
                </div>
              </div>

              <div className="signup-field">
                <label htmlFor="signupPassword">
                  {t.password}
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
                    disabled={
                      loading ||
                      skipLoading
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
                  {t.passwordHelp}
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
                />

                <span className="custom-checkbox" />

                <span>
                  {isMongolian ? (
                    <>
                      <button
                        type="button"
                        className="terms-link"
                      >
                        {t.terms}
                      </button>

                      {" "}
                      {t.and}
                      {" "}

                      <button
                        type="button"
                        className="terms-link"
                      >
                        {t.privacy}
                      </button>

                      {" "}
                      {t.accept}
                    </>
                  ) : (
                    <>
                      {t.accept}
                      {" "}

                      <button
                        type="button"
                        className="terms-link"
                      >
                        {t.terms}
                      </button>

                      {" "}
                      {t.and}
                      {" "}

                      <button
                        type="button"
                        className="terms-link"
                      >
                        {t.privacy}
                      </button>
                    </>
                  )}
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
                  loading ||
                  skipLoading
                }
              >
                {loading
                  ? t.signingUp
                  : t.signup}
              </button>

              <button
                type="button"
                className="signup-skip"
                onClick={
                  handleSkip
                }
                disabled={
                  loading ||
                  skipLoading
                }
              >
                {skipLoading
                  ? t.skipping
                  : t.skip}
              </button>
            </form>

            <div className="signup-login-row">
              <span>
                {
                  t.alreadyRegistered
                }
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/login"
                  )
                }
              >
                {t.login}
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Signup;