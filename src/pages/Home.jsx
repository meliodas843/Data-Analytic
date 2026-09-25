import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logoWhite from "../assets/Logo-default.svg";
import "../styles/Home.css";

export default function Home() {
  useEffect(() => {
    (function () {
      "use strict";
      var CONTACT_ENDPOINT = "";

      var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      function $(sel, root) {
        return (root || document).querySelector(sel);
      }
      function $$(sel, root) {
        return Array.prototype.slice.call(
          (root || document).querySelectorAll(sel),
        );
      }

      function createTabs(tablist, onChange) {
        var tabs = $$('[role="tab"]', tablist);
        var panels = tabs.map(function (t) {
          return document.getElementById(t.getAttribute("aria-controls"));
        });

        function current() {
          for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].getAttribute("aria-selected") === "true") return i;
          }
          return 0;
        }

        function select(index, opts) {
          opts = opts || {};
          tabs.forEach(function (tab, i) {
            var on = i === index;
            tab.setAttribute("aria-selected", on ? "true" : "false");
            tab.tabIndex = on ? 0 : -1;
            if (panels[i]) panels[i].hidden = !on;
          });
          if (opts.focus) tabs[index].focus();
          scrollIntoStrip(tablist, tabs[index]);
          if (onChange) onChange(index, opts);
        }

        tabs.forEach(function (tab, i) {
          tab.addEventListener("click", function () {
            select(i, { user: true });
          });
          tab.addEventListener("keydown", function (e) {
            var next = null;
            if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
            else if (e.key === "ArrowLeft")
              next = (i - 1 + tabs.length) % tabs.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = tabs.length - 1;
            if (next !== null) {
              e.preventDefault();
              select(next, { focus: true, user: true });
            }
          });
        });

        return { select: select, current: current, count: tabs.length };
      }

      function scrollIntoStrip(strip, tab) {
        if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
        var left = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
        strip.scrollTo({
          left: Math.max(0, left),
          behavior: reduceMotion.matches ? "auto" : "smooth",
        });
      }

      function initHeader() {
        var header = $("[data-header]");
        var nav = $("[data-nav]");
        var btn = $("[data-menu-toggle]");
        if (!header || !nav || !btn) return;

        function onScroll() {
          header.classList.toggle("is-scrolled", window.scrollY > 4);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        function setMenu(open) {
          nav.classList.toggle("is-open", open);
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          btn.setAttribute("aria-label", open ? "Цэс хаах" : "Цэс нээх");
          document.body.classList.toggle("menu-open", open);
        }

        btn.addEventListener("click", function () {
          setMenu(btn.getAttribute("aria-expanded") !== "true");
        });

        $$("a", nav).forEach(function (a) {
          a.addEventListener("click", function () {
            setMenu(false);
          });
        });

        document.addEventListener("keydown", function (e) {
          if (
            e.key === "Escape" &&
            btn.getAttribute("aria-expanded") === "true"
          ) {
            setMenu(false);
            btn.focus();
          }
        });

        var desktop = window.matchMedia("(min-width: 1121px)");
        var onDesktop = function (mq) {
          if (mq.matches) setMenu(false);
        };
        if (desktop.addEventListener)
          desktop.addEventListener("change", onDesktop);
        else if (desktop.addListener) desktop.addListener(onDesktop);
      }

      function initHero() {
        var card = $("[data-hero]");
        if (!card) return;

        if (card.dataset.heroInitialized === "true") return;
        card.dataset.heroInitialized = "true";

        var tablist = $('[role="tablist"]', card);
        var toggle = $("[data-autoplay-toggle]", card);
        if (!tablist || !toggle) return;

        var delay = 6000;
        var auto = !reduceMotion.matches;
        var timer = null;
        var visible = true;

        function clearTimer() {
          if (timer !== null) {
            window.clearTimeout(timer);
            timer = null;
          }
        }

        function resetAllProgress() {
          $$(".module-tab__progress", tablist).forEach(function (progress) {
            progress.classList.remove("is-running");
          });
        }

        function startSelectedProgress() {
          resetAllProgress();

          if (!auto || !visible) return;

          var selected = $('[role="tab"][aria-selected="true"]', tablist);
          if (!selected) return;

          var progress = $(".module-tab__progress", selected);
          if (!progress) return;

          void progress.offsetWidth;
          progress.classList.add("is-running");
        }

        var tabs = createTabs(tablist, function (index, opts) {
          clearTimer();
          startSelectedProgress();

          if (opts.user) {
            auto = false;
            card.classList.add("is-manual");
            resetAllProgress();
            toggle.setAttribute(
              "aria-label",
              "Автомат солигдолтыг үргэлжлүүлэх",
            );
            return;
          }

          scheduleNext();
        });

        function scheduleNext() {
          clearTimer();

          if (!auto || !visible) return;

          timer = window.setTimeout(function () {
            var current = tabs.current();
            var next = current + 1;

            if (next >= tabs.count) {
              next = 0;
            }

            tabs.select(next);
          }, delay);
        }

        function startAuto() {
          auto = true;
          card.classList.remove("is-manual");
          toggle.setAttribute(
            "aria-label",
            "Автомат солигдолтыг зогсоох",
          );
          startSelectedProgress();
          scheduleNext();
        }

        function stopAuto() {
          auto = false;
          clearTimer();
          resetAllProgress();
          card.classList.add("is-manual");
          toggle.setAttribute(
            "aria-label",
            "Автомат солигдолтыг үргэлжлүүлэх",
          );
        }

        toggle.addEventListener("click", function () {
          if (auto) {
            stopAuto();
          } else {
            startAuto();
          }
        });

        if ("IntersectionObserver" in window) {
          var observer = new IntersectionObserver(
            function (entries) {
              var nextVisible = entries[0].isIntersecting;

              if (nextVisible === visible) return;

              visible = nextVisible;
              card.classList.toggle("is-offscreen", !visible);

              if (!auto) return;

              if (visible) {
                startSelectedProgress();
                scheduleNext();
              } else {
                clearTimer();
                resetAllProgress();
              }
            },
            { threshold: 0.2 },
          );

          observer.observe(card);
        }

        function applyMotionPref() {
          toggle.hidden = reduceMotion.matches;

          if (reduceMotion.matches) {
            stopAuto();
          } else {
            startAuto();
          }
        }

        tabs.select(0);

        if (reduceMotion.matches) {
          stopAuto();
        } else {
          startAuto();
        }

        if (reduceMotion.addEventListener) {
          reduceMotion.addEventListener("change", applyMotionPref);
        } else if (reduceMotion.addListener) {
          reduceMotion.addListener(applyMotionPref);
        }
      }

      function initSections() {
        var solutionsList = $("[data-solutions]");
        var solutions = solutionsList ? createTabs(solutionsList) : null;

        var howList = $("[data-how]");
        if (howList) createTabs(howList);

        if (solutions) {
          $$("[data-solution]").forEach(function (link) {
            link.addEventListener("click", function () {
              var n = parseInt(link.getAttribute("data-solution"), 10);
              if (!isNaN(n)) solutions.select(n);
            });
          });
        }
      }

      function initFaq() {
        var items = $$("[data-faq] details");
        items.forEach(function (d) {
          d.addEventListener("toggle", function () {
            if (!d.open) return;
            items.forEach(function (o) {
              if (o !== d && o.open) o.open = false;
            });
          });
        });
      }

      function initContactForm() {
        var form = $("#contact-form");
        if (!form) return;

        var choices = $$("[data-choice]", form);
        var hidden = $('input[name="solutions"]', form);
        var status = $("[data-form-status]", form);
        var submit = $("[data-submit]", form);
        var submitLabel = $("[data-submit-label]", form);

        choices.forEach(function (btn) {
          btn.addEventListener("click", function () {
            btn.setAttribute(
              "aria-pressed",
              btn.getAttribute("aria-pressed") === "true" ? "false" : "true",
            );
            hidden.value = selectedChoices().join(", ");
          });
        });

        function selectedChoices() {
          return choices
            .filter(function (b) {
              return b.getAttribute("aria-pressed") === "true";
            })
            .map(function (b) {
              return b.getAttribute("data-choice");
            });
        }

        function setError(input, message) {
          var err = document.getElementById(input.id + "-error");
          if (message) {
            input.setAttribute("aria-invalid", "true");
            if (err) {
              err.textContent = message;
              err.hidden = false;
            }
          } else {
            input.removeAttribute("aria-invalid");
            if (err) {
              err.textContent = "";
              err.hidden = true;
            }
          }
        }

        function validate() {
          var name = form.elements.name;
          var phone = form.elements.phone;
          var email = form.elements.email;
          var ok = true;
          var first = null;

          [name, phone, email].forEach(function (el) {
            setError(el, "");
          });

          if (!name.value.trim()) {
            setError(name, "Нэрээ оруулна уу.");
            ok = false;
            first = first || name;
          }

          var phoneVal = phone.value.trim();
          var emailVal = email.value.trim();
          var phoneDigits = phoneVal.replace(/\D/g, "");

          if (!phoneVal && !emailVal) {
            setError(phone, "Утас эсвэл имэйлийн аль нэгийг оруулна уу.");
            ok = false;
            first = first || phone;
          }
          if (phoneVal && phoneDigits.length < 8) {
            setError(phone, "Утасны дугаар дор хаяж 8 оронтой байна.");
            ok = false;
            first = first || phone;
          }
          if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            setError(email, "Имэйл хаягаа шалгана уу. Жишээ: email@company.mn");
            ok = false;
            first = first || email;
          }

          if (first) first.focus();
          return ok;
        }

        function showStatus(type, text) {
          status.className = "form-status form-status--" + type;
          status.innerHTML = "";
          var svgNS = "http://www.w3.org/2000/svg";
          var svg = document.createElementNS(svgNS, "svg");
          svg.setAttribute("class", "icon");
          svg.setAttribute("aria-hidden", "true");
          var use = document.createElementNS(svgNS, "use");
          use.setAttribute(
            "href",
            type === "success" ? "#i-check" : "#i-alert",
          );
          svg.appendChild(use);
          var span = document.createElement("span");
          span.textContent = text;
          status.appendChild(svg);
          status.appendChild(span);
          status.hidden = false;
        }

        ["name", "phone", "email"].forEach(function (field) {
          form.elements[field].addEventListener("input", function () {
            if (this.getAttribute("aria-invalid") === "true")
              setError(this, "");
          });
        });

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          status.hidden = true;
          if (!validate()) return;

          var payload = {
            name: form.elements.name.value.trim(),
            company: form.elements.company.value.trim(),
            phone: form.elements.phone.value.trim(),
            email: form.elements.email.value.trim(),
            solutions: selectedChoices(),
            note: form.elements.note.value.trim(),
            source: "dataview-home",
            submittedAt: new Date().toISOString(),
          };

          submit.disabled = true;
          submitLabel.textContent = "Илгээж байна…";

          var request = CONTACT_ENDPOINT
            ? fetch(CONTACT_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              }).then(function (res) {
                if (!res.ok) throw new Error("HTTP " + res.status);
              })
            : new Promise(function (resolve) {
                setTimeout(resolve, 500);
              });

          request
            .then(function () {
              showStatus(
                "success",
                "Хүсэлт илгээгдлээ. Бид 1–3 ажлын өдөрт холбогдоно.",
              );
              form.reset();
              choices.forEach(function (b) {
                b.setAttribute("aria-pressed", "false");
              });
              hidden.value = "";
            })
            .catch(function () {
              showStatus(
                "error",
                "Илгээж чадсангүй. Дахин оролдох эсвэл +976 7700 0000 руу залгана уу.",
              );
            })
            .then(function () {
              submit.disabled = false;
              submitLabel.textContent = "Илгээх";
            });
        });
      }

      initHeader();
      initHero();
      initSections();
      initFaq();
      initContactForm();
    })();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Үндсэн агуулга руу шилжих
      </a>
      
      <svg
        aria-hidden="true"
        className="sprite"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="M20 6 9 17l-5-5"></path>
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </symbol>
        <symbol id="i-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20"></path>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 6h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 18h16"></path>
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </symbol>
        <symbol id="i-sheet" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M8 13h8"></path>
          <path d="M8 17h8"></path>
          <path d="M12 11v8"></path>
        </symbol>
        <symbol id="i-doc" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M8 13h8"></path>
          <path d="M8 17h5"></path>
        </symbol>
        <symbol id="i-cloud" viewBox="0 0 24 24">
          <path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 0 1 0 9z"></path>
        </symbol>
        <symbol id="i-db" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"></path>
          <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"></path>
        </symbol>
        <symbol id="i-users" viewBox="0 0 24 24">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.9"></path>
          <path d="M16 3.1a4 4 0 0 1 0 7.8"></path>
        </symbol>
        <symbol id="i-compass" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"></path>
        </symbol>
        <symbol id="i-shield-check" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </symbol>
        <symbol id="i-clipboard-check" viewBox="0 0 24 24">
          <rect height="4" rx="1" width="8" x="8" y="2"></rect>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <path d="m9 14 2 2 4-4"></path>
        </symbol>
        <symbol id="i-award" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.5 13 17 22l-5-3-5 3 1.5-9"></path>
        </symbol>
        <symbol id="i-gift" viewBox="0 0 24 24">
          <rect height="4" rx="1" width="18" x="3" y="8"></rect>
          <path d="M12 8v13"></path>
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"></path>
        </symbol>
        <symbol id="i-trending" viewBox="0 0 24 24">
          <path d="m22 7-8.5 8.5-5-5L2 17"></path>
          <path d="M16 7h6v6"></path>
        </symbol>
        <symbol id="i-building" viewBox="0 0 24 24">
          <rect height="20" rx="2" width="16" x="4" y="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"></path>
        </symbol>
        <symbol id="i-layout" viewBox="0 0 24 24">
          <rect height="7" rx="1" width="18" x="3" y="3"></rect>
          <rect height="7" rx="1" width="9" x="3" y="14"></rect>
          <rect height="7" rx="1" width="5" x="16" y="14"></rect>
        </symbol>
        <symbol id="i-message" viewBox="0 0 24 24">
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.4 8.4 0 0 1 8.4-8.5h.5a8.5 8.5 0 0 1 8 8v.5z"></path>
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"></path>
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
          <path d="m22 6-10 7L2 6"></path>
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </symbol>
        <symbol id="i-chevron" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6"></path>
        </symbol>
        <symbol id="i-clock" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </symbol>
        <symbol id="i-alert" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </symbol>
        <symbol id="i-pause" viewBox="0 0 24 24">
          <rect
            fill="currentColor"
            height="16"
            rx="1"
            stroke="none"
            width="4"
            x="6"
            y="4"
          ></rect>
          <rect
            fill="currentColor"
            height="16"
            rx="1"
            stroke="none"
            width="4"
            x="14"
            y="4"
          ></rect>
        </symbol>
        <symbol id="i-play" viewBox="0 0 24 24">
          <path d="M7 4v16l13-8z" fill="currentColor" stroke="none"></path>
        </symbol>
      </svg>
      <Navbar />

      <main id="main">
        <section className="hero" id="top">
          <div className="container">
            <div className="hero__intro">
              <h1 className="hero__title">Мэдээллээс шийдвэр хүртэл</h1>
              <div className="hero__lead">
                <p>
                  Өнөөдөр Excel тайлангаар эхэлж, маргааш өгөгдлийн агуулах руу
                  өсөөрэй.
                </p>
                <div className="hero__actions">
                  <a className="btn btn--primary btn--lg" href="#contact">
                    Үнэгүй турших
                  </a>
                  <a className="link-arrow" href="#solutions">
                    Шийдлүүдийг үзэх
                    <svg className="icon">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
                <ul className="checklist">
                  <li>
                    <svg className="icon">
                      <use href="#i-check"></use>
                    </svg>
                    IT мэдлэг шаардлагагүй
                  </li>
                  <li>
                    <svg className="icon">
                      <use href="#i-check"></use>
                    </svg>
                    Монгол хэлээр
                  </li>
                  <li>
                    <svg className="icon">
                      <use href="#i-check"></use>
                    </svg>
                    Үнэгүй туршилт
                  </li>
                </ul>
              </div>
            </div>

            <div className="module-card" data-hero="">
              <div className="module-card__top">
                <div
                  aria-label="Модулиуд"
                  className="module-tabs"
                  role="tablist"
                >
                  <button
                    aria-controls="hero-panel-0"
                    aria-selected="true"
                    className="module-tab"
                    data-kind="product"
                    id="hero-tab-0"
                    role="tab"
                    type="button"
                  >
                    <span className="module-tab__meta">
                      <span className="kind-swatch kind-swatch--product"></span>
                      <span className="module-tab__kind">Бүтээгдэхүүн</span>
                    </span>
                    <span className="module-tab__name">Сарын KPI тайлан</span>
                    <span
                      aria-hidden="true"
                      className="module-tab__progress"
                    ></span>
                  </button>
                  <button
                    aria-controls="hero-panel-1"
                    aria-selected="false"
                    className="module-tab"
                    data-kind="product"
                    id="hero-tab-1"
                    role="tab"
                    tabIndex="-1"
                    type="button"
                  >
                    <span className="module-tab__meta">
                      <span className="kind-swatch kind-swatch--product"></span>
                      <span className="module-tab__kind">Бүтээгдэхүүн</span>
                      <span className="badge badge--soon">Удахгүй</span>
                    </span>
                    <span className="module-tab__name">
                      Өгөгдлийн автоматжуулалт
                    </span>
                    <span
                      aria-hidden="true"
                      className="module-tab__progress"
                    ></span>
                  </button>
                  <button
                    aria-controls="hero-panel-2"
                    aria-selected="false"
                    className="module-tab"
                    data-kind="service"
                    id="hero-tab-2"
                    role="tab"
                    tabIndex="-1"
                    type="button"
                  >
                    <span className="module-tab__meta">
                      <span className="kind-swatch kind-swatch--service"></span>
                      <span className="module-tab__kind">Үйлчилгээ</span>
                    </span>
                    <span className="module-tab__name">Захиалгат дашбоард</span>
                    <span
                      aria-hidden="true"
                      className="module-tab__progress"
                    ></span>
                  </button>
                  <button
                    aria-controls="hero-panel-3"
                    aria-selected="false"
                    className="module-tab"
                    data-kind="service"
                    id="hero-tab-3"
                    role="tab"
                    tabIndex="-1"
                    type="button"
                  >
                    <span className="module-tab__meta">
                      <span className="kind-swatch kind-swatch--service"></span>
                      <span className="module-tab__kind">Үйлчилгээ</span>
                    </span>
                    <span className="module-tab__name">
                      Өгөгдлийн агуулахын зөвлөх
                    </span>
                    <span
                      aria-hidden="true"
                      className="module-tab__progress"
                    ></span>
                  </button>
                  <button
                    aria-controls="hero-panel-4"
                    aria-selected="false"
                    className="module-tab"
                    data-kind="service"
                    id="hero-tab-4"
                    role="tab"
                    tabIndex="-1"
                    type="button"
                  >
                    <span className="module-tab__meta">
                      <span className="kind-swatch kind-swatch--service"></span>
                      <span className="module-tab__kind">Үйлчилгээ</span>
                    </span>
                    <span className="module-tab__name">
                      Өгөгдлийн стратеги зөвлөх
                    </span>
                    <span
                      aria-hidden="true"
                      className="module-tab__progress"
                    ></span>
                  </button>
                </div>
                <button
                  aria-label="Автомат солигдолтыг зогсоох"
                  className="autoplay-btn"
                  data-autoplay-toggle=""
                  type="button"
                >
                  <svg className="icon icon-pause">
                    <use href="#i-pause"></use>
                  </svg>
                  <svg className="icon icon-play">
                    <use href="#i-play"></use>
                  </svg>
                </button>
              </div>
              <div aria-hidden="true" className="flow-head">
                <span className="stage-label">
                  <span className="stage-num">1</span>Эх үүсвэр
                </span>
                <span className="stage-label">
                  <span className="stage-num">2</span>Боловсруулалт
                </span>
                <span className="stage-label">
                  <span className="stage-num">3</span>Үр дүн
                </span>
              </div>

              <div
                aria-labelledby="hero-tab-0"
                className="flow-panel"
                id="hero-panel-0"
                role="tabpanel"
              >
                <div className="flow">
                  <div className="flow__col flow__col--source">
                    <span className="stage-label">
                      <span className="stage-num">1</span>Эх үүсвэр
                    </span>
                    <div className="node node--source">
                      <span className="node__icon node__icon--green">
                        <svg className="icon">
                          <use href="#i-sheet"></use>
                        </svg>
                      </span>
                      <span className="node__text">
                        <strong>Excel файл</strong>
                        <span>Сар бүр оруулна</span>
                      </span>
                    </div>
                    <div className="node node--source">
                      <span className="node__icon node__icon--green">
                        <svg className="icon">
                          <use href="#i-cloud"></use>
                        </svg>
                      </span>
                      <span className="node__text">
                        <strong>SharePoint</strong>
                        <span>Автоматаар татна</span>
                      </span>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--1">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--process">
                    <span className="stage-label">
                      <span className="stage-num">2</span>Боловсруулалт
                    </span>
                    <div className="node node--engine">
                      <div className="node__head">
                        <img alt="DataView" height="64" src={logoWhite} width="180" />
                      </div>
                      <ul className="ticks stagger">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Файлыг шалгана
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          KPI-г тооцоолно
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          5 загварт тайлан бэлдэнэ
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--2">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--output">
                    <span className="stage-label">
                      <span className="stage-num">3</span>Үр дүн
                    </span>
                    <div className="node node--product">
                      <div className="node__text">
                        <span className="node__title">Сарын KPI тайлан</span>
                        <span className="node__sub">
                          6 KPI · и-мэйлээр ирнэ
                        </span>
                      </div>
                      <div aria-hidden="true" className="bars">
                        <span style={{ "--h": "55%" }}></span>
                        <span style={{ "--h": "40%" }}></span>
                        <span style={{ "--h": "60%" }}></span>
                        <span style={{ "--h": "70%" }}></span>
                        <span style={{ "--h": "80%" }}></span>
                        <span
                          className="is-current"
                          style={{ "--h": "100%" }}
                        ></span>
                      </div>
                      <div className="node__row">
                        <span className="node__sub">Орлого</span>
                        <strong>₮2.19bn ▲ 22.2%</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flow-caption">
                  <p>
                    <strong>Сарын KPI тайлан.</strong> Excel-ээ оруулаад сар бүр
                    бэлэн тайлан, мэдэгдэл аваарай.
                  </p>
                  <a className="link-arrow" data-solution="0" href="#solutions">
                    Дэлгэрэнгүй
                    <svg className="icon">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
              </div>

              <div
                aria-labelledby="hero-tab-1"
                className="flow-panel"
                hidden
                id="hero-panel-1"
                role="tabpanel"
              >
                <div className="flow">
                  <div className="flow__col flow__col--source">
                    <span className="stage-label">
                      <span className="stage-num">1</span>Эх үүсвэр
                    </span>
                    <div className="source-group">
                      <span className="source-group__label">
                        Бүртгэлийн систем
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        1C
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        Odoo
                      </span>
                      <span className="chip chip--soon">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        <span className="chip__label">Oracle</span>
                        <span className="badge badge--soon">Удахгүй</span>
                      </span>
                      <span className="chip chip--soon">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        <span className="chip__label">SQL Server</span>
                        <span className="badge badge--soon">Удахгүй</span>
                      </span>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--1">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--process">
                    <span className="stage-label">
                      <span className="stage-num">2</span>Боловсруулалт
                    </span>
                    <div className="node node--product">
                      <span className="badge badge--soon">Удахгүй</span>
                      <span className="node__title">
                        Өгөгдлийн автоматжуулалт
                      </span>
                      <div className="step-rows stagger">
                        <div className="step-row">
                          <span>Татах query</span>
                          <span className="badge badge--outline-white">
                            Та бичнэ
                          </span>
                        </div>
                        <div className="step-row">
                          <span>Хуваарь, давтан оролдлого</span>
                          <span className="badge badge--white">Автомат</span>
                        </div>
                        <div className="step-row">
                          <span>Ачаалах query</span>
                          <span className="badge badge--outline-white">
                            Та бичнэ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--2">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--output">
                    <span className="stage-label">
                      <span className="stage-num">3</span>Үр дүн
                    </span>
                    <div className="node">
                      <div className="node__head">
                        <span className="node__icon node__icon--sm">
                          <svg className="icon">
                            <use href="#i-db"></use>
                          </svg>
                        </span>
                        <span className="node__title">Өгөгдлийн агуулах</span>
                      </div>
                      <span className="node__sub">
                        Бүх систем нэг дор · Түүхэн дата хадгална
                      </span>
                      <span className="status">
                        <span className="status__dot"></span>Өдөр бүр 02:00 ·
                        Амжилттай
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flow-caption">
                  <p>
                    <strong>Өгөгдлийн автоматжуулалт.</strong> Хоёр талын
                    query-г бичээд, үлдсэнийг платформ хийнэ.
                  </p>
                  <a className="link-arrow" data-solution="1" href="#solutions">
                    Дэлгэрэнгүй
                    <svg className="icon">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
              </div>

              <div
                aria-labelledby="hero-tab-2"
                className="flow-panel"
                hidden
                id="hero-panel-2"
                role="tabpanel"
              >
                <div className="flow flow--navy">
                  <div className="flow__col flow__col--source">
                    <span className="stage-label">
                      <span className="stage-num">1</span>Эх үүсвэр
                    </span>
                    <div className="source-group">
                      <span className="source-group__label">Танай систем</span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        Odoo
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        1C
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        Мэдээллийн сан
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-sheet"></use>
                        </svg>
                        Excel
                      </span>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--1">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--process">
                    <span className="stage-label">
                      <span className="stage-num">2</span>Боловсруулалт
                    </span>
                    <div className="node">
                      <div className="node__head">
                        <span className="node__icon node__icon--sm">
                          <svg className="icon">
                            <use href="#i-users"></use>
                          </svg>
                        </span>
                        <span className="node__title">Манай баг</span>
                      </div>
                      <ul className="ticks ticks--navy stagger">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Зөвхөн унших эрхээр холбоно
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Тоог нягтлангийн тоотой тулгана
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Дашбоардыг угсарна
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--2">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--output">
                    <span className="stage-label">
                      <span className="stage-num">3</span>Үр дүн
                    </span>
                    <div className="node node--service">
                      <div className="node__text">
                        <span className="node__title">Захиалгат дашбоард</span>
                        <span className="node__sub">
                          Танай хэрэгцээнд тохирсон
                        </span>
                      </div>
                      <svg
                        aria-hidden="true"
                        className="sparkline"
                        preserveAspectRatio="none"
                        viewBox="0 0 190 44"
                      >
                        <path className="sparkline__base" d="M0 43H190"></path>
                        <path
                          className="sparkline__line chart-line"
                          d="M2 36 L30 29 L58 32 L86 22 L114 25 L142 13 L170 16 L188 5"
                        ></path>
                      </svg>
                      <div className="node__row">
                        <span className="node__sub">Цэвэр ашиг</span>
                        <strong>
                          ₮549M <span className="up">▲ 66.4%</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flow-caption">
                  <p>
                    <strong>Захиалгат дашбоард.</strong> Танай системд
                    холбогдсон, хэрэгцээнд тань тохирсон тайлан.
                  </p>
                  <a
                    className="link-arrow link-arrow--navy"
                    data-solution="2"
                    href="#solutions"
                  >
                    Дэлгэрэнгүй
                    <svg className="icon">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
              </div>

              <div
                aria-labelledby="hero-tab-3"
                className="flow-panel"
                hidden
                id="hero-panel-3"
                role="tabpanel"
              >
                <div className="flow flow--navy">
                  <div className="flow__col flow__col--source">
                    <span className="stage-label">
                      <span className="stage-num">1</span>Эх үүсвэр
                    </span>
                    <div className="source-group">
                      <span className="source-group__label">
                        ББСБ-ийн системүүд
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        Зээлийн систем
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        Эргэн төлөлт
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        Харилцагчийн бүртгэл
                      </span>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--1">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--process">
                    <span className="stage-label">
                      <span className="stage-num">2</span>Боловсруулалт
                    </span>
                    <div className="node node--service">
                      <span className="badge badge--navy">
                        ББСБ-д data mart
                      </span>
                      <span className="node__title">Өгөгдлийн агуулах</span>
                      <div className="model stagger">
                        <span className="model__fact">Зээлийн гүйлгээ</span>
                        <span className="model__dims">
                          <span>Харилцагч</span>
                          <span>Салбар</span>
                          <span>Бүтээгдэхүүн</span>
                          <span>Огноо</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--2">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--output">
                    <span className="stage-label">
                      <span className="stage-num">3</span>Үр дүн
                    </span>
                    <div className="node">
                      <div className="node__head">
                        <span className="node__icon node__icon--sm">
                          <svg className="icon">
                            <use href="#i-doc"></use>
                          </svg>
                        </span>
                        <span className="node__title">Тайлан</span>
                      </div>
                      <ul className="ticks ticks--navy stagger">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          PAR тайлан
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Эрсдэлийн сан
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          СЗХ-ны тайлан
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flow-caption">
                  <p>
                    <strong>Өгөгдлийн агуулахын зөвлөх.</strong> Зээл, эргэн
                    төлөлт, тайлангийн мэдээллийг нэг загварт нэгтгэнэ.
                  </p>
                  <a
                    className="link-arrow link-arrow--navy"
                    data-solution="3"
                    href="#solutions"
                  >
                    Дэлгэрэнгүй
                    <svg className="icon">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
              </div>

              <div
                aria-labelledby="hero-tab-4"
                className="flow-panel"
                hidden
                id="hero-panel-4"
                role="tabpanel"
              >
                <div className="flow flow--navy">
                  <div className="flow__col flow__col--source">
                    <span className="stage-label">
                      <span className="stage-num">1</span>Эх үүсвэр
                    </span>
                    <div className="source-group">
                      <span className="source-group__label">
                        Одоогийн байдал
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-db"></use>
                        </svg>
                        Системүүд
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-shield-check"></use>
                        </svg>
                        Өгөгдлийн чанар
                      </span>
                      <span className="chip">
                        <svg className="icon">
                          <use href="#i-doc"></use>
                        </svg>
                        Тайлангийн хэрэгцээ
                      </span>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--1">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--process">
                    <span className="stage-label">
                      <span className="stage-num">2</span>Боловсруулалт
                    </span>
                    <div className="node node--service">
                      <div className="node__head">
                        <span className="node__icon node__icon--sm">
                          <svg className="icon">
                            <use href="#i-compass"></use>
                          </svg>
                        </span>
                        <span className="node__title">
                          Өгөгдлийн стратеги зөвлөх
                        </span>
                      </div>
                      <ul className="ticks ticks--navy stagger">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Одоогийн байдлын үнэлгээ
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Зорилтот бүтэц
                        </li>
                        <li className="ticks__note">
                          Хэрэгжүүлэлт биш, зөвлөгөө
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div aria-hidden="true" className="flow__conn flow__conn--2">
                    <span className="flow__line">
                      <span className="flow__dash"></span>
                      <span className="flow__dot"></span>
                    </span>
                    <svg className="flow__arrow" viewBox="0 0 10 12">
                      <path d="M0 0 10 6 0 12z"></path>
                    </svg>
                  </div>
                  <div className="flow__col flow__col--output">
                    <span className="stage-label">
                      <span className="stage-num">3</span>Үр дүн
                    </span>
                    <div className="node">
                      <div className="node__head node__head--between">
                        <span className="node__title">Замын зураг</span>
                        <span className="badge badge--muted">Жишээ</span>
                      </div>
                      <ol className="roadmap stagger">
                        <li>
                          <span className="roadmap__rail">
                            <span className="roadmap__num">1</span>
                            <span className="roadmap__line"></span>
                          </span>
                          <span className="roadmap__label">
                            Сарын KPI тайлан
                          </span>
                        </li>
                        <li>
                          <span className="roadmap__rail">
                            <span className="roadmap__num">2</span>
                            <span className="roadmap__line"></span>
                          </span>
                          <span className="roadmap__label">
                            Өгөгдлийн автоматжуулалт
                          </span>
                        </li>
                        <li>
                          <span className="roadmap__rail">
                            <span className="roadmap__num roadmap__num--navy">
                              3
                            </span>
                          </span>
                          <span className="roadmap__label">
                            Өгөгдлийн агуулах
                          </span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="flow-caption">
                  <p>
                    <strong>Өгөгдлийн стратеги зөвлөх.</strong> Аль замаар,
                    юунаас эхлэхийг хамт тодорхойлно.
                  </p>
                  <a
                    className="link-arrow link-arrow--navy"
                    data-solution="4"
                    href="#solutions"
                  >
                    Дэлгэрэнгүй
                    <svg className="icon">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--white" id="problem">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Асуудал</span>
              <h2 className="h2">Та одоо хэрхэн шийдвэр гаргаж байна вэ?</h2>
            </div>
            <ol className="problem-list">
              <li className="problem">
                <span aria-hidden="true" className="problem__num">
                  01
                </span>
                <div>
                  <h3 className="problem__title">Тайлан хоцорч ирдэг</h3>
                  <p className="problem__text">
                    Мэдээллээ нэгтгэж дуусах хооронд шийдвэр гаргах хугацаа
                    өнгөрчихдөг.
                  </p>
                </div>
                <a
                  className="module-link module-link--product"
                  data-solution="0"
                  href="#solutions"
                >
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                  Сарын KPI тайлан
                </a>
              </li>
              <li className="problem">
                <span aria-hidden="true" className="problem__num">
                  02
                </span>
                <div>
                  <h3 className="problem__title">
                    Өгөгдөл ачаалах ажил гараар хийгддэг
                  </h3>
                  <p className="problem__text">
                    Шөнө бүрийн ачаалал, скрипт, алдааг хүн хянаж суудаг.
                  </p>
                </div>
                <a
                  className="module-link module-link--product"
                  data-solution="1"
                  href="#solutions"
                >
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                  Өгөгдлийн автоматжуулалт
                </a>
              </li>
              <li className="problem">
                <span aria-hidden="true" className="problem__num">
                  03
                </span>
                <div>
                  <h3 className="problem__title">
                    Бэлэн тайлан хэрэгцээнд нийцдэггүй
                  </h3>
                  <p className="problem__text">
                    Системийн стандарт тайлан танай бизнесийн асуултад
                    хариулдаггүй.
                  </p>
                </div>
                <a className="module-link" data-solution="2" href="#solutions">
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                  Захиалгат дашбоард
                </a>
              </li>
              <li className="problem">
                <span aria-hidden="true" className="problem__num">
                  04
                </span>
                <div>
                  <h3 className="problem__title">Мэдээлэл олон газар тарсан</h3>
                  <p className="problem__text">
                    Зээл, эргэн төлөлт, тайлангийн тоо өөр өөр системд байдаг
                    тул нэгтгэхэд цаг ордог.
                  </p>
                </div>
                <a className="module-link" data-solution="3" href="#solutions">
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                  Өгөгдлийн агуулахын зөвлөх
                </a>
              </li>
              <li className="problem">
                <span aria-hidden="true" className="problem__num">
                  05
                </span>
                <div>
                  <h3 className="problem__title">
                    Өгөгдөл өсөж, систем олширсон
                  </h3>
                  <p className="problem__text">
                    Нэгдсэн бүтэц байхгүй тул шинэ хэрэгцээ бүр шинэ төсөл
                    болдог.
                  </p>
                </div>
                <a className="module-link" data-solution="4" href="#solutions">
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                  Өгөгдлийн стратеги зөвлөх
                </a>
              </li>
            </ol>
          </div>
        </section>

        <section className="section" id="solutions">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Шийдэл</span>
              <h2 className="h2">Танд тохирох шийдэл</h2>
              <p>2 бүтээгдэхүүн, 3 үйлчилгээ. Хэрэгцээндээ тааруулж сонгоно.</p>
            </div>
            <div
              aria-label="Шийдлүүд"
              className="solution-tabs"
              data-solutions=""
              role="tablist"
            >
              <button
                aria-controls="sol-panel-0"
                aria-selected="true"
                className="solution-tab"
                data-kind="product"
                id="sol-tab-0"
                role="tab"
                type="button"
              >
                <span className="solution-tab__meta">
                  <span className="solution-tab__kind">Бүтээгдэхүүн</span>
                </span>
                <span className="solution-tab__name">Сарын KPI тайлан</span>
              </button>
              <button
                aria-controls="sol-panel-1"
                aria-selected="false"
                className="solution-tab"
                data-kind="product"
                id="sol-tab-1"
                role="tab"
                tabIndex="-1"
                type="button"
              >
                <span className="solution-tab__meta">
                  <span className="solution-tab__kind">Бүтээгдэхүүн</span>
                  <span className="badge badge--soon">Удахгүй</span>
                </span>
                <span className="solution-tab__name">
                  Өгөгдлийн автоматжуулалт
                </span>
              </button>
              <button
                aria-controls="sol-panel-2"
                aria-selected="false"
                className="solution-tab"
                data-kind="service"
                id="sol-tab-2"
                role="tab"
                tabIndex="-1"
                type="button"
              >
                <span className="solution-tab__meta">
                  <span className="solution-tab__kind">Үйлчилгээ</span>
                </span>
                <span className="solution-tab__name">Захиалгат дашбоард</span>
              </button>
              <button
                aria-controls="sol-panel-3"
                aria-selected="false"
                className="solution-tab"
                data-kind="service"
                id="sol-tab-3"
                role="tab"
                tabIndex="-1"
                type="button"
              >
                <span className="solution-tab__meta">
                  <span className="solution-tab__kind">Үйлчилгээ</span>
                </span>
                <span className="solution-tab__name">
                  Өгөгдлийн агуулахын зөвлөх
                </span>
              </button>
              <button
                aria-controls="sol-panel-4"
                aria-selected="false"
                className="solution-tab"
                data-kind="service"
                id="sol-tab-4"
                role="tab"
                tabIndex="-1"
                type="button"
              >
                <span className="solution-tab__meta">
                  <span className="solution-tab__kind">Үйлчилгээ</span>
                </span>
                <span className="solution-tab__name">
                  Өгөгдлийн стратеги зөвлөх
                </span>
              </button>
            </div>

            <div
              aria-labelledby="sol-tab-0"
              className="solution-panel"
              id="sol-panel-0"
              role="tabpanel"
            >
              <div className="solution-panel__body">
                <div className="solution-panel__intro">
                  <span className="pill pill--green">Туршилтын шат</span>
                  <h3>Сарын KPI тайлан</h3>
                  <p className="solution-panel__lead">
                    Excel-ээ сар бүр оруулаад, бэлэн тайлан, мэдэгдэл аваарай.
                  </p>
                </div>
                <dl className="facts">
                  <div>
                    <dt>Хэнд тохирох</dt>
                    <dd>Жижиг, дунд бизнесийн захирал, нягтлан</dd>
                  </div>
                  <div>
                    <dt>Юу багтах</dt>
                    <dd>
                      <ul className="ticks ticks--lg">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          5 тайлангийн загвар
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Excel загвар, SharePoint холболт
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Тайлан шинэчлэгдэхэд мэдэгдэл
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
                <a className="btn btn--primary" href="#contact">
                  Туршилтад бүртгүүлэх
                </a>
              </div>
              <div aria-hidden="true" className="mock">
                <div className="mock__head">
                  <div>
                    <div className="mock__company">Монголын Компани ХХК</div>
                    <div className="mock__title">Сарын KPI тайлан, 2026/07</div>
                  </div>
                  <span className="badge badge--green badge--lg">
                    Автоматаар шинэчлэгдсэн
                  </span>
                </div>
                <div className="mock__tabs">
                  <span className="mock__tab is-active">Удирдлагын тойм</span>
                  <span className="mock__tab">Санхүү</span>
                  <span className="mock__tab">Борлуулалт</span>
                  <span className="mock__tab">Авлага/Өглөг</span>
                  <span className="mock__tab">Мөнгөн урсгал</span>
                </div>
                <div className="kpis">
                  <div className="kpi">
                    <span className="kpi__label">Орлого</span>
                    <span className="kpi__value">₮2.19bn</span>
                    <span className="kpi__delta kpi__delta--good">▲ 22.2%</span>
                  </div>
                  <div className="kpi">
                    <span className="kpi__label">Зардал</span>
                    <span className="kpi__value">₮1.64bn</span>
                    <span className="kpi__delta kpi__delta--bad">▲ 12.3%</span>
                  </div>
                  <div className="kpi">
                    <span className="kpi__label">Цэвэр ашиг</span>
                    <span className="kpi__value">₮549M</span>
                    <span className="kpi__delta kpi__delta--good">▲ 66.4%</span>
                  </div>
                </div>
                <div className="panel-box">
                  <span className="panel-box__title">Орлого, сараар</span>
                  <div className="col-chart">
                    <span style={{ "--h": "66%" }}></span>
                    <span style={{ "--h": "51%" }}></span>
                    <span style={{ "--h": "72%" }}></span>
                    <span style={{ "--h": "77%" }}></span>
                    <span style={{ "--h": "84%" }}></span>
                    <span style={{ "--h": "81%" }}></span>
                    <span
                      className="is-current"
                      style={{ "--h": "100%" }}
                    ></span>
                  </div>
                  <div className="axis">
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                    <span>06</span>
                    <span>07</span>
                  </div>
                </div>
                <div className="notice">
                  <svg className="icon">
                    <use href="#i-mail"></use>
                  </svg>
                  Тайлан 2026/08/01-нд bat@company.mn руу илгээгдлээ
                </div>
              </div>
            </div>

            <div
              aria-labelledby="sol-tab-1"
              className="solution-panel"
              hidden
              id="sol-panel-1"
              role="tabpanel"
            >
              <div className="solution-panel__body">
                <div className="solution-panel__intro">
                  <span className="pill pill--soon">Удахгүй</span>
                  <h3>Өгөгдлийн автоматжуулалт</h3>
                  <p className="solution-panel__lead">
                    Хоёр талын query-г бичээд, үлдсэнийг платформ хийнэ.
                  </p>
                </div>
                <dl className="facts">
                  <div>
                    <dt>Хэнд тохирох</dt>
                    <dd>Банк, ББСБ, дунд компанийн IT баг</dd>
                  </div>
                  <div>
                    <dt>Юу багтах</dt>
                    <dd>
                      <ul className="ticks ticks--lg">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Хуваарь, давтан оролдлого, шинэ өгөгдлийн ачаалал
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Ажиллалтын түүх, алдааны мэдэгдэл
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Танай сервер дээр ажиллана
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
                <a className="btn btn--primary" href="#contact">
                  Танилцуулга авах
                </a>
              </div>
              <div aria-hidden="true" className="mock">
                <div className="mock__head mock__head--center">
                  <div className="mock__title mock__title--sm">
                    Pipeline · Odoo → Агуулах
                  </div>
                  <span className="badge badge--green badge--lg">
                    <span className="status__dot"></span>Идэвхтэй
                  </span>
                </div>
                <ol className="pipeline">
                  <li className="pipeline__step">
                    <span className="pipeline__num">1</span>
                    <span className="pipeline__name">Эх систем</span>
                    <span className="pipeline__meta">Odoo, 1C</span>
                  </li>
                  <li className="pipeline__step">
                    <span className="pipeline__num">2</span>
                    <span className="pipeline__name">Татах query</span>
                    <span className="badge badge--outline-navy">Та бичнэ</span>
                  </li>
                  <li className="pipeline__step">
                    <span className="pipeline__num">3</span>
                    <span className="pipeline__name">Staging</span>
                    <span className="badge badge--solid-green">Автомат</span>
                  </li>
                  <li className="pipeline__step">
                    <span className="pipeline__num">4</span>
                    <span className="pipeline__name">Ачаалах query</span>
                    <span className="badge badge--outline-navy">Та бичнэ</span>
                  </li>
                  <li className="pipeline__step">
                    <span className="pipeline__num">5</span>
                    <span className="pipeline__name">Өгөгдлийн агуулах</span>
                    <span className="badge badge--solid-green">Автомат</span>
                  </li>
                </ol>
                <div className="mock__foot">
                  <svg className="icon">
                    <use href="#i-clock"></use>
                  </svg>
                  Хуваарь: өдөр бүр 02:00 · Сүүлийн ажиллалт амжилттай
                </div>
              </div>
            </div>

            <div
              aria-labelledby="sol-tab-2"
              className="solution-panel"
              hidden
              id="sol-panel-2"
              role="tabpanel"
            >
              <div className="solution-panel__body">
                <div className="solution-panel__intro">
                  <span className="pill pill--navy">Үйлчилгээ</span>
                  <h3>Захиалгат дашбоард</h3>
                  <p className="solution-panel__lead">
                    Танай системд холбогдсон, хэрэгцээнд тань тохирсон тайлан.
                  </p>
                </div>
                <dl className="facts">
                  <div>
                    <dt>Хэнд тохирох</dt>
                    <dd>Бэлэн загвар хүрэлцэхгүй байгаа компани</dd>
                  </div>
                  <div>
                    <dt>Юу багтах</dt>
                    <dd>
                      <ul className="ticks ticks--lg ticks--navy">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Power BI эсвэл веб тайлан
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Odoo, 1C, мэдээллийн сантай холболт
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Тоо тулгалт, сургалт
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
                <a className="btn btn--navy" href="#contact">
                  Зөвлөгөө авах
                </a>
              </div>
              <div aria-hidden="true" className="mock">
                <div className="mock__head">
                  <div>
                    <div className="mock__company">Монголын Компани ХХК</div>
                    <div className="mock__title mock__title--sm">
                      Санхүүгийн хяналт
                    </div>
                  </div>
                  <span className="mock__filter">2026 он · Бүх салбар</span>
                </div>
                <div className="panel-box">
                  <div className="panel-box__head">
                    <span className="panel-box__title">
                      Орлого ба зардал, сараар
                    </span>
                    <span className="legend">
                      <span>
                        <i className="legend__line"></i>Орлого
                      </span>
                      <span>
                        <i className="legend__line legend__line--dashed"></i>
                        Зардал
                      </span>
                    </span>
                  </div>
                  <svg
                    className="line-chart"
                    preserveAspectRatio="none"
                    viewBox="0 0 460 150"
                  >
                    <path
                      className="line-chart__grid"
                      d="M0 145H460M0 95H460M0 45H460"
                    ></path>
                    <polyline
                      className="line-chart__exp"
                      points="10,113 83,127 157,104 230,97 303,91 377,86 450,74"
                    ></polyline>
                    <polyline
                      className="line-chart__rev"
                      points="10,91 83,120 157,79 230,69 303,56 377,61 450,25"
                    ></polyline>
                  </svg>
                  <div className="axis axis--spread">
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                    <span>06</span>
                    <span>07</span>
                  </div>
                </div>
                <div className="panel-box">
                  <span className="panel-box__title">Авлагын насжилт</span>
                  <div className="aging">
                    <span className="aging__1" style={{ "--w": "52%" }}></span>
                    <span className="aging__2" style={{ "--w": "24%" }}></span>
                    <span className="aging__3" style={{ "--w": "14%" }}></span>
                    <span className="aging__4" style={{ "--w": "10%" }}></span>
                  </div>
                  <div className="aging-legend">
                    <span>
                      <i className="aging__1"></i>1-30 хоног · 52%
                    </span>
                    <span>
                      <i className="aging__2"></i>31-60 · 24%
                    </span>
                    <span>
                      <i className="aging__3"></i>61-90 · 14%
                    </span>
                    <span>
                      <i className="aging__4"></i>90+ · 10%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-labelledby="sol-tab-3"
              className="solution-panel"
              hidden
              id="sol-panel-3"
              role="tabpanel"
            >
              <div className="solution-panel__body">
                <div className="solution-panel__intro">
                  <span className="pill pill--navy">Үйлчилгээ</span>
                  <h3>Өгөгдлийн агуулахын зөвлөх</h3>
                  <p className="solution-panel__lead">
                    Зээл, эргэн төлөлт, тайлангийн мэдээллийг нэг загварт
                    нэгтгэнэ.
                  </p>
                </div>
                <dl className="facts">
                  <div>
                    <dt>Хэнд тохирох</dt>
                    <dd>ББСБ, санхүүгийн байгууллага</dd>
                  </div>
                  <div>
                    <dt>Юу багтах</dt>
                    <dd>
                      <ul className="ticks ticks--lg ticks--navy">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Стандарт өгөгдлийн загвар
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Хугацаа хэтэрсэн зээл (PAR), эрсдэлийн сан, СЗХ-ны
                          тайлан
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Өдөр бүрийн автомат ачаалал
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
                <a className="btn btn--navy" href="#contact">
                  Зөвлөгөө авах
                </a>
              </div>
              <div aria-hidden="true" className="mock">
                <div className="mock__title mock__title--sm">
                  Өгөгдлийн загвар, жишээ
                </div>
                <div className="star">
                  <span className="star__dim">Харилцагч</span>
                  <span className="star__v"></span>
                  <div className="star__row">
                    <span className="star__dim">Салбар</span>
                    <span className="star__h"></span>
                    <span className="star__fact">Зээлийн гүйлгээ</span>
                    <span className="star__h"></span>
                    <span className="star__dim">Бүтээгдэхүүн</span>
                  </div>
                  <span className="star__v"></span>
                  <span className="star__dim">Огноо</span>
                </div>
                <div className="outputs">
                  <span className="outputs__label">Гаралт</span>
                  <div className="tags">
                    <span className="tag">PAR тайлан</span>
                    <span className="tag">Эрсдэлийн сан</span>
                    <span className="tag">СЗХ-ны тайлан</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-labelledby="sol-tab-4"
              className="solution-panel"
              hidden
              id="sol-panel-4"
              role="tabpanel"
            >
              <div className="solution-panel__body">
                <div className="solution-panel__intro">
                  <span className="pill pill--navy">Үйлчилгээ</span>
                  <h3>Өгөгдлийн стратеги зөвлөх</h3>
                  <p className="solution-panel__lead">
                    Одоогийн байдлаа үнэлүүлж, дараагийн алхмын замын зурагтай
                    болно. Хэрэгжүүлэлт биш, зөвлөгөө.
                  </p>
                </div>
                <dl className="facts">
                  <div>
                    <dt>Хэнд тохирох</dt>
                    <dd>Олон систем, өсөж буй өгөгдөлтэй компани</dd>
                  </div>
                  <div>
                    <dt>Юу багтах</dt>
                    <dd>
                      <ul className="ticks ticks--lg ticks--navy">
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Одоогийн байдлын үнэлгээ
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Өгөгдлийн чанар, засаглалын зөвлөмж
                        </li>
                        <li>
                          <svg className="icon">
                            <use href="#i-check"></use>
                          </svg>
                          Үе шаттай замын зураг
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
                <a className="btn btn--navy" href="#contact">
                  Зөвлөгөө авах
                </a>
              </div>
              <div aria-hidden="true" className="mock">
                <div className="mock__title mock__title--sm">
                  Зөвлөгөөний явц
                </div>
                <ol className="timeline">
                  <li>
                    <span className="timeline__rail">
                      <span className="timeline__num">1</span>
                      <span className="timeline__line"></span>
                    </span>
                    <span className="timeline__body">
                      <span className="timeline__title">Үнэлгээ</span>
                      <span className="timeline__text">
                        Одоогийн систем, өгөгдлийн чанар, тайлангийн хэрэгцээ
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="timeline__rail">
                      <span className="timeline__num">2</span>
                      <span className="timeline__line"></span>
                    </span>
                    <span className="timeline__body">
                      <span className="timeline__title">Зорилтот бүтэц</span>
                      <span className="timeline__text">
                        Танай хэмжээнд тохирох өгөгдлийн бүтэц
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="timeline__rail">
                      <span className="timeline__num timeline__num--filled">
                        3
                      </span>
                    </span>
                    <span className="timeline__body">
                      <span className="timeline__title">Замын зураг</span>
                      <span className="timeline__text">
                        Үе шаттай төлөвлөгөө, аль модулиас эхлэх
                      </span>
                    </span>
                  </li>
                </ol>
                <div className="result">
                  <svg className="icon">
                    <use href="#i-doc"></use>
                  </svg>
                  Үр дүн: үнэлгээний тайлан, замын зураг
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--white" id="why">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Яагаад DataView?</span>
              <h2 className="h2">Бусдаас юугаараа ялгаатай вэ?</h2>
            </div>
            <div className="why-grid">
              <article className="why-feature">
                <div className="why-feature__top">
                  <span className="why-feature__icon">
                    <svg className="icon">
                      <use href="#i-trending"></use>
                    </svg>
                  </span>
                  <h3>Цогц платформ, алхам алхмаар</h3>
                  <p>
                    Сарын тайлангаас эхэлж, хэрэгцээ өсөхөд өгөгдлийн агуулах
                    руу нэг багтайгаа өргөжинө. Том төсөл эхлүүлэх шаардлагагүй.
                  </p>
                </div>
                <ol className="growth">
                  <li>
                    <span className="growth__rail">
                      <span className="growth__dot growth__dot--filled"></span>
                      <span className="growth__line"></span>
                    </span>
                    <span className="growth__label">Сарын KPI тайлан</span>
                  </li>
                  <li>
                    <span className="growth__rail">
                      <span className="growth__dot"></span>
                      <span className="growth__line"></span>
                    </span>
                    <span className="growth__label">
                      Өгөгдлийн автоматжуулалт
                    </span>
                  </li>
                  <li>
                    <span className="growth__rail">
                      <span className="growth__dot"></span>
                    </span>
                    <span className="growth__label">Өгөгдлийн агуулах</span>
                  </li>
                </ol>
              </article>
              <article className="card">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-building"></use>
                  </svg>
                </span>
                <h3>Монгол бизнест тохирсон</h3>
                <p>
                  НӨАТ, СЗХ-ны тайлан, Цагаан сарын улирал — бүгд монгол хэлээр.
                </p>
              </article>
              <article className="card">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-db"></use>
                  </svg>
                </span>
                <h3>Ашигладаг мэдээлэл дээрээ ажиллана</h3>
                <p>
                  Excel, 1C, Odoo болон мэдээллийн сангуудтай холбох боломжийг
                  шалгаж, танайд тохирох хувилбарыг санал болгоно.
                </p>
              </article>
              <article className="card">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-layout"></use>
                  </svg>
                </span>
                <h3>Бэлэн загвараас, танай хэрэгцээнд</h3>
                <p>
                  Таван загвараас сонгож, танд хэрэгтэй үзүүлэлт, хүснэгт,
                  графикийг тохируулна.
                </p>
              </article>
              <article className="card">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-message"></use>
                  </svg>
                </span>
                <h3>Хэрэгцээ, зардлаа эхлээд ярилцъя</h3>
                <p>
                  Сонгох тайлан, мэдээллийн холболт, нэмэлт тохиргооноос
                  хамаарах ажлын хүрээ болон үнийг тодорхой болгоно.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <div className="how-head">
              <div className="section-head">
                <span className="eyebrow">Хэрхэн ажилладаг</span>
                <h2 className="h2">Хэрхэн ажилладаг вэ?</h2>
              </div>
              <div
                aria-label="Шийдлийн төрөл"
                className="segmented"
                data-how=""
                role="tablist"
              >
                <button
                  aria-controls="how-panel-0"
                  aria-selected="true"
                  className="segmented__btn"
                  id="how-tab-0"
                  role="tab"
                  type="button"
                >
                  Сарын KPI тайлан
                </button>
                <button
                  aria-controls="how-panel-1"
                  aria-selected="false"
                  className="segmented__btn"
                  id="how-tab-1"
                  role="tab"
                  tabIndex="-1"
                  type="button"
                >
                  Өгөгдлийн автоматжуулалт
                </button>
                <button
                  aria-controls="how-panel-2"
                  aria-selected="false"
                  className="segmented__btn"
                  id="how-tab-2"
                  role="tab"
                  tabIndex="-1"
                  type="button"
                >
                  Үйлчилгээ
                </button>
              </div>
            </div>
            <div
              aria-labelledby="how-tab-0"
              className="how-panel"
              id="how-panel-0"
              role="tabpanel"
            >
              <ol className="steps">
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">1</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Загвараа сонгоно</h3>
                  <p>Хэрэгтэй тайлангаа сонгоно.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">2</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Excel загвар авна</h3>
                  <p>Манай бэлэн Excel загварыг татна.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">3</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Сар бүр оруулна</h3>
                  <p>Файлаа оруулна эсвэл SharePoint-оос автоматаар.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">4</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Тайлан, мэдэгдэл авна</h3>
                  <p>Тайлан шинэчлэгдэж, мэдэгдэл ирнэ.</p>
                </li>
              </ol>
            </div>
            <div
              aria-labelledby="how-tab-1"
              className="how-panel"
              hidden
              id="how-panel-1"
              role="tabpanel"
            >
              <ol className="steps">
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">1</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Эх үүсвэрээ холбоно</h3>
                  <p>Odoo, 1C эсвэл мэдээллийн сантай зөвхөн унших эрхээр.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">2</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Татах query бичнэ</h3>
                  <p>Ямар датаг авахаа тодорхойлно.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">3</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Ачаалах query бичнэ</h3>
                  <p>Агуулах руу хэрхэн ачаалахаа тодорхойлно.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">4</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Үлдсэнийг платформ хийнэ</h3>
                  <p>Хуваарь, давтан оролдлого, алдааны мэдэгдэл.</p>
                </li>
              </ol>
            </div>
            <div
              aria-labelledby="how-tab-2"
              className="how-panel"
              hidden
              id="how-panel-2"
              role="tabpanel"
            >
              <ol className="steps">
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">1</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Танилцах</h3>
                  <p>Ашигладаг систем, хэрэгтэй тайлангаа хэлнэ.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">2</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Дата холболт</h3>
                  <p>Зөвхөн унших эрхээр холбогдож, бүтцийг судална.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">3</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Угсрах, тулгах</h3>
                  <p>Бодит датаар бүтээж, тоог нягтлангийн тоотой тулгана.</p>
                </li>
                <li className="step">
                  <span className="step__head">
                    <span className="step__num">4</span>
                    <span className="step__line"></span>
                  </span>
                  <h3>Хүлээлгэн өгөх</h3>
                  <p>Танилцуулж, санал авч, эцсийн тохиргоо хийнэ.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section section--navy" id="trust">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Бидний баталгаа</span>
              <h2 className="h2">Бидэнд итгэж болох шалтгаан</h2>
            </div>
            <div className="trust-grid">
              <article className="card card--dark">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-shield-check"></use>
                  </svg>
                </span>
                <h3>Зөвхөн унших эрх</h3>
                <p>
                  Танай системд зөвхөн унших эрхээр холбогдож, мэдээллийг
                  өөрчлөхгүй. Дамжуулах, хадгалахдаа шифрлэнэ.
                </p>
              </article>
              <article className="card card--dark">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-clipboard-check"></use>
                  </svg>
                </span>
                <h3>Тоо тулгасан тайлан</h3>
                <p>
                  Тайланг танай нягтлангийн тоотой тулгаж шалгасны дараа
                  хүлээлгэн өгнө.
                </p>
              </article>
              <article className="card card--dark">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-award"></use>
                  </svg>
                </span>
                <h3>Санхүүгийн өгөгдлийн туршлага</h3>
                <p>
                  Банкны ETL, Power BI, санхүүгийн тайлангийн систем дээр 5+ жил
                  ажилласан инженерүүд.
                </p>
              </article>
              <article className="card card--dark">
                <span className="card__icon">
                  <svg className="icon">
                    <use href="#i-gift"></use>
                  </svg>
                </span>
                <h3>Эхний харилцагчдад</h3>
                <p>Эхний 5 байгууллагад сунгасан дэмжлэг.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--white" id="faq">
          <div className="container faq-layout">
            <div className="section-head">
              <span className="eyebrow">Түгээмэл асуулт</span>
              <h2 className="h2">Асуулт хариулт</h2>
              <p>
                Өөр асуулт байвал <a href="#contact">бидэнтэй холбогдоорой</a>.
              </p>
            </div>
            <div className="faq" data-faq="">
              <details name="faq" open="">
                <summary>
                  <span>Манай ашигладаг системтэй холбогдох уу?</span>
                  <span aria-hidden="true" className="faq__icon">
                    <svg className="icon">
                      <use href="#i-chevron"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq__answer">
                  Excel, 1C, Odoo-той бэлэн ажиллана. Oracle, SQL Server зэрэг
                  бусад мэдээллийн сантай холбох боломжийг тухай бүр шалгаж
                  өгнө. Та ашигладаг системээ хэлээрэй.
                </p>
              </details>
              <details name="faq">
                <summary>
                  <span>Хэзээнээс тайлангаа үзэж эхлэх вэ?</span>
                  <span aria-hidden="true" className="faq__icon">
                    <svg className="icon">
                      <use href="#i-chevron"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq__answer">
                  Сарын KPI тайлан: Excel файлаа оруулмагц тайлан бэлэн болно.
                  Үйлчилгээний хувьд системийн төрлөөс хамаарч хугацааг эхний
                  уулзалтаар тохирно.
                </p>
              </details>
              <details name="faq">
                <summary>
                  <span>Манай талаас юу бэлдэх хэрэгтэй вэ?</span>
                  <span aria-hidden="true" className="faq__icon">
                    <svg className="icon">
                      <use href="#i-chevron"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq__answer">
                  KPI тайлангийн хувьд манай Excel загварыг бөглөхөд хангалттай.
                  Системийн холболтод зөвхөн унших эрх нээж өгнө, бусдыг нь бид
                  хийнэ.
                </p>
              </details>
              <details name="faq">
                <summary>
                  <span>Манай мэдээллийг хэрхэн хамгаалах вэ?</span>
                  <span aria-hidden="true" className="faq__icon">
                    <svg className="icon">
                      <use href="#i-chevron"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq__answer">
                  Танай системд зөвхөн унших эрхээр холбогдож, мэдээллийг
                  өөрчлөхгүй. Дата дамжуулах болон хадгалах үедээ шифрлэгдэнэ.
                </p>
              </details>
              <details name="faq">
                <summary>
                  <span>Тайлангаа өөрийн хэрэгцээнд тохируулж болох уу?</span>
                  <span aria-hidden="true" className="faq__icon">
                    <svg className="icon">
                      <use href="#i-chevron"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq__answer">
                  Таван загвараас сонгоод үзүүлэлт, хүснэгт, графикаа
                  тохируулна. Бүрэн өөр тайлан хэрэгтэй бол Захиалгат дашбоард
                  үйлчилгээг сонгоорой.
                </p>
              </details>
              <details name="faq">
                <summary>
                  <span>Үйлчилгээгээ зогсоох бол яах вэ?</span>
                  <span aria-hidden="true" className="faq__icon">
                    <svg className="icon">
                      <use href="#i-chevron"></use>
                    </svg>
                  </span>
                </summary>

                <p className="faq__answer">
                  [Гэрээ цуцлах нөхцөл, датаг буцааж өгөх, устгах журам]
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact-grid">
            <div>
              <div className="section-head">
                <span className="eyebrow">Холбоо барих</span>
                <h2 className="h2">Бидэнтэй холбогдох</h2>
                <p>
                  Маягт бөглөөд илгээнэ үү, бид 1–3 ажлын өдрийн дотор хариу
                  өгнө.
                </p>
              </div>
              <ul className="contact-info">
                <li className="contact-item">
                  <span className="contact-item__icon">
                    <svg className="icon">
                      <use href="#i-phone"></use>
                    </svg>
                  </span>
                  <span>
                    <span className="contact-item__label">Утас</span>
                    <a className="contact-item__value" href="tel:+97677000000">
                      +976 7700 0000
                    </a>
                  </span>
                </li>
                <li className="contact-item">
                  <span className="contact-item__icon">
                    <svg className="icon">
                      <use href="#i-mail"></use>
                    </svg>
                  </span>
                  <span>
                    <span className="contact-item__label">Имэйл</span>
                    <a
                      className="contact-item__value"
                      href="mailto:hello@dataview.mn"
                    >
                      hello@dataview.mn
                    </a>
                  </span>
                </li>
                <li className="contact-item">
                  <span className="contact-item__icon">
                    <svg className="icon">
                      <use href="#i-pin"></use>
                    </svg>
                  </span>
                  <span>
                    <span className="contact-item__label">Хаяг</span>
                    <span className="contact-item__value">
                      Улаанбаатар, Хан-Уул дүүрэг
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <form className="contact-form" id="contact-form" novalidate="">
              <div className="field-grid">
                <div className="field">
                  <label className="label" htmlFor="c-name">
                    Нэр
                  </label>
                  <input
                    aria-describedby="c-name-error"
                    autoComplete="name"
                    className="input"
                    id="c-name"
                    name="name"
                    placeholder="Бат-Эрдэнэ"
                    required=""
                    type="text"
                  />
                  <span
                    className="field__error"
                    hidden
                    id="c-name-error"
                  ></span>
                </div>
                <div className="field">
                  <label className="label" htmlFor="c-company">
                    Компани
                  </label>
                  <input
                    autoComplete="organization"
                    className="input"
                    id="c-company"
                    name="company"
                    placeholder="ХХК нэр"
                    type="text"
                  />
                </div>
                <div className="field">
                  <label className="label" htmlFor="c-phone">
                    Утас
                  </label>
                  <input
                    aria-describedby="c-phone-error"
                    autoComplete="tel"
                    className="input"
                    id="c-phone"
                    inputMode="tel"
                    name="phone"
                    placeholder="+976 9900 0000"
                    type="tel"
                  />
                  <span
                    className="field__error"
                    hidden
                    id="c-phone-error"
                  ></span>
                </div>
                <div className="field">
                  <label className="label" htmlFor="c-email">
                    Имэйл
                  </label>
                  <input
                    aria-describedby="c-email-error"
                    autoComplete="email"
                    className="input"
                    id="c-email"
                    inputMode="email"
                    name="email"
                    placeholder="email@company.mn"
                    type="email"
                  />
                  <span
                    className="field__error"
                    hidden
                    id="c-email-error"
                  ></span>
                </div>
              </div>
              <fieldset className="choice-group">
                <legend className="label">
                  Ямар шийдэл сонирхож байна вэ?
                </legend>
                <div className="choices">
                  <button
                    aria-pressed="false"
                    className="choice"
                    data-choice="Сарын KPI тайлан"
                    type="button"
                  >
                    Сарын KPI тайлан
                  </button>
                  <button
                    aria-pressed="false"
                    className="choice"
                    data-choice="Өгөгдлийн автоматжуулалт"
                    type="button"
                  >
                    Өгөгдлийн автоматжуулалт
                  </button>
                  <button
                    aria-pressed="false"
                    className="choice"
                    data-choice="Захиалгат дашбоард"
                    type="button"
                  >
                    Захиалгат дашбоард
                  </button>
                  <button
                    aria-pressed="false"
                    className="choice"
                    data-choice="Өгөгдлийн агуулахын зөвлөх"
                    type="button"
                  >
                    Өгөгдлийн агуулахын зөвлөх
                  </button>
                  <button
                    aria-pressed="false"
                    className="choice"
                    data-choice="Өгөгдлийн стратеги зөвлөх"
                    type="button"
                  >
                    Өгөгдлийн стратеги зөвлөх
                  </button>
                </div>
                <input name="solutions" type="hidden" value="" />
              </fieldset>
              <div className="field">
                <label className="label" htmlFor="c-note">
                  Дэлгэрэнгүй <span className="optional">(заавал биш)</span>
                </label>
                <textarea
                  className="input"
                  id="c-note"
                  name="note"
                  placeholder="Ямар систем ашигладаг, юу хэрэгтэй байгаагаа товч бичээрэй"
                  rows="4"
                ></textarea>
              </div>
              <button
                className="btn btn--primary btn--lg btn--block"
                data-submit=""
                type="submit"
              >
                <span data-submit-label="">Илгээх</span>
                <svg className="icon">
                  <use href="#i-arrow"></use>
                </svg>
              </button>
              <div
                aria-live="polite"
                className="form-status"
                data-form-status=""
                hidden
                role="status"
              ></div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}