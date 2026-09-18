import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

const defaultHomeContent = {
  hero: {
    eyebrow: "DATAVIEW MONGOLIA — ХАРЬЦУУЛАЛТ",
    title: "Мэдээлэлд суурилсан шийдвэр — нэг харцаар.",
    description:
      "Excel-ийн хаосыг орхиж — бодит цагийн санхүүгийн мэдээлэлд шилж.",
    beforeLabel: "ӨМНӨ · EXCEL",
    afterLabel: "ДАРАА · DATAVIEW",
    compareHint: "↔ Чирж харьцуулах ↔",
    primaryButton: "Холбогдох",
    secondaryButton: "Загварууд үзэх",
    note: "",
    badge: "Бодит цаг ⚡",
    previewTitle: "DataView Mongolia",
    previewTime: "Excel → DataView",
    previewKpis: [
      {
        label: "НИЙТ БОРЛУУЛАЛТ",
        value: "₮ 2,847.6M",
        className: "",
      },
      {
        label: "НӨАТ ТАТВАР",
        value: "₮ 284.8M",
        className: "",
      },
      {
        label: "ИДЭВХТЭЙ ЗАХИАЛГА",
        value: "3,284",
        className: "",
      },
      {
        label: "ЦЭВЭР АШИГ",
        value: "₮ 712.4M",
        className: "",
      },
    ],
    barChartTitle: "Сар бүрийн борлуулалт",
    lineChartTitle: "Борлуулалтын чиг",
  },

  problem: {
    kicker: "АСУУДАЛ",
    title: "Та одоо хэрхэн шийдвэр гаргаж байна вэ?",
    items: [
      {
        icon: "◷",
        title: "Нягтлангийн Excel-ийг хүлээнэ",
        description: "Сар бүрийн тайлан 2 долоо хоног хоцорч ирнэ",
      },
      {
        icon: "✎",
        title: "Гар ажил, алдаатай",
        description: "Pivot table, copy-paste, зөрүү тоо",
      },
      {
        icon: "⚡",
        title: "Бодит цагийн мэдээлэл байхгүй",
        description:
          "Өнөөдрийн борлуулалт, мөнгөн үлдэгдэл хэд вэ? — Хэн ч хариулж чадахгүй",
      },
    ],
  },

  templates: {
    kicker: "ШИЙДЭЛ",
    title: "Туршигдсан 5 загвар — тэг-ээс эхлэх шаардлагагүй",
    note: "Загвар бүр бүрэн монгол хэлээр, утас компьютер хоёуланд нь",
    items: [
      {
        icon: "🏢",
        title: "Захирлын тойм (CEO)",
        description:
          "Компанийн гол үзүүлэлт, орлого, ашиг, зардал нэг хараанд",
        className: "template-cyan",
      },
      {
        icon: "💰",
        title: "Санхүү (Financial)",
        description:
          "Ашиг орлогын тайлан, мөнгөн урсгал, зардлын задаргаа",
        className: "template-blue",
      },
      {
        icon: "📈",
        title: "Борлуулалт (Sales)",
        description:
          "Борлуулалтын дүн, бүтээгдэхүүн, менежерийн ажлын үр дүн",
        className: "template-orange",
      },
      {
        icon: "🧾",
        title: "Авлага, Өглөг (AR/AP)",
        description:
          "Авлагын хууль, үлдэгдэл, харилцагчийн тооцооны байдал",
        className: "template-purple",
      },
      {
        icon: "📦",
        title: "Бараа материал (Inventory)",
        description:
          "Нөөцийн үлдэгдэл, эргэлт, дутагдал, илүүдэл дохиолол",
        className: "template-green",
      },
    ],
  },

  benefits: {
    kicker: "ЯАГААД DATAVIEW?",
    title: "Бусдаас юугаараа ялгаатай вэ",
    items: [
      {
        icon: "🌐",
        title: "Бүрэн монгол хэлээр",
        description: "Тайлан, дашбоард, дэмжлэг — бүгд монголоор",
      },
      {
        icon: "▱",
        title: "Бэлэн 5 загвар",
        description: "Тэг-ээс эхлэх биш, туршигдсан загвараас сонгоно",
      },
      {
        icon: "♙",
        title: "Бид өөрсдөө холбож өгнө",
        description: "IT мэдлэг, аналитикч шаардлагагүй",
      },
      {
        icon: "⚡",
        title: "2–3 долоо хоногт бэлэн",
        description: "Олон сарын төсөл биш",
      },
      {
        icon: "▤",
        title: "Ямар ч эх үүсвэрээс",
        description: "Oracle, Excel, 1C — ямар системтэй ч ажиллана",
      },
      {
        icon: "$",
        title: "ЖДБ-ийн төсөвт багтана",
        description: "BI лиценз, аналитикч авахгүйгээр",
      },
    ],
  },

  steps: {
    kicker: "ХЭРХЭН АЖИЛЛАДАГ",
    title: "3 энгийн алхам",
    note: "Танай талаас зөвхөн эрх өгөх л хангалттай",
    items: [
      {
        number: "①",
        title: "Холбогдоно",
        description: "Маягт бөглөх эсвэл утасдах — 1 минут",
      },
      {
        number: "②",
        title: "Бид датаг тань холбоно",
        description:
          "Манай баг танай системд холбогдож, дата цэвэрлэнэ — 2–3 долоо хоног",
      },
      {
        number: "③",
        title: "Дашбоардаa үзнэ",
        description: "Өөрийн хаягаас нэвтэрч, бүх тоогоо харна",
      },
    ],
  },

  testimonials: {
    kicker: "ТУРШЛАГА",
    title: "Харилцагчдын сэтгэгдэл",
    items: [
      {
        text: "Сар бүр Excel тайлан хийхэд 3 хоног зарцуулдаг байсан. Одоо захирал утаснаасаа шууд харна. Бидний санхүүгийн хяналт бодитоор сайжирсан.",
        initials: "БЭ",
        name: "Б. Энхтуяа",
        position: "ГТЗ, Алтан Говь ХХК",
      },
      {
        text: "Манай борлуулалт, авлага, нөөцийг нэг дэлгэцнээс харах боломжтой болсноор шийдвэр гаргах хурд маш эрс нэмэгдсэн. DataView-г бүх ЖДБ-д зөвлөе.",
        initials: "ГС",
        name: "Г. Солонго",
        position: "Гүйцэтгэх захирал, Эрдэнэт Фуд",
      },
    ],
  },

  faq: {
    kicker: "ТҮГЭЭМЭЛ АСУУЛТ",
    title: "Асуулт хариулт",
    items: [
      {
        question: "Ямар системтэй ажилладаг вэ?",
        answer:
          "Oracle, Excel, 1C болон бусад PostgreSQL, MS SQL суурьтай системүүдтэй.",
      },
      {
        question: "Хэр хурдан бэлэн болох вэ?",
        answer:
          "Ихэвчлэн 2–3 долоо хоногийн дотор эхний хувилбарыг бэлэн болгоно.",
      },
      {
        question: "Манай IT баг юу хийх хэрэгтэй вэ?",
        answer:
          "Зөвхөн шаардлагатай өгөгдлийн эх үүсвэрийн хандалт өгөхөд хангалттай.",
      },
      {
        question: "Дата аюулгүй байдал хэрхэн хангагддаг вэ?",
        answer:
          "Хандалтын эрх, хамгаалалттай холболт болон байгууллагын шаардлагад нийцүүлэн тохируулна.",
      },
      {
        question: "Загвараа өөрчилж болох уу?",
        answer:
          "Тийм. KPI, өнгө, хүснэгт, график болон бүтэц бүрийг өөрчилж болно.",
      },
      {
        question: "Гэрээгээ цуцалж болох уу?",
        answer:
          "Тийм. Гэрээний нөхцөлийн дагуу үйлчилгээг цуцлах боломжтой.",
      },
    ],
  },

  contact: {
    kicker: "ХОЛБОО БАРИХ",
    title: "Бидэнтэй холбогдох",
    description:
      "Маягт бөглөөд илгээнэ үү, бид 1 ажлын өдрийн дотор хариу өгнө",
    phone: "+976 7700 0000",
    email: "hello@dataview.mn",
    address: "Улаанбаатар, Хан-Уул дүүрэг",
    submitButton: "Илгээх →",
  },
};

