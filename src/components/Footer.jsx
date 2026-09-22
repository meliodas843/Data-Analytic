import "../styles/Footer.css";
import logo from "../assets/logo-default white.svg";
import { useLanguage } from "../context/LanguageContext";

const footerContent = {
  mn: {
    templates: "Загварууд",
    howItWorks: "Хэрхэн ажилладаг",
    contact: "Холбоо барих",
    copyright:
      "© 2026 DataView Mongolia. Бүх эрх хуулиар хамгаалагдсан.",
  },

  en: {
    templates: "Templates",
    howItWorks: "How it works",
    contact: "Contact Us",
    copyright:
      "© 2026 DataView Mongolia. All rights reserved.",
  },
};

function Footer() {
  const { language } = useLanguage();

  const content = footerContent[language];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src={logo}
              alt="DataView"
              className="navbar-logo-image"
            />
          </div>

          <div className="footer-links">
            <a href="#templates">
              {content.templates}
            </a>

            <a href="#how-it-works">
              {content.howItWorks}
            </a>

            <a href="#contact">
              {content.contact}
            </a>
          </div>

          <div className="footer-contact">
            <span>+976 7700 0000</span>
            <span>hello@dataview.mn</span>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>{content.copyright}</p>

          <div className="footer-socials">
            <button type="button">in</button>
            <button type="button">f</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;