import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
import logo from "../assets/logo-default.svg";

function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LEFT - LOGO */}
        <div className="navbar-left">
          <button
            type="button"
            className="navbar-logo"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <img
              src={logo}
              alt="DataView"
              className="navbar-logo-image"
            />
          </button>
        </div>

        {/* CENTER - MENU */}
        <nav className="navbar-menu">
          <button
            type="button"
            onClick={() => scrollToSection("templates")}
          >
            Загварууд
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("why-dataview")}
          >
            Яагаад DataView?
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("testimonials")}
          >
            Туршлага
          </button>
        </nav>

        {/* RIGHT - ACTIONS */}
        <div className="navbar-actions">
          <button
            type="button"
            className="language-button"
          >
            🇲🇳 MH
          </button>

          <button
            type="button"
            className="login-action"
            onClick={() => navigate("/login")}
          >
            Нэвтрэх
          </button>

          <button
            type="button"
            className="contact-button"
            onClick={() => scrollToSection("contact")}
          >
            Холбогдох
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;