function mergeHomeContent(data) {
  if (!data) return defaultHomeContent;

  return {
    ...defaultHomeContent,
    ...data,
    hero: {
      ...defaultHomeContent.hero,
      ...(data.hero || {}),
      previewKpis:
        data.hero?.previewKpis || defaultHomeContent.hero.previewKpis,
    },
    problem: {
      ...defaultHomeContent.problem,
      ...(data.problem || {}),
      items: data.problem?.items || defaultHomeContent.problem.items,
    },
    templates: {
      ...defaultHomeContent.templates,
      ...(data.templates || {}),
      items: data.templates?.items || defaultHomeContent.templates.items,
    },
    benefits: {
      ...defaultHomeContent.benefits,
      ...(data.benefits || {}),
      items: data.benefits?.items || defaultHomeContent.benefits.items,
    },
    steps: {
      ...defaultHomeContent.steps,
      ...(data.steps || {}),
      items: data.steps?.items || defaultHomeContent.steps.items,
    },
    testimonials: {
      ...defaultHomeContent.testimonials,
      ...(data.testimonials || {}),
      items:
        data.testimonials?.items || defaultHomeContent.testimonials.items,
    },
    faq: {
      ...defaultHomeContent.faq,
      ...(data.faq || {}),
      items: data.faq?.items || defaultHomeContent.faq.items,
    },
    contact: {
      ...defaultHomeContent.contact,
      ...(data.contact || {}),
    },
  };
}

