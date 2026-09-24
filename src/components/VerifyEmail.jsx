import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-default.svg";
import { Mail } from "lucide-react";
import "../styles/VerifyEmail.css";

const API_URL = "/api";

function DataViewLogo() {
  return <div className="verify-brand"><img src={logo} alt="DataView" className="navbar-logo-image" /></div>;
}

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem("verificationEmail") || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) navigate("/signup", { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((prev) => Math.max(prev - 1, 0)), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (index, value) => {
    const number = value.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[index] = number;
    setCode(next);
    setError("");
    setMessage("");
    if (number && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = Array(6).fill("");
    pasted.split("").forEach((n, i) => { next[i] = n; });
    setCode(next);
    inputRefs.current[Math.min(pasted.length, 6) - 1]?.focus();
  };

  const saveLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("subscription", JSON.stringify(data.subscription || {}));
    localStorage.setItem("userSessionStartedAt", String(Date.now()));
    window.dispatchEvent(new Event("subscriptionChanged"));
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) return setError("6 оронтой код оруулна уу.");
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/auth/verify-email`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code: verificationCode }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Баталгаажуулах үед алдаа гарлаа.");
      saveLogin(data);
      sessionStorage.removeItem("verificationEmail");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || loading) return;
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const response = await fetch(`${API_URL}/auth/resend-verification`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Код илгээхэд алдаа гарлаа.");
      setCode(["", "", "", "", "", ""]);
      setSeconds(60);
      setMessage(data.message);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <main className="verify-page"><div className="verify-container"><DataViewLogo/><section className="verify-card"><div className="verify-mail-icon"><Mail size={28}/></div><h1>И-мэйлээ баталгаажуулна уу</h1><p>Бид <strong>{email}</strong> хаяг руу 6 оронтой баталгаажуулах код илгээлээ.</p><div className="verify-code-row" onPaste={handlePaste}>{code.map((value, index) => <input key={index} ref={(el) => { inputRefs.current[index] = el; }} type="text" inputMode="numeric" maxLength={1} value={value} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} disabled={loading}/>)}</div>{error && <div className="verify-error">{error}</div>}{message && <div className="verify-success">{message}</div>}<button type="button" className="verify-submit" onClick={handleVerify} disabled={loading}>{loading ? "Түр хүлээнэ үү..." : "Баталгаажуулах"}</button><div className="verify-resend"><span>Код ирээгүй юу?</span><button type="button" onClick={handleResend} disabled={seconds > 0 || loading}>{seconds > 0 ? `Дахин илгээх (${seconds}с)` : "Дахин илгээх"}</button></div><button type="button" className="verify-change-email" onClick={() => navigate("/signup", { replace: true })} disabled={loading}>И-мэйл хаяг солих</button></section></div></main>;
}

export default VerifyEmail;
