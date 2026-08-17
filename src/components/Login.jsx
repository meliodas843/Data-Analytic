import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import "../styles/Login.css";


function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };


  return (
    <div className="login-page">

      <div className="login-card">

        {/* ================= HEADER ================= */}

        <div className="login-top">

          <button
            type="button"
            className="login-brand"
            onClick={() =>
              navigate("/")
            }
          >
            <span className="login-logo">
              D
            </span>

            <span>
              DataView
            </span>
          </button>


          <button
            type="button"
            className="language-button"
          >
            🇲🇳 MN
          </button>

        </div>


        {/* ================= TITLE ================= */}

        <div className="login-heading">

          <h1>
            Welcome back
          </h1>


          <p>
            Don't have an account?{" "}

            <button
              type="button"
              className="signup-link"
              onClick={() =>
                navigate("/signup")
              }
            >
              Sign up
            </button>
          </p>

        </div>


        {/* ================= FORM ================= */}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="login-field">

            <label>
              Email Address
            </label>


            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="login-field">

            <label>
              Password
            </label>


            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* FORGOT PASSWORD */}

          <div className="forgot-row">

            <button
              type="button"
              className="forgot-button"
              onClick={() =>
                navigate(
                  "/forgot-password"
                )
              }
            >
              Forgot password?
            </button>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-submit"
          >
            Log In
          </button>

        </form>


        {/* ================= DIVIDER ================= */}

        <div className="login-divider">

          <span>
            Or continue with
          </span>

        </div>


        {/* ================= SOCIAL LOGIN ================= */}

        <div className="social-login">

          {/* GOOGLE */}

          <button
            type="button"
            className="social-login-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <FcGoogle
              size={20}
            />

            <span>
              Google
            </span>
          </button>


          {/* MICROSOFT */}

          <button
            type="button"
            className="social-login-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >

            <span className="microsoft-four-logo">

              <i className="ms-red" />

              <i className="ms-green" />

              <i className="ms-blue" />

              <i className="ms-yellow" />

            </span>


            <span>
              Microsoft
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}


export default Login;