import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
import logo from "../assets/logo-default.svg";
import { useLanguage } from "../context/LanguageContext";

const navbarContent = {
  mn: {
    templates: "Загварууд",
    whyDataView: "Яагаад DataView?",
    howItWorks: "Хэрхэн ажилладаг",
    guarantee: "Бидний баталгаа",
    login: "Нэвтрэх",
    contact: "Холбогдох",
  },

  en: {
    templates: "Templates",
    whyDataView: "Why DataView?",
    howItWorks: "How it works",
    guarantee: "Our guarantee",
    login: "Log In",
    contact: "Contact Us",
  },
};

function Navbar() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  const content = navbarContent[language];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <button
            type="button"
            className="navbar-logo"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="DataView"
              className="navbar-logo-image"
            />
          </button>
        </div>

        <nav className="navbar-menu">
          <button
            type="button"
            onClick={() => scrollToSection("templates")}
          >
            {content.templates}
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("why-dataview")
            }
          >
            {content.whyDataView}
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("how-it-works")
            }
          >
            {content.howItWorks}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("guarantee")}
          >
            {content.guarantee}
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="language-button"
            onClick={toggleLanguage}
            aria-label={
              language === "mn"
                ? "Switch to English"
                : "Монгол хэл рүү солих"
            }
          >
            {language === "mn" ? "🇲🇳 MN" : "🇬🇧 EN"}
          </button>

          <button
            type="button"
            className="login-action"
            onClick={() => navigate("/login")}
          >
            {content.login}
          </button>

          <button
            type="button"
            className="contact-button"
            onClick={() => scrollToSection("contact")}
          >
            {content.contact}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;