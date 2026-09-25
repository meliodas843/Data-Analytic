import "../styles/Footer.css";
import logo from "../assets/Logo-default white.svg";
import { useLanguage } from "../context/LanguageContext";

const footerContent = {
  mn: {
    description: "Монголын бизнест зориулсан дата платформ",
    productsTitle: "Бүтээгдэхүүн",
    product1: "Сарын KPI тайлан",
    product2: "Өгөгдлийн автоматжуулалт",
    servicesTitle: "Үйлчилгээ",
    service1: "Захиалгат дашбоард",
    service2: "Өгөгдлийн агуулахын зөвлөх",
    service3: "Өгөгдлийн стратеги зөвлөх",
    contactTitle: "Холбоо барих",
    phone: "+976 7700 0000",
    email: "hello@dataview.mn",
    address: "Улаанбаатар, Хан-Уул дүүрэг",
    copyright:
      "© 2026 DataView Mongolia. Бүх эрх хуулиар хамгаалагдсан.",
  },

  en: {
    description: "Data platform built for Mongolian businesses",
    productsTitle: "Products",
    product1: "Monthly KPI Report",
    product2: "Data Automation",
    servicesTitle: "Services",
    service1: "Custom Dashboard",
    service2: "Data Warehouse Consulting",
    service3: "Data Strategy Consulting",
    contactTitle: "Contact",
    phone: "+976 7700 0000",
    email: "hello@dataview.mn",
    address: "Khan-Uul District, Ulaanbaatar",
    copyright:
      "© 2026 DataView Mongolia. All rights reserved.",
  },
};

function Footer() {
  const { language } = useLanguage();
  const content = footerContent[language] || footerContent.mn;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <a
              href="#top"
              className="footer-logo-link"
              aria-label="DataView"
            >
              <img
                src={logo}
                alt="DataView"
                className="footer-logo"
              />
            </a>

            <p className="footer-description">
              {content.description}
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">
              {content.productsTitle}
            </h3>

            <nav className="footer-nav">
              <a href="#solutions">
                {content.product1}
              </a>

              <a href="#solutions">
                {content.product2}
              </a>
            </nav>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">
              {content.servicesTitle}
            </h3>

            <nav className="footer-nav">
              <a href="#solutions">
                {content.service1}
              </a>

              <a href="#solutions">
                {content.service2}
              </a>

              <a href="#solutions">
                {content.service3}
              </a>
            </nav>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">
              {content.contactTitle}
            </h3>

            <div className="footer-contact-list">
              <a href="tel:+97677000000">
                {content.phone}
              </a>

              <a href="mailto:hello@dataview.mn">
                {content.email}
              </a>

              <span>
                {content.address}
              </span>
            </div>
          </div>
        </div>


        <div className="footer-bottom">
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;