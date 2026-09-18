import "../styles/Footer.css";
import logo from "../assets/logo-default.svg";

function Footer() {
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
              Загварууд
            </a>

            <a href="#pricing">
              Үнэ
            </a>

            <a href="#contact">
              Холбоо барих
            </a>
          </div>

          <div className="footer-contact">
            <span>+976 7700 0000</span>
            <span>hello@dataview.mn</span>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>
            © 2026 DataView Mongolia. Бүх эрх хуулиар хамгаалагдсан.
          </p>

          <div className="footer-socials">
            <button>in</button>
            <button>f</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;