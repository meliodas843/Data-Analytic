import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

const API_URL = "/api";

export default function Profile() {
  const navigate =
    useNavigate();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    user,
    setUser,
  ] = useState({
    id: null,
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    role: "",
  });

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [passwordCode, setPasswordCode] = useState("");
  const [passwordCodeSent, setPasswordCodeSent] = useState(false);

  useEffect(() => {
    const loadProfile =
      async () => {
        try {
          setLoading(true);

          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            navigate(
              "/login",
              {
                replace: true,
              }
            );

            return;
          }

          const response =
            await fetch(
              `${API_URL}/auth/me`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
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
                "Профайл авахад алдаа гарлаа."
            );
          }

          setUser({
            id:
              data.user.id,
            full_name:
              data.user
                .full_name ||
              "",
            email:
              data.user.email ||
              "",
            phone:
              data.user.phone ||
              "",
            company_name:
              data.user
                .company_name ||
              "",
            role:
              data.user.role ||
              "",
          });

          localStorage.setItem(
            "currentUser",
            JSON.stringify(
              data.user
            )
          );
        } catch (err) {
          setError(
            err.message
          );
        } finally {
          setLoading(false);
        }
      };

    loadProfile();
  }, [navigate]);

  const handleSave =
    async () => {
      try {
        setSaving(true);
        setError("");
        setMessage("");

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${API_URL}/auth/profile`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  full_name:
                    user.full_name,
                  phone:
                    user.phone,
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
              "Хадгалахад алдаа гарлаа."
          );
        }

        setUser(
          data.user
        );

        localStorage.setItem(
          "currentUser",
          JSON.stringify(
            data.user
          )
        );

        window.dispatchEvent(
          new Event(
            "userUpdated"
          )
        );

        setMessage(
          "Мэдээлэл амжилттай хадгалагдлаа."
        );
      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setSaving(false);
      }
    };

  const handlePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError("Одоогийн болон шинэ нууц үгээ оруулна уу.");
      return;
    }

    const passwordRule = /^(?=.*[A-ZА-ЯӨҮЁ])(?=.*[a-zа-яөүё])(?=.*\d)(?=.*[^A-Za-zА-Яа-яӨөҮүЁё0-9\s]).{10,}$/;
    if (!passwordRule.test(newPassword)) {
      setError("Нууц үг хамгийн багадаа 10 тэмдэгт, том жижиг үсэг, тэмдэг, тооноос бүрдсэн байна.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");
      const token = localStorage.getItem("token");
      const endpoint = passwordCodeSent ? `${API_URL}/auth/password` : `${API_URL}/auth/password/request-code`;
      const response = await fetch(endpoint, {
        method: passwordCodeSent ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword, code: passwordCode }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Нууц үг солиход алдаа гарлаа.");
      if (!passwordCodeSent) {
        setPasswordCodeSent(true);
        setMessage(data.message);
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setPasswordCode("");
      setPasswordCodeSent(false);
      setMessage(data.message || "Нууц үг амжилттай солигдлоо.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const avatar =
    user.full_name
      ?.trim()
      .charAt(0)
      .toUpperCase() ||
    "Х";

  if (loading) {
    return (
      <div className="profile-page">
        <header className="profile-page-header">
          <button
            type="button"
            className="profile-back"
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
          >
            <ArrowLeft
              size={17}
            />
            Буцах
          </button>

          <div className="profile-header-divider" />

          <strong>
            Миний профайл
          </strong>
        </header>

        <main className="profile-page-content">
          <section className="profile-card">
            Профайл ачаалж
            байна...
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-page-header">
        <button
          type="button"
          className="profile-back"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >
          <ArrowLeft
            size={17}
          />
          Буцах
        </button>

        <div className="profile-header-divider" />

        <strong>
          Миний профайл
        </strong>
      </header>

      <main className="profile-page-content">
        {error && (
          <div className="profile-card">
            <div className="signup-error">
              {error}
            </div>
          </div>
        )}

        {message && (
          <div className="profile-card">
            {message}
          </div>
        )}

        <section className="profile-card profile-user-card">
          <div className="profile-large-avatar">
            {avatar}
          </div>

          <div>
            <h2>
              {user.full_name}
            </h2>

            <p>
              {user.email}
            </p>

            <span>
              {user.role ||
                "Admin"}
              {" · "}
              {user.company_name ||
                "-"}
            </span>
          </div>
        </section>

        <section className="profile-card">
          <h3>
            Хувийн мэдээлэл
          </h3>

          <div className="profile-form-group">
            <label>
              Нэр
            </label>

            <input
              type="text"
              value={
                user.full_name
              }
              onChange={(e) =>
                setUser(
                  (prev) => ({
                    ...prev,
                    full_name:
                      e.target
                        .value,
                  })
                )
              }
            />
          </div>

          <div className="profile-form-group">
            <label>
              И-мэйл
            </label>

            <input
              type="email"
              value={
                user.email
              }
              disabled
            />
          </div>

          <div className="profile-form-group">
            <label>
              Утас
            </label>

            <input
              type="text"
              value={
                user.phone || ""
              }
              onChange={(e) =>
                setUser(
                  (prev) => ({
                    ...prev,
                    phone:
                      e.target
                        .value,
                  })
                )
              }
            />
          </div>

          <button
            type="button"
            className="profile-save-button"
            onClick={
              handleSave
            }
            disabled={
              saving
            }
          >
            {saving
              ? "Хадгалж байна..."
              : "Хадгалах"}
          </button>
        </section>

        <section className="profile-card">
          <h3>
            И-мэйл мэдэгдэл
          </h3>

          <div className="profile-notification-row last">
            <div>
              <strong>
                Удахгүй нэмэгдэнэ
              </strong>

              <p>
                И-мэйл мэдэгдлийн
                тохиргоо дараагийн
                хувилбарт нэмэгдэнэ.
              </p>
            </div>
          </div>
        </section>

        <section className="profile-card">
          <h3>
            Нууц үг солих
          </h3>

          <div className="profile-form-group">
            <label>
              Одоогийн нууц үг
            </label>

            <div className="profile-password-input">
              <input
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                value={
                  currentPassword
                }
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(
                    (prev) =>
                      !prev
                  )
                }
              >
                {showCurrentPassword ? (
                  <EyeOff
                    size={17}
                  />
                ) : (
                  <Eye
                    size={17}
                  />
                )}
              </button>
            </div>
          </div>

          <div className="profile-form-group">
            <label>
              Шинэ нууц үг
            </label>

            <div className="profile-password-input">
              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                value={
                  newPassword
                }
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    (prev) =>
                      !prev
                  )
                }
              >
                {showNewPassword ? (
                  <EyeOff
                    size={17}
                  />
                ) : (
                  <Eye
                    size={17}
                  />
                )}
              </button>
            </div>
          </div>

          <p style={{ marginTop: 8, marginBottom: 14, color: "#64748b", fontSize: 13 }}>
            Нууц үг хамгийн багадаа 10 тэмдэгт, том жижиг үсэг, тэмдэг, тооноос бүрдсэн байна.
          </p>

          {passwordCodeSent && (
            <div className="profile-form-group">
              <label>И-мэйлээр ирсэн 6 оронтой код</label>
              <div className="profile-password-input">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={passwordCode}
                  onChange={(e) => setPasswordCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                />
              </div>
            </div>
          )}

          <button
            type="button"
            className="profile-password-button"
            onClick={
              handlePassword
            }
            disabled={
              saving
            }
          >
            {passwordCodeSent ? "Баталгаажуулж солих" : "Баталгаажуулах код авах"}
          </button>
        </section>
      </main>
    </div>
  );
}