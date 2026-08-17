import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/VerifyEmail.css";

const API_URL =
  "http://localhost:5000/api";

function VerifyEmail() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const email =
    location.state?.email ||
    sessionStorage.getItem(
      "verificationEmail"
    ) ||
    "";

  const [code, setCode] =
    useState([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    resendLoading,
    setResendLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    seconds,
    setSeconds,
  ] = useState(60);

  const inputRefs =
    useRef([]);

  useEffect(() => {
    if (!email) {
      navigate(
        "/signup",
        {
          replace: true,
        }
      );
    }
  }, [
    email,
    navigate,
  ]);

  useEffect(() => {
    if (
      seconds <= 0
    ) {
      return;
    }

    const timer =
      setInterval(
        () => {
          setSeconds(
            (prev) =>
              prev - 1
          );
        },
        1000
      );

    return () =>
      clearInterval(
        timer
      );
  }, [seconds]);

  const handleChange = (
    index,
    value
  ) => {
    const numericValue =
      value.replace(
        /\D/g,
        ""
      );

    if (
      numericValue.length >
      1
    ) {
      return;
    }

    const next =
      [...code];

    next[index] =
      numericValue;

    setCode(next);

    setError("");

    if (
      numericValue &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (
    index,
    e
  ) => {
    if (
      e.key ===
        "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }
  };

  const handlePaste = (
    e
  ) => {
    e.preventDefault();

    const pasted =
      e.clipboardData
        .getData("text")
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          6
        );

    if (!pasted) {
      return;
    }

    const next =
      Array(6).fill("");

    pasted
      .split("")
      .forEach(
        (
          digit,
          index
        ) => {
          next[index] =
            digit;
        }
      );

    setCode(next);

    inputRefs.current[
      Math.min(
        pasted.length,
        5
      )
    ]?.focus();
  };

  const handleVerify =
    async () => {
      try {
        setLoading(true);
        setError("");

        const verificationCode =
          code.join("");

        if (
          verificationCode
            .length !== 6
        ) {
          throw new Error(
            "6 оронтой код оруулна уу."
          );
        }

        const response =
          await fetch(
            `${API_URL}/auth/verify-email`,
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  {
                    email,
                    code:
                      verificationCode,
                  }
                ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.message ||
              "Код буруу байна."
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

        sessionStorage.removeItem(
          "verificationEmail"
        );

        navigate(
          "/company-setup"
        );
      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setLoading(false);
      }
    };

  const resendCode =
    async () => {
      try {
        setResendLoading(
          true
        );

        setError("");

        const response =
          await fetch(
            `${API_URL}/auth/resend-verification`,
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  {
                    email,
                  }
                ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.message ||
              "Код дахин илгээж чадсангүй."
          );
        }

        setSeconds(60);
        setCode([
          "",
          "",
          "",
          "",
          "",
          "",
        ]);

        inputRefs.current[
          0
        ]?.focus();
      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setResendLoading(
          false
        );
      }
    };

  const complete =
    code.every(
      (item) =>
        item !== ""
    );

  return (
    <div className="verify-page">

      <div className="verify-brand">
        <span className="verify-brand-icon">
          📊
        </span>

        <strong>
          DATAVIEW MONGOLIA
        </strong>
      </div>

      <div className="verify-card">

        <div className="verify-mail-icon">
          ✉️
        </div>

        <h1>
          И-мэйл шалгана уу
        </h1>

        <p>
          <strong>
            {email}
          </strong>{" "}
          хаяг руу
          баталгаажуулах код
          илгээлээ
        </p>

        <div
          className="verify-code"
          onPaste={
            handlePaste
          }
        >
          {code.map(
            (
              digit,
              index
            ) => (
              <input
                key={
                  index
                }
                ref={(
                  element
                ) => {
                  inputRefs.current[
                    index
                  ] =
                    element;
                }}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={
                  digit
                }
                onChange={(
                  e
                ) =>
                  handleChange(
                    index,
                    e.target
                      .value
                  )
                }
                onKeyDown={(
                  e
                ) =>
                  handleKeyDown(
                    index,
                    e
                  )
                }
                autoFocus={
                  index === 0
                }
              />
            )
          )}
        </div>

        {error && (
          <div className="verify-error">
            {error}
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
            ? "Шалгаж байна..."
            : "Баталгаажуулах"}
        </button>

        <div className="verify-resend">

          <span>
            Код ирээгүй юу?
          </span>

          {seconds > 0 ? (
            <span>
              Дахин илгээх
              ({seconds}с)
            </span>
          ) : (
            <button
              type="button"
              onClick={
                resendCode
              }
              disabled={
                resendLoading
              }
            >
              {resendLoading
                ? "Илгээж байна..."
                : "Дахин илгээх"}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default VerifyEmail;