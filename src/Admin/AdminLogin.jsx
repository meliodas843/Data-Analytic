import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMPORARY only.
    // Later we will replace this with POST /api/auth/login

    if (email && password) {
      navigate("/admin");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f8fc",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "36px",
          background: "#ffffff",
          borderRadius: "14px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: "8px",
            color: "#203f70",
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: "28px",
            color: "#637794",
          }}
        >
          DataView administration
        </p>

        <label
          style={{
            display: "block",
            marginBottom: "18px",
            color: "#425775",
            fontWeight: 600,
          }}
        >
          Email

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              height: "44px",
              marginTop: "7px",
              padding: "0 12px",
              border: "1px solid #dce4ed",
              borderRadius: "8px",
            }}
          />
        </label>

        <label
          style={{
            display: "block",
            marginBottom: "22px",
            color: "#425775",
            fontWeight: 600,
          }}
        >
          Password

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              height: "44px",
              marginTop: "7px",
              padding: "0 12px",
              border: "1px solid #dce4ed",
              borderRadius: "8px",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            height: "46px",
            border: "none",
            borderRadius: "8px",
            background: "#2ccbbb",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;