function Home() {
  const navigate = useNavigate();

  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [loading, setLoading] = useState(true);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [comparePosition, setComparePosition] = useState(50);

  const templateOptions = [
    "CEO",
    "Санхүү",
    "Борлуулалт",
    "Авлага,Өглөг",
    "Нөөц",
    "Бүгд",
  ];

  const excelRows = [
    ["Компьютер", "1,250,000", "12", "#REF!", "150,000", "#DIV/0!", "2024-01-15", "ЗА-2401"],
    ["Принтер", "480,000", "5", "2,400,000", "288,000", "2,688,000", "2024-01-16", "ЗА-2402"],
    ["Монитор", "620,000", "8", "4,960,000", "#VALUE!", "???", "???", "ЗА-2403"],
    ["Keyboard", "45,000", "50", "2,250,000", "270,000", "2,520,000", "2024-01-18", "ЗА-2404"],
    ["Mouse", "38,000", "100", "1,900,000", "228,000", "2,128,000", "2024-01-18", "ЗА-2405"],
    ["SSD 512GB", "185,000", "20", "#REF!", "222,000", "#DIV/0!", "2024-01-19", "ЗА-2406"],
    ["RAM 16GB", "120,000", "15", "1,800,000", "216,000", "2,016,000", "2024-01-20", "ЗА-2407"],
    ["Роутер", "95,000", "10", "950,000", "114,000", "1,064,000", "2024-01-21", "ЗА-2408"],
    ["Веб камер", "75,000", "25", "1,875,000", "225,000", "2,100,000", "2024-01-22", "ЗА-2409"],
    ["UPS", "320,000", "6", "#REF!", "230,400", "#VALUE!", "2024-01-23", "ЗА-2410"],
    ["Утас", "890,000", "3", "2,670,000", "320,400", "2,990,400", "2024-01-24", "ЗА-2411"],
    ["Принтер тоо", "150,000", "4", "600,000", "72,000", "672,000", "???", "ЗА-2412"],
  ];

  useEffect(() => {
    const loadHomeContent = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home");

        if (!response.ok) {
          throw new Error(`Home API returned ${response.status}`);
        }

        const result = await response.json();

        setHomeContent(
          result.data ? mergeHomeContent(result.data) : defaultHomeContent
        );
      } catch {
        setHomeContent(defaultHomeContent);
      } finally {
        setLoading(false);
      }
    };

    loadHomeContent();
  }, []);

  useEffect(() => {
    if (!requestMessage) return;

    const timer = setTimeout(() => {
      setRequestMessage("");
      setRequestSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [requestMessage]);

  const toggleTemplate = (template) => {
    if (template === "Бүгд") {
      const individualTemplates = templateOptions.filter(
        (item) => item !== "Бүгд"
      );

      setSelectedTemplates((current) =>
        current.length === individualTemplates.length
          ? []
          : individualTemplates
      );

      return;
    }

    setSelectedTemplates((current) =>
      current.includes(template)
        ? current.filter((item) => item !== template)
        : [...current, template]
    );
  };

  const isAllSelected =
    selectedTemplates.length === templateOptions.length - 1;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    try {
      setSendingRequest(true);
      setRequestMessage("");
      setRequestSuccess(false);

      const formData = new FormData(formElement);

      const name = formData.get("name")?.trim();
      const company = formData.get("company")?.trim();
      const phone = formData.get("phone")?.trim();
      const email = formData.get("email")?.trim();
      const systemType = formData.get("system");

      if (!name || !company || !phone || !email) {
        throw new Error(
          "Нэр, компани, утас, имэйлээ бүрэн оруулна уу."
        );
      }

      const response = await fetch(
        "http://localhost:5000/api/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            company,
            phone,
            email,
            system_type: systemType || null,
            models: selectedTemplates,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP ${response.status}`
        );
      }

      setRequestSuccess(true);
      setRequestMessage(
        result.message || "Хүсэлт амжилттай илгээгдлээ."
      );

      formElement.reset();
      setSelectedTemplates([]);
    } catch (error) {
      setRequestSuccess(false);
      setRequestMessage(
        error.message || "Хүсэлт илгээхэд алдаа гарлаа."
      );
    } finally {
      setSendingRequest(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };


  if (loading) {
    return (
      <div className="home-page">
        <Navbar />
        <div className="home-loading">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navbar />

      <main>
        <section className="landing-hero landing-compare-hero">
          <div className="landing-container compare-hero-container">
            <div className="compare-hero-heading">
              <div className="compare-eyebrow">
                <span />
                {homeContent.hero.eyebrow}
              </div>

              <h1>
                Мэдээлэлд суурилсан шийдвэр —{" "}
                <span className="compare-gradient-text">
                  нэг харцаар.
                </span>
              </h1>

              <p>{homeContent.hero.description}</p>
            </div>

            <div className="compare-labels">
              <span className="compare-label before">
                <i />
                {homeContent.hero.beforeLabel}
              </span>

              <span className="compare-label after">
                <i />
                {homeContent.hero.afterLabel}
              </span>
            </div>

            <div
              className="before-after-demo"
              style={{ "--compare-position": `${comparePosition}%` }}
            >
              <div className="compare-layer compare-excel-layer">
                <div className="excel-side">
                  <div className="excel-toolbar">
                    <strong>Excel</strong>
                    <span>|</span>
                    <span>Файл</span>
                    <span>Засах</span>
                    <span>Харах</span>
                    <span>Оруулах</span>
                  </div>

                  <div className="excel-formula">
                    <span>D4</span>
                    <strong>=#REF!</strong>
                  </div>

                  <div className="excel-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Бараа</th>
                          <th>Нэгж үнэ</th>
                          <th>Тоо</th>
                          <th>Нийт</th>
                          <th>НӨАТ</th>
                          <th>Дүн</th>
                          <th>Огноо</th>
                          <th>Захиалга</th>
                        </tr>
                      </thead>

                      <tbody>
                        {excelRows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                              const error =
                                String(cell).includes("#") ||
                                String(cell).includes("???");

                              return (
                                <td
                                  key={cellIndex}
                                  className={
                                    error ? "excel-error" : ""
                                  }
                                >
                                  {cell}
                                </td>
                              );
                            })}
                          </tr>
                        ))}

                        <tr className="excel-total">
                          <td>НИЙТ ДҮН</td>
                          <td />
                          <td />
                          <td>=SUM(D2:D13)</td>
                          <td />
                          <td>=SUM(F2:F13)</td>
                          <td />
                          <td />
                        </tr>

                        <tr className="excel-total">
                          <td>ШАЛГАЛТ</td>
                          <td />
                          <td />
                          <td className="excel-error">#REF!</td>
                          <td />
                          <td className="excel-error">#REF!</td>
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="excel-note">
                    <strong>ЯАРАЛТАЙ!</strong>
                    <span>Д баганын алдааг хэрэгтэй...</span>
                    <b>☎</b>
                  </div>
                </div>
              </div>

              <div className="compare-layer compare-dataview-layer">
                <div className="dataview-side">
                  <div className="dataview-topbar">
                    <div className="dataview-brand">
                      <div className="dataview-app-icon">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>

                      <strong>
                        {homeContent.hero.previewTitle}
                      </strong>
                    </div>

                    <div className="dataview-topbar-right">
                      <div className="dataview-period">
                        2024 оны 12-р сар
                      </div>

                      <div className="dataview-user">Б</div>
                    </div>
                  </div>

                  <div className="dataview-dashboard dataview-dashboard-dark">
                    <div className="dataview-kpis">
                      {homeContent.hero.previewKpis.map((item, index) => (
                        <div className="dark-kpi" key={index}>
                          <div className="dark-kpi-top">
                            <div>
                              <small>{item.label}</small>
                              <span>
                                {index === 3
                                  ? "Зардлаа хассан"
                                  : index === 2
                                    ? "Нийт баталгаажсан"
                                    : "2024 оны 12-р сар"}
                              </span>
                            </div>

                            <svg viewBox="0 0 90 32" className="kpi-sparkline">
                              <polyline
                                points="0,27 10,21 18,23 29,14 40,16 51,9 62,12 72,5 80,8 90,1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>

                          <strong>{item.value}</strong>

                          <div className="kpi-comparison">
                            <div>
                              <span>Өмнөх сар (11-р сар)</span>
                              <span className="kpi-old-value">
                                {index === 0
                                  ? "₮ 2,541.2M"
                                  : index === 1
                                    ? "₮ 254.3M"
                                    : index === 2
                                      ? "2,971"
                                      : "₮ 504.2M"}
                              </span>
                              <b>▲ {index === 2 ? "10.5%" : index === 3 ? "41.3%" : "12.1%"}</b>
                            </div>

                            <div>
                              <span>Өмнөх жил (2023/12)</span>
                              <span className="kpi-old-value">
                                {index === 0
                                  ? "₮ 2,190.4M"
                                  : index === 1
                                    ? "₮ 219.0M"
                                    : index === 2
                                      ? "2,648"
                                      : "₮ 504.2M"}
                              </span>
                              <b>▲ {index === 2 ? "24.0%" : index === 3 ? "41.3%" : "30.0%"}</b>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="dashboard-bottom-row">
                      <div className="dark-chart-card">
                        <div className="dark-chart-heading">
                          <strong>{homeContent.hero.barChartTitle}</strong>

                          <div>
                            <span className="legend-sales">● Борлуулалт</span>
                            <span className="legend-tax">● НӨАТ</span>
                          </div>
                        </div>

                        <div className="dark-bars">
                          {[45, 38, 52, 61, 55, 68, 48, 72, 66, 77, 73, 88].map(
                            (height, index) => (
                              <div className="dark-bar-group" key={index}>
                                <span
                                  className="sales-bar"
                                  style={{ height: `${height}%` }}
                                />
                                <span
                                  className="tax-bar"
                                  style={{
                                    height: `${Math.max(6, height * 0.12)}%`,
                                  }}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="dark-donut-card">
                        <div className="dark-donut">
                          <div>
                            <strong>36%</strong>
                            <span>Электроникс</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <input
                className="compare-range"
                type="range"
                min="0"
                max="100"
                value={comparePosition}
                onChange={(event) =>
                  setComparePosition(Number(event.target.value))
                }
                onWheel={(event) => {
                  const dashboard = event.currentTarget.parentElement?.querySelector(
                    ".dataview-dashboard"
                  );

                  if (dashboard) {
                    dashboard.scrollTop += event.deltaY;
                  }
                }}
                aria-label="Excel болон DataView харьцуулах"
              />

              <div className="compare-divider">
                <button type="button" tabIndex="-1">
                  ↔
                </button>
              </div>
            </div>

            <div className="compare-hint">
              {homeContent.hero.compareHint}
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.problem.kicker}
              </span>

              <h2>{homeContent.problem.title}</h2>
            </div>

            <div className="problem-grid">
              {homeContent.problem.items.map((item, index) => (
                <div className="problem-card" key={index}>
                  <div className="problem-icon">
                    {item.icon}
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section templates-section"
          id="templates"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.templates.kicker}
              </span>

              <h2>{homeContent.templates.title}</h2>
            </div>

            <div className="template-grid">
              {homeContent.templates.items.map(
                (item, index) => (
                  <div
                    key={index}
                    className={`template-card ${
                      item.className || ""
                    }`}
                  >
                    <div className="template-visual">
                      <div className="template-icon">
                        {item.icon}
                      </div>
                    </div>

                    <div className="template-body">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>

                      <button type="button">
                        {homeContent.templates.detailButton}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            <p className="templates-note">
              {homeContent.templates.note}
            </p>
          </div>
        </section>

        <section
          className="section section-soft"
          id="why-dataview"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.benefits.kicker}
              </span>

              <h2>{homeContent.benefits.title}</h2>
            </div>

            <div className="benefits-grid">
              {homeContent.benefits.items.map(
                (item, index) => (
                  <div
                    className="benefit-card"
                    key={index}
                  >
                    <div className="benefit-icon">
                      {item.icon}
                    </div>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="section steps-section">
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.steps.kicker}
              </span>

              <h2>{homeContent.steps.title}</h2>
            </div>

            <div className="steps-grid">
              {homeContent.steps.items.map(
                (item, index) => (
                  <Fragment key={index}>
                    <div className="step-item">
                      <div className="step-number">
                        {item.number}
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    {index <
                      homeContent.steps.items.length - 1 && (
                      <div className="step-line" />
                    )}
                  </Fragment>
                )
              )}
            </div>

            <p className="steps-note">
              {homeContent.steps.note}
            </p>
          </div>
        </section>

        <section
          className="section testimonials-section"
          id="testimonials"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.testimonials.kicker}
              </span>

              <h2>{homeContent.testimonials.title}</h2>
            </div>

            <div className="testimonial-grid">
              {homeContent.testimonials.items.map(
                (item, index) => (
                  <div
                    className="testimonial-card"
                    key={index}
                  >
                    <div className="quote-mark">”</div>

                    <p>{item.text}</p>

                    <div className="testimonial-person">
                      <div className="testimonial-avatar">
                        {item.initials}
                      </div>

                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.position}</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="landing-container faq-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.faq.kicker}
              </span>

              <h2>{homeContent.faq.title}</h2>
            </div>

            <div className="faq-list">
              {homeContent.faq.items.map(
                (item, index) => (
                  <details
                    key={index}
                    className="faq-item"
                  >
                    <summary>
                      {item.question}
                      <span>⌄</span>
                    </summary>

                    <p>{item.answer}</p>
                  </details>
                )
              )}
            </div>
          </div>
        </section>

        <section
          className="section contact-section"
          id="contact"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.contact.kicker}
              </span>

              <h2>{homeContent.contact.title}</h2>
              <p>{homeContent.contact.description}</p>
            </div>

            <div className="contact-layout">
              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <label>
                    Нэр
                    <input
                      type="text"
                      name="name"
                      placeholder="Бат-Эрдэнэ"
                      required
                    />
                  </label>

                  <label>
                    Компани
                    <input
                      type="text"
                      name="company"
                      placeholder="ХХК нэр"
                      required
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Утас
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+976 9900 0000"
                      required
                    />
                  </label>

                  <label>
                    Имэйл
                    <input
                      type="email"
                      name="email"
                      placeholder="email@company.mn"
                      required
                    />
                  </label>
                </div>

                <label>
                  Ашигладаг систем

                  <select
                    name="system"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Сонгох...
                    </option>

                    <option value="Excel">Excel</option>
                    <option value="Oracle">Oracle</option>
                    <option value="1C">1C</option>
                    <option value="PostgreSQL">
                      PostgreSQL
                    </option>
                    <option value="MS SQL">MS SQL</option>
                  </select>
                </label>

                <div className="interest-label">
                  Сонирхсон загвар
                </div>

                <div className="interest-buttons">
                  {templateOptions.map((template) => {
                    const selected =
                      template === "Бүгд"
                        ? isAllSelected
                        : selectedTemplates.includes(
                            template
                          );

                    return (
                      <button
                        key={template}
                        type="button"
                        className={
                          selected ? "selected" : ""
                        }
                        onClick={() =>
                          toggleTemplate(template)
                        }
                        aria-pressed={selected}
                      >
                        {selected && (
                          <span className="interest-check">
                            ✓
                          </span>
                        )}

                        <span>{template}</span>
                      </button>
                    );
                  })}
                </div>

                {requestMessage && (
                  <div
                    className={
                      requestSuccess
                        ? "contact-message success"
                        : "contact-message error"
                    }
                  >
                    {requestMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={sendingRequest}
                >
                  {sendingRequest
                    ? "Илгээж байна..."
                    : homeContent.contact.submitButton}
                </button>
              </form>

              <div className="contact-info">
                <div className="contact-info-row">
                  <div className="contact-info-icon">
                    ☎
                  </div>

                  <div>
                    <span>Утас</span>
                    <strong>
                      {homeContent.contact.phone}
                    </strong>
                  </div>
                </div>

                <div className="contact-info-row">
                  <div className="contact-info-icon">
                    ✉
                  </div>

                  <div>
                    <span>Имэйл</span>
                    <strong>
                      {homeContent.contact.email}
                    </strong>
                  </div>
                </div>

                <div className="contact-info-row">
                  <div className="contact-info-icon">
                    📍
                  </div>

                  <div>
                    <span>Хаяг</span>
                    <strong>
                      {homeContent.contact.address}
                    </strong>
                  </div>
                </div>

                <div className="contact-socials">
                  <button type="button">in</button>
                  <button type="button">f</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;