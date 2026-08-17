import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompanySetup.css";

const API_URL = "http://localhost:5000/api";

function CompanySetup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    databaseType: "mysql",
    host: "",
    port: "3306",
    database: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] =
    useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setConnectionSuccess(false);
    setMessage("");
    setError("");
  };

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  });

  const testConnection = async () => {
    try {
      setTesting(true);
      setError("");
      setMessage("");
      setConnectionSuccess(false);

      const response = await fetch(
        `${API_URL}/company-database/test`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Database connection failed."
        );
      }

      setConnectionSuccess(true);

      setMessage(
        data.message ||
          "Database connection successful."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setTesting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/company-database`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Database configuration could not be saved."
        );
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-setup-page">
      <div className="company-setup-card">
        <div className="company-setup-header">
          <button
            type="button"
            className="company-setup-brand"
            onClick={() => navigate("/")}
          >
            <span className="company-setup-logo">
              D
            </span>

            <span>DataView</span>
          </button>

          <span className="company-setup-step">
            Company Setup
          </span>
        </div>

        <div className="company-setup-heading">
          <h1>Connect your company database</h1>

          <p>
            Enter your database information to
            connect your company data to DataView.
          </p>
        </div>

        <form
          className="company-setup-form"
          onSubmit={handleSubmit}
        >
          <div className="company-setup-field full">
            <label>Company Name</label>

            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Your Company"
              required
            />
          </div>

          <div className="company-setup-grid">
            <div className="company-setup-field">
              <label>Database Type</label>

              <select
                name="databaseType"
                value={form.databaseType}
                onChange={handleChange}
              >
                <option value="mysql">
                  MySQL
                </option>
              </select>
            </div>

            <div className="company-setup-field">
              <label>Port</label>

              <input
                type="number"
                name="port"
                value={form.port}
                onChange={handleChange}
                placeholder="3306"
                required
              />
            </div>
          </div>

          <div className="company-setup-field full">
            <label>Database Host</label>

            <input
              type="text"
              name="host"
              value={form.host}
              onChange={handleChange}
              placeholder="127.0.0.1"
              required
            />
          </div>

          <div className="company-setup-field full">
            <label>Database Name</label>

            <input
              type="text"
              name="database"
              value={form.database}
              onChange={handleChange}
              placeholder="company_database"
              required
            />
          </div>

          <div className="company-setup-grid">
            <div className="company-setup-field">
              <label>Username</label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="database_user"
                required
              />
            </div>

            <div className="company-setup-field">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="company-setup-message error">
              {error}
            </div>
          )}

          {message && (
            <div className="company-setup-message success">
              {message}
            </div>
          )}

          <div className="company-setup-actions">
            <button
              type="button"
              className="company-test-button"
              onClick={testConnection}
              disabled={testing || loading}
            >
              {testing
                ? "Testing..."
                : "Test Connection"}
            </button>

            <button
              type="submit"
              className="company-save-button"
              disabled={
                loading ||
                testing ||
                !connectionSuccess
              }
            >
              {loading
                ? "Saving..."
                : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;