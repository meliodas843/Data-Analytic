import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Navbar from "./Navbar";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Login.css";

const API_URL = "/api";
const PASSWORD_RULE = /^(?=.*[A-ZА-ЯӨҮЁ])(?=.*[a-zа-яөүё])(?=.*\d)(?=.*[^A-Za-zА-Яа-яӨөҮүЁё0-9\s]).{10,}$/;

function Login() {
  const navigate = useNavigate();
  const languageContext = useLanguage();
  const isMongolian = (languageContext?.language || languageContext?.lang || "en") === "mn";
  const t = isMongolian ? {
    loginTitle: "Нэвтрэх", email: "И-мэйл", password: "Нууц үг", forgotPassword: "Нууц үгээ мартсан?", login: "Нэвтрэх", loggingIn: "Нэвтэрч байна...", noAccount: "Бүртгэлгүй юу?", register: "Бүртгүүлэх", resetTitle: "Нууц үг сэргээх", resetDescription: "И-мэйлээр ирсэн 6 оронтой кодоор нууц үгээ шинэчилнэ.", sendCode: "Код илгээх", resetPassword: "Нууц үг шинэчлэх", code: "Баталгаажуулах код", newPassword: "Шинэ нууц үг", passwordHelp: "Хамгийн багадаа 10 тэмдэгт, том жижиг үсэг, тэмдэг, тооноос бүрдсэн байна", back: "Нэвтрэх", serverError: "Сервертэй холбогдож чадсангүй."
  } : {
    loginTitle: "Log In", email: "Email", password: "Password", forgotPassword: "Forgot password?", login: "Log In", loggingIn: "Logging in...", noAccount: "Don't have an account?", register: "Sign Up", resetTitle: "Reset Password", resetDescription: "Use the 6-digit code sent to your email to set a new password.", sendCode: "Send Code", resetPassword: "Reset Password", code: "Verification Code", newPassword: "New Password", passwordHelp: "At least 10 characters with uppercase, lowercase, number and special character", back: "Log In", serverError: "Could not connect to the server."
  };
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [form, setForm] = useState({ email: "", password: "", code: "", newPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setMessage("");
  };

  const saveLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("subscription", JSON.stringify(data.subscription || {}));
    localStorage.setItem("userSessionStartedAt", String(Date.now()));
    window.dispatchEvent(new Event("subscriptionChanged"));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email.trim() || !form.password) return setError(isMongolian ? "Имэйл болон нууц үгээ оруулна уу." : "Enter your email and password.");
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email.trim().toLowerCase(), password: form.password }) });
      const data = await response.json();
      if (!response.ok || !data.success) {
        if (data.requires_verification) {
          sessionStorage.setItem("verificationEmail", data.email || form.email.trim().toLowerCase());
          navigate("/verify-email", { state: { email: data.email || form.email.trim().toLowerCase() } });
          return;
        }
        setError(data.message || "Login failed.");
        return;
      }
      saveLogin(data);
      navigate("/dashboard", { replace: true });
    } catch {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  const sendResetCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.email.trim()) return setError(isMongolian ? "И-мэйл хаягаа оруулна уу." : "Enter your email.");
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/forgot-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email.trim().toLowerCase() }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Request failed.");
      setMessage(data.message);
      setResetStep(2);
    } catch (err) {
      setError(err.message || t.serverError);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!/^\d{6}$/.test(form.code)) return setError(isMongolian ? "6 оронтой код оруулна уу." : "Enter the 6-digit code.");
    if (!PASSWORD_RULE.test(form.newPassword)) return setError(t.passwordHelp);
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/reset-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email.trim().toLowerCase(), code: form.code, newPassword: form.newPassword }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Reset failed.");
      setMessage(data.message);
      setMode("login");
      setResetStep(1);
      setForm((prev) => ({ ...prev, password: "", code: "", newPassword: "" }));
    } catch (err) {
      setError(err.message || t.serverError);
    } finally {
      setLoading(false);
    }
  };

  return <><Navbar /><main className="login-page"><div className="login-container"><section className={`login-card ${mode === "forgot" ? "forgot-card" : ""}`}>
    {mode === "forgot" && <button type="button" className="back-to-login" onClick={() => { setMode("login"); setError(""); setMessage(""); }}><ArrowLeft size={17}/><span>{t.back}</span></button>}
    <div className={`login-heading ${mode === "forgot" ? "forgot-heading" : ""}`}><h1>{mode === "login" ? t.loginTitle : t.resetTitle}</h1>{mode === "forgot" && <p>{t.resetDescription}</p>}</div>
    {mode === "login" ? <form className="login-form" onSubmit={handleLogin}>
      <div className="login-field"><label htmlFor="email">{t.email}</label><input id="email" type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" disabled={loading} required /></div>
      <div className="login-field"><div className="login-label-row"><label htmlFor="password">{t.password}</label><button type="button" className="forgot-password-link" onClick={() => { setMode("forgot"); setError(""); setMessage(""); }}>{t.forgotPassword}</button></div><div className="login-password"><input id="password" type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} autoComplete="current-password" disabled={loading} required /><button type="button" className="password-eye" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={19}/> : <Eye size={19}/>}</button></div></div>
      {error && <div className="login-error" role="alert">{error}</div>}{message && <div className="login-success">{message}</div>}
      <button type="submit" className="login-submit" disabled={loading}>{loading ? t.loggingIn : t.login}</button>
    </form> : <form className="login-form" onSubmit={resetStep === 1 ? sendResetCode : resetPassword}>
      <div className="login-field"><label>{t.email}</label><input type="email" name="email" value={form.email} onChange={handleChange} disabled={loading || resetStep === 2} required /></div>
      {resetStep === 2 && <><div className="login-field"><label>{t.code}</label><input type="text" name="code" inputMode="numeric" maxLength={6} value={form.code} onChange={handleChange} required /></div><div className="login-field"><label>{t.newPassword}</label><div className="login-password"><input type={showPassword ? "text" : "password"} name="newPassword" value={form.newPassword} onChange={handleChange} required /><button type="button" className="password-eye" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={19}/> : <Eye size={19}/>}</button></div><small>{t.passwordHelp}</small></div></>}
      {error && <div className="login-error" role="alert">{error}</div>}{message && <div className="login-success">{message}</div>}
      <button type="submit" className="login-submit" disabled={loading}>{resetStep === 1 ? t.sendCode : t.resetPassword}</button>
    </form>}
    {mode === "login" && <div className="login-register"><span>{t.noAccount}</span><button type="button" onClick={() => navigate("/signup")}>{t.register}</button></div>}
  </section></div></main></>;
}

export default Login;
