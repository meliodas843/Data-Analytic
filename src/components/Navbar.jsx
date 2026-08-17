import {
  useNavigate,
} from "react-router-dom";

import "../styles/Navbar.css";


function Navbar() {
  const navigate = useNavigate();


  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  return (
    <header className="navbar">

      <div className="navbar-inner">

        {/* LOGO */}

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
          <div className="navbar-logo-icon">
            D
          </div>

          <span>
            DataView
          </span>
        </button>


        {/* MENU */}

        <nav className="navbar-menu">

          <button
            type="button"
            onClick={() =>
              scrollToSection(
                "templates"
              )
            }
          >
            Загварууд
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection(
                "why-dataview"
              )
            }
          >
            Яагаад DataView?
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection(
                "pricing"
              )
            }
          >
            Үнэ
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection(
                "testimonials"
              )
            }
          >
            Туршлага
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection(
                "contact"
              )
            }
          >
            Холбоо барих
          </button>

        </nav>


        {/* ACTIONS */}

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
            onClick={() =>
              navigate("/login")
            }
          >
            Log In
          </button>


          <button
            type="button"
            className="contact-button"
            onClick={() =>
              scrollToSection(
                "contact"
              )
            }
          >
            Холбогдох
          </button>

        </div>

      </div>

    </header>
  );
}


export default Navbar;