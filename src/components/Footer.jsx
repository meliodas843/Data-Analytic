import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-icon">
              D
            </div>

            <span>
              DataView Mongolia
            </span>
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