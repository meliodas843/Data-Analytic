import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/logo-default.svg";
import { Mail } from "lucide-react";

import "../styles/VerifyEmail.css";

function DataViewLogo() {
  return (
    <div className="verify-brand">
      <img
        src={logo}
        alt="DataView"
        className="navbar-logo-image"
      />
    </div>
  );
}

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    sessionStorage.getItem(
      "verificationEmail"
    ) ||
    "demo@company.mn";

  const [code, setCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] =
    useState(false);

  const [seconds, setSeconds] =
    useState(43);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) =>
        Math.max(prev - 1, 0)
      );
    }, 1000);

    return () =>
      clearTimeout(timer);
  }, [seconds]);

  const handleChange = (
    index,
    value
  ) => {
    const number = value
      .replace(/\D/g, "")
      .slice(0, 1);

    const nextCode = [...code];

    nextCode[index] = number;

    setCode(nextCode);
    setError("");
    setMessage("");

    if (
      number &&
      index < code.length - 1
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (
    index,
    event
  ) => {
    if (
      event.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();

      return;
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();

      return;
    }

    if (
      event.key === "ArrowRight" &&
      index < code.length - 1
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedCode =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedCode) {
      return;
    }

    const nextCode =
      Array(6).fill("");

    pastedCode
      .split("")
      .forEach(
        (number, index) => {
          nextCode[index] = number;
        }
      );

    setCode(nextCode);
    setError("");
    setMessage("");

    const focusIndex = Math.min(
      pastedCode.length,
      6
    ) - 1;

    inputRefs.current[
      Math.max(focusIndex, 0)
    ]?.focus();
  };

  const handleVerify = async () => {
    const verificationCode =
      code.join("");

    if (
      verificationCode.length !== 6
    ) {
      setError(
        "6 оронтой код оруулна уу."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      /*
        BACKEND ОДОО ХОЛБОГДООГҮЙ.

        Тиймээс одоогоор ямар ч
        /api/auth/verify-email request
        явуулахгүй.

        Backend бэлэн болсон үед
        энд fetch() нэмнэ.
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      /*
        Setup.jsx token шалгадаг бол
        development үед temporary token
        ашиглаж болно.

        Жинхэнэ backend холбоход үүнийг
        data.token-оор солино.
      */

      localStorage.setItem(
        "token",
        "development-token"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          verified: true,
        })
      );

      sessionStorage.removeItem(
        "verificationEmail"
      );

      navigate("/setup", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message ||
          "Баталгаажуулах үед алдаа гарлаа."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (seconds > 0) {
      return;
    }

    setCode([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setSeconds(60);

    setError("");

    setMessage(
      "Баталгаажуулах код дахин илгээгдлээ."
    );

    setTimeout(() => {
      inputRefs.current[
        0
      ]?.focus();
    }, 50);
  };

  const handleChangeEmail = () => {
    sessionStorage.removeItem(
      "verificationEmail"
    );

    navigate("/signup");
  };

  const complete = code.every(
    (number) => number !== ""
  );

  return (
    <main className="verify-page">
      <div className="verify-container">
        <DataViewLogo />

        <section className="verify-card">
          <div className="verify-mail-icon">
            <Mail
              size={27}
              strokeWidth={2}
            />
          </div>

          <h1>
            Имэйлээ баталгаажуулна уу
          </h1>

          <p className="verify-description">
            <strong>
              {email}
            </strong>

            {" "}
            хаяг руу 6 оронтой код
            илгээлээ
          </p>

          <div
            className="verify-code"
            onPaste={handlePaste}
          >
            {code.map(
              (
                digit,
                index
              ) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[
                      index
                    ] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleChange(
                      index,
                      event.target.value
                    )
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(
                      index,
                      event
                    )
                  }
                  autoFocus={
                    index === 0
                  }
                  aria-label={`Код ${
                    index + 1
                  }`}
                />
              )
            )}
          </div>

          {error && (
            <div className="verify-error">
              {error}
            </div>
          )}

          {message && (
            <div className="verify-success">
              {message}
            </div>
          )}

          <button
            type="button"
            className="verify-submit"
            disabled={
              !complete ||
              loading
            }
            onClick={
              handleVerify
            }
          >
            {loading
              ? "Баталгаажуулж байна..."
              : "Баталгаажуулах"}
          </button>

          <div className="verify-actions">
            <div className="verify-resend">
              <span>
                Код дахин илгээх
              </span>

              {seconds > 0 ? (
                <strong>
                  (
                  {`0:${String(
                    seconds
                  ).padStart(
                    2,
                    "0"
                  )}`}
                  )
                </strong>
              ) : (
                <button
                  type="button"
                  onClick={
                    handleResend
                  }
                >
                  Дахин илгээх
                </button>
              )}
            </div>

            <button
              type="button"
              className="verify-change-email"
              onClick={
                handleChangeEmail
              }
            >
              И-мэйл хаяг солих
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default VerifyEmail;