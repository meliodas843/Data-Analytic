import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [language, setLanguage] =
    useState("mn");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [notifications, setNotifications] =
    useState({
      sync: true,
      weekly: true,
      user: true,
      trial: true,
    });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="profile-page">
      <header className="profile-page-header">
        <button
          type="button"
          className="profile-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={17} />
          Буцах
        </button>

        <div className="profile-header-divider" />

        <strong>Миний профайл</strong>
      </header>

      <main className="profile-page-content">
        <section className="profile-card profile-user-card">
          <div className="profile-large-avatar">
            Б
          </div>

          <div>
            <h2>Бат-Эрдэнэ</h2>

            <p>demo@company.mn</p>

            <span>
              Admin · Монголын Компани ХХК
            </span>
          </div>
        </section>

        <section className="profile-card">
          <h3>Хувийн мэдээлэл</h3>

          <div className="profile-form-group">
            <label>Нэр</label>

            <input
              type="text"
              defaultValue="Бат-Эрдэнэ"
            />
          </div>

          <div className="profile-form-group">
            <label>И-мэйл</label>

            <input
              type="email"
              defaultValue="demo@company.mn"
              disabled
            />
          </div>

          <div className="profile-form-group">
            <label>Утас</label>

            <input
              type="text"
              defaultValue="+976 9911 2233"
            />
          </div>

          <div className="profile-form-group">
            <label>Хэл</label>

            <div className="profile-language-buttons">
              <button
                type="button"
                className={
                  language === "mn"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setLanguage("mn")
                }
              >
                {language === "mn" && (
                  <Check size={15} />
                )}

                Монгол
              </button>

              <button
                type="button"
                className={
                  language === "en"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setLanguage("en")
                }
              >
                {language === "en" && (
                  <Check size={15} />
                )}

                English
              </button>
            </div>
          </div>

          <button
            type="button"
            className="profile-save-button"
          >
            Хадгалах
          </button>
        </section>

        <section className="profile-card">
          <h3>И-мэйл мэдэгдэл</h3>

          <NotificationRow
            title="Sync амжилтгүй болох"
            description="Дата шинэчлэгдээгүй үед шууд мэдэгдэнэ"
            checked={notifications.sync}
            onChange={() =>
              toggleNotification("sync")
            }
          />

          <NotificationRow
            title="Долоо хоногийн тайлан"
            description="Даваа гараг бүр 09:00-д гол үзүүлэлтүүд"
            checked={notifications.weekly}
            onChange={() =>
              toggleNotification("weekly")
            }
          />

          <NotificationRow
            title="Хэрэглэгч нэмэгдэх"
            description="Урьсан хүн урилгаа хүлээн авах үед"
            checked={notifications.user}
            onChange={() =>
              toggleNotification("user")
            }
          />

          <NotificationRow
            title="Туршилт, төлбөрийн сануулга"
            description="Дуусахаас 3 хоногийн өмнө"
            checked={notifications.trial}
            onChange={() =>
              toggleNotification("trial")
            }
            last
          />
        </section>

        <section className="profile-card">
          <h3>Нууц үг солих</h3>

          <div className="profile-form-group">
            <label>Одоогийн нууц үг</label>

            <div className="profile-password-input">
              <input
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                defaultValue="12345678"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(
                    (prev) => !prev
                  )
                }
              >
                {showCurrentPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          <div className="profile-form-group">
            <label>Шинэ нууц үг</label>

            <div className="profile-password-input">
              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                defaultValue="12345678"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    (prev) => !prev
                  )
                }
              >
                {showNewPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="profile-password-button"
          >
            Нууц үг солих
          </button>
        </section>
      </main>
    </div>
  );
}

function NotificationRow({
  title,
  description,
  checked,
  onChange,
  last,
}) {
  return (
    <div
      className={`profile-notification-row ${
        last ? "last" : ""
      }`}
    >
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`profile-switch ${
          checked ? "active" : ""
        }`}
        onClick={onChange}
        aria-pressed={checked}
      >
        <span />
      </button>
    </div>
  );
}