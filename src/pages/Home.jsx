import {
  Fragment,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Home.css";


/* =========================================================
   DEFAULT CONTENT
========================================================= */

const defaultHomeContent = {
  hero: {
    title:
      "ТАНАЙ БИЗНЕСИЙН ТОО —\nНЭГ ДАШБОАРД ДЭЭР,\nМОНГОЛООР",

    description:
      "Excel тайланг хүлээхээ больё. Бэлэн загвар, бид холбож өгнө, 2–3 долоо хоногт бэлэн.",

    primaryButton:
      "Холбогдох",

    secondaryButton:
      "Загварууд үзэх",

    note:
      "Кредит карт шаардлагагүй · 14 хоног үнэгүй",

    badge:
      "Бодит цаг ⚡",

    previewTitle:
      "DataView — Санхүүгийн самбар",

    previewTime:
      "Excel → Самбар: 3 минут",

    previewKpis: [
      {
        label: "Орлого",
        value: "₮74.8M",
        className: "",
      },
      {
        label: "Ашиг",
        value: "₮24.2M",
        className: "blue-number",
      },
      {
        label: "Харилцагч",
        value: "4,821",
        className: "",
      },
      {
        label: "Өссөн",
        value: "+12.4%",
        className: "orange-number",
      },
    ],

    barChartTitle:
      "Сарын орлого",

    lineChartTitle:
      "Ашгийн чиг",
  },


  problem: {
    kicker:
      "АСУУДАЛ",

    title:
      "Та одоо хэрхэн шийдвэр гаргаж байна вэ?",

    items: [
      {
        icon: "◷",

        title:
          "Нягтлангийн Excel-ийг хүлээнэ",

        description:
          "Сар бүрийн тайлан 2 долоо хоног хоцорч ирнэ",
      },

      {
        icon: "✎",

        title:
          "Гар ажил, алдаатай",

        description:
          "Pivot table, copy-paste, зөрүү тоо",
      },

      {
        icon: "⚡",

        title:
          "Бодит цагийн мэдээлэл байхгүй",

        description:
          "Өнөөдрийн борлуулалт, мөнгөн үлдэгдэл хэд вэ? — Хэн ч хариулж чадахгүй",
      },
    ],
  },


  templates: {
    kicker:
      "ШИЙДЭЛ",

    title:
      "Туршигдсан 5 загвар — тэг-ээс эхлэх шаардлагагүй",

    note:
      "Загвар бүр бүрэн монгол хэлээр, утас компьютер хоёуланд нь",

    detailButton:
      "Дэлгэрэнгүй →",

    items: [
      {
        icon: "🏢",

        title:
          "Захирлын тойм (CEO)",

        description:
          "Компанийн гол үзүүлэлт, орлого, ашиг, зардал нэг хараанд",

        className:
          "template-cyan",
      },

      {
        icon: "💰",

        title:
          "Санхүү (Financial)",

        description:
          "Ашиг орлогын тайлан, мөнгөн урсгал, зардлын задаргаа",

        className:
          "template-blue",
      },

      {
        icon: "📈",

        title:
          "Борлуулалт (Sales)",

        description:
          "Борлуулалтын дүн, бүтээгдэхүүн, менежерийн ажлын үр дүн",

        className:
          "template-orange",
      },

      {
        icon: "🧾",

        title:
          "Авлага, Өглөг (AR/AP)",

        description:
          "Авлагын хууль, үлдэгдэл, харилцагчийн тооцооны байдал",

        className:
          "template-purple",
      },

      {
        icon: "📦",

        title:
          "Бараа материал (Inventory)",

        description:
          "Нөөцийн үлдэгдэл, эргэлт, дутагдал, илүүдэл дохиолол",

        className:
          "template-green",
      },
    ],
  },


  benefits: {
    kicker:
      "ЯАГААД DATAVIEW?",

    title:
      "Бусдаас юугаараа ялгаатай вэ",

    items: [
      {
        icon: "🌐",

        title:
          "Бүрэн монгол хэлээр",

        description:
          "Тайлан, дашбоард, дэмжлэг — бүгд монголоор",
      },

      {
        icon: "▱",

        title:
          "Бэлэн 5 загвар",

        description:
          "Тэг-ээс эхлэх биш, туршигдсан загвараас сонгоно",
      },

      {
        icon: "♙",

        title:
          "Бид өөрсдөө холбож өгнө",

        description:
          "IT мэдлэг, аналитикч шаардлагагүй",
      },

      {
        icon: "⚡",

        title:
          "2–3 долоо хоногт бэлэн",

        description:
          "Олон сарын төсөл биш",
      },

      {
        icon: "▤",

        title:
          "Ямар ч эх үүсвэрээс",

        description:
          "Oracle, Excel, 1C — ямар системтэй ч ажиллана",
      },

      {
        icon: "$",

        title:
          "ЖДБ-ийн төсөвт багтана",

        description:
          "BI лиценз, аналитикч авахгүйгээр",
      },
    ],
  },


  steps: {
    kicker:
      "ХЭРХЭН АЖИЛЛАДАГ",

    title:
      "3 энгийн алхам",

    note:
      "Танай талаас зөвхөн эрх өгөх л хангалттай",

    items: [
      {
        number: "①",

        title:
          "Холбогдоно",

        description:
          "Маягт бөглөх эсвэл утасдах — 1 минут",
      },

      {
        number: "②",

        title:
          "Бид датаг тань холбоно",

        description:
          "Манай баг танай системд холбогдож, дата цэвэрлэнэ — 2–3 долоо хоног",
      },

      {
        number: "③",

        title:
          "Дашбоардаa үзнэ",

        description:
          "Өөрийн хаягаас нэвтэрч, бүх тоогоо харна",
      },
    ],
  },


  pricing: {
    kicker:
      "ҮНЭ",

    title:
      "Энгийн, ил тод үнэ",

    note:
      "Суурилуулалтын нэг удаагийн хөлс тусдаа — эх үүсвэрийн төрлөөс хамаарна",

    recommendedText:
      "Санал болгож буй",

    contactButton:
      "Холбогдох",

    quoteButton:
      "Үнийн санал авах →",

    plans: [
      {
        name:
          "Starter",

        price:
          "₮200,000",

        period:
          "/сар",

        recommended:
          false,

        features: [
          "2 дашбоард (CEO + Санхүү)",
          "1 эх үүсвэр",
          "3 хэрэглэгч хүртэл",
          "Өдөрт 1 удаа шинэчлэлт",
          "И-мэйл дэмжлэг",
        ],
      },

      {
        name:
          "Professional",

        price:
          "₮400,000",

        period:
          "/сар",

        recommended:
          true,

        features: [
          "5 дашбоард бүгд",
          "Олон эх үүсвэр",
          "10 хэрэглэгч хүртэл",
          "4 цаг тутам шинэчлэлт",
          "И-мэйл + чат дэмжлэг",
        ],
      },

      {
        name:
          "Enterprise",

        price:
          "₮800,000+",

        period:
          "/сар",

        recommended:
          false,

        features: [
          "Хязгааргүй дашбоард + custom",
          "Бүх эх үүсвэр + API",
          "Хязгааргүй хэрэглэгч",
          "Бодит цагийн шинэчлэлт",
          "Тусгай менежер",
        ],
      },
    ],
  },


  testimonials: {
    kicker:
      "ТУРШЛАГА",

    title:
      "Харилцагчдын сэтгэгдэл",

    items: [
      {
        text:
          "Сар бүр Excel тайлан хийхэд 3 хоног зарцуулдаг байсан. Одоо захирал утаснаасаа шууд харна. Бидний санхүүгийн хяналт бодитоор сайжирсан.",

        initials:
          "БЭ",

        name:
          "Б. Энхтуяа",

        position:
          "ГТЗ, Алтан Говь ХХК",
      },

      {
        text:
          "Манай борлуулалт, авлага, нөөцийг нэг дэлгэцнээс харах боломжтой болсноор шийдвэр гаргах хурд маш эрс нэмэгдсэн. DataView-г бүх ЖДБ-д зөвлөе.",

        initials:
          "ГС",

        name:
          "Г. Солонго",

        position:
          "Гүйцэтгэх захирал, Эрдэнэт Фуд",
      },
    ],
  },


  faq: {
    kicker:
      "ТҮГЭЭМЭЛ АСУУЛТ",

    title:
      "Асуулт хариулт",

    items: [
      {
        question:
          "Ямар системтэй ажилладаг вэ?",

        answer:
          "Oracle, Excel, 1C болон бусад PostgreSQL, MS SQL суурьтай системүүдтэй.",
      },

      {
        question:
          "Хэр хурдан бэлэн болох вэ?",

        answer:
          "Ихэвчлэн 2–3 долоо хоногийн дотор эхний хувилбарыг бэлэн болгоно.",
      },

      {
        question:
          "Манай IT баг юу хийх хэрэгтэй вэ?",

        answer:
          "Зөвхөн шаардлагатай өгөгдлийн эх үүсвэрийн хандалт өгөхөд хангалттай.",
      },

      {
        question:
          "Дата аюулгүй байдал хэрхэн хангагддаг вэ?",

        answer:
          "Хандалтын эрх, хамгаалалттай холболт болон байгууллагын шаардлагад нийцүүлэн тохируулна.",
      },

      {
        question:
          "Загвараа өөрчилж болох уу?",

        answer:
          "Тийм. KPI, өнгө, хүснэгт, график болон бүтэц бүрийг өөрчилж болно.",
      },

      {
        question:
          "Гэрээгээ цуцалж болох уу?",

        answer:
          "Тийм. Гэрээний нөхцөлийн дагуу үйлчилгээг цуцлах боломжтой.",
      },
    ],
  },


  contact: {
    kicker:
      "ХОЛБОО БАРИХ",

    title:
      "Бидэнтэй холбогдох",

    description:
      "Маягт бөглөөд илгээнэ үү, бид 1 ажлын өдрийн дотор хариу өгнө",

    phone:
      "+976 7700 0000",

    email:
      "hello@dataview.mn",

    address:
      "Улаанбаатар, Хан-Уул дүүрэг",

    submitButton:
      "Илгээх →",
  },
};


/* =========================================================
   MERGE HOME CONTENT
========================================================= */

function mergeHomeContent(data) {
  if (!data) {
    return defaultHomeContent;
  }


  return {
    ...defaultHomeContent,
    ...data,

    hero: {
      ...defaultHomeContent.hero,
      ...(data.hero || {}),

      previewKpis:
        data.hero?.previewKpis ||
        defaultHomeContent.hero.previewKpis,
    },

    problem: {
      ...defaultHomeContent.problem,
      ...(data.problem || {}),

      items:
        data.problem?.items ||
        defaultHomeContent.problem.items,
    },

    templates: {
      ...defaultHomeContent.templates,
      ...(data.templates || {}),

      items:
        data.templates?.items ||
        defaultHomeContent.templates.items,
    },

    benefits: {
      ...defaultHomeContent.benefits,
      ...(data.benefits || {}),

      items:
        data.benefits?.items ||
        defaultHomeContent.benefits.items,
    },

    steps: {
      ...defaultHomeContent.steps,
      ...(data.steps || {}),

      items:
        data.steps?.items ||
        defaultHomeContent.steps.items,
    },

    pricing: {
      ...defaultHomeContent.pricing,
      ...(data.pricing || {}),

      plans:
        data.pricing?.plans ||
        defaultHomeContent.pricing.plans,
    },

    testimonials: {
      ...defaultHomeContent.testimonials,
      ...(data.testimonials || {}),

      items:
        data.testimonials?.items ||
        defaultHomeContent.testimonials.items,
    },

    faq: {
      ...defaultHomeContent.faq,
      ...(data.faq || {}),

      items:
        data.faq?.items ||
        defaultHomeContent.faq.items,
    },

    contact: {
      ...defaultHomeContent.contact,
      ...(data.contact || {}),
    },
  };
}


/* =========================================================
   HOME
========================================================= */

function Home() {
  const navigate = useNavigate();
  const [
    homeContent,
    setHomeContent,
  ] = useState(defaultHomeContent);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    selectedTemplates,
    setSelectedTemplates,
  ] = useState([]);


  const [
    sendingRequest,
    setSendingRequest,
  ] = useState(false);


  const [
    requestMessage,
    setRequestMessage,
  ] = useState("");


  const [
    requestSuccess,
    setRequestSuccess,
  ] = useState(false);


  const templateOptions = [
    "CEO",
    "Санхүү",
    "Борлуулалт",
    "Авлага,Өглөг",
    "Нөөц",
    "Бүгд",
  ];


  /* =====================================================
     LOAD HOME CONTENT
  ===================================================== */

  useEffect(() => {
    const loadHomeContent =
      async () => {

        try {
          const response =
            await fetch(
              "http://localhost:5000/api/home"
            );


          if (!response.ok) {
            throw new Error(
              `Home API returned ${response.status}`
            );
          }


          const result =
            await response.json();


          if (result.data) {
            setHomeContent(
              mergeHomeContent(
                result.data
              )
            );
          } else {
            setHomeContent(
              defaultHomeContent
            );
          }

        } catch (error) {
          console.error(
            "Failed to load home content:",
            error
          );


          setHomeContent(
            defaultHomeContent
          );

        } finally {
          setLoading(false);
        }

      };


    loadHomeContent();

  }, []);

  useEffect(() => {
  if (!requestMessage) {
    return;
  }

  const timer = setTimeout(() => {
    setRequestMessage("");
    setRequestSuccess(false);
  }, 5000);

  return () => {
    clearTimeout(timer);
  };
}, [requestMessage]);


  /* =====================================================
     TEMPLATE SELECTOR
  ===================================================== */

  const toggleTemplate = (
    template
  ) => {

    if (
      template === "Бүгд"
    ) {

      const individualTemplates =
        templateOptions.filter(
          (item) =>
            item !== "Бүгд"
        );


      if (
        selectedTemplates.length ===
        individualTemplates.length
      ) {

        setSelectedTemplates([]);

      } else {

        setSelectedTemplates(
          individualTemplates
        );

      }


      return;
    }


    setSelectedTemplates(
      (current) => {

        if (
          current.includes(
            template
          )
        ) {

          return current.filter(
            (item) =>
              item !== template
          );

        }


        return [
          ...current,
          template,
        ];

      }
    );
  };


  const isAllSelected =
    selectedTemplates.length ===
    templateOptions.length - 1;


  /* =====================================================
     CONTACT FORM
  ===================================================== */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      /*
        IMPORTANT:
        Save the form before await.
      */

      const formElement =
        event.currentTarget;


      try {

        setSendingRequest(true);

        setRequestMessage("");

        setRequestSuccess(false);


        const formData =
          new FormData(
            formElement
          );


        const name =
          formData
            .get("name")
            ?.trim();


        const company =
          formData
            .get("company")
            ?.trim();


        const phone =
          formData
            .get("phone")
            ?.trim();


        const email =
          formData
            .get("email")
            ?.trim();


        const systemType =
          formData.get(
            "system"
          );


        if (
          !name ||
          !company ||
          !phone ||
          !email
        ) {

          throw new Error(
            "Нэр, компани, утас, имэйлээ бүрэн оруулна уу."
          );

        }


        const payload = {
          name,
          company,
          phone,
          email,

          system_type:
            systemType ||
            null,

          models:
            selectedTemplates,
        };


        console.log(
          "Sending request:",
          payload
        );


        const response =
          await fetch(
            "http://localhost:5000/api/requests",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload
                ),
            }
          );


        let result;


        try {

          result =
            await response.json();

        } catch {

          throw new Error(
            `Backend JSON буцаасангүй. HTTP ${response.status}`
          );

        }


        if (!response.ok) {

          throw new Error(
            result.message ||
              `HTTP ${response.status}`
          );

        }


        setRequestSuccess(
          true
        );


        setRequestMessage(
          result.message ||
            "Хүсэлт амжилттай илгээгдлээ."
        );


        /*
          FIX:
          Do NOT use event.currentTarget.reset()
          here.
        */

        formElement.reset();


        setSelectedTemplates(
          []
        );


      } catch (error) {

        console.error(
          "Contact request error:",
          error
        );


        setRequestSuccess(
          false
        );


        setRequestMessage(
          error.message ||
            "Хүсэлт илгээхэд алдаа гарлаа."
        );


      } finally {

        setSendingRequest(
          false
        );

      }
    };


  /* =====================================================
     SCROLL
  ===================================================== */

  const scrollTo = (
    id
  ) => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior:
          "smooth",
      });

  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="home-page">

        <Navbar />


        <div
          style={{
            minHeight:
              "70vh",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >
          Loading...
        </div>


        <Footer />

      </div>
    );
  }


  return (
    <div className="home-page">

      <Navbar />


      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="landing-hero">

          <div className="landing-container hero-grid">

            <div className="hero-copy">

              <h1
                style={{
                  whiteSpace:
                    "pre-line",
                }}
              >
                {
                  homeContent.hero.title
                }
              </h1>


              <p>
                {
                  homeContent.hero
                    .description
                }
              </p>


              <div className="hero-buttons">

                <button
                  type="button"
                  className="primary-action"
                  onClick={() =>
                    scrollTo(
                      "contact"
                    )
                  }
                >
                  {
                    homeContent.hero
                      .primaryButton
                  }
                </button>


                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => navigate("/dashboard")}
                >
                  {homeContent.hero.secondaryButton}
                </button>

              </div>


              <div className="hero-note">
                {
                  homeContent.hero.note
                }
              </div>

            </div>


            {/* HERO PREVIEW */}

            <div className="hero-preview-wrap">

              <div className="preview-badge">
                {
                  homeContent.hero.badge
                }
              </div>


              <div className="hero-preview">

                <div className="preview-topbar">

                  <div className="preview-dots">

                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />

                  </div>


                  <span>
                    {
                      homeContent.hero
                        .previewTitle
                    }
                  </span>

                </div>


                <div className="preview-body">

                  <div className="preview-sidebar">
                    <span>🏢</span>
                    <span>💰</span>
                    <span>📈</span>
                    <span>🧾</span>
                    <span>📦</span>
                  </div>


                  <div className="preview-content">

                    <div className="preview-kpis">

                      {
                        homeContent.hero
                          .previewKpis
                          .map(
                            (
                              item,
                              index
                            ) => (

                              <div
                                key={
                                  index
                                }
                              >

                                <small>
                                  {
                                    item.label
                                  }
                                </small>


                                <strong
                                  className={
                                    item.className ||
                                    ""
                                  }
                                >
                                  {
                                    item.value
                                  }
                                </strong>

                              </div>

                            )
                          )
                      }

                    </div>


                    <div className="preview-charts">

                      <div className="preview-chart-box">

                        <small>
                          {
                            homeContent.hero
                              .barChartTitle
                          }
                        </small>


                        <div className="mini-bars">
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>

                      </div>


                      <div className="preview-chart-box">

                        <small>
                          {
                            homeContent.hero
                              .lineChartTitle
                          }
                        </small>


                        <svg
                          viewBox="0 0 220 80"
                          className="mini-line-chart"
                        >
                          <polyline
                            points="
                              0,58
                              32,40
                              62,48
                              95,28
                              130,35
                              160,18
                              190,23
                              220,10
                            "
                            fill="none"
                            stroke="#26cbbd"
                            strokeWidth="3"
                          />
                        </svg>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              <div className="preview-time">

                <span>
                  ●
                </span>

                {" "}

                {
                  homeContent.hero
                    .previewTime
                }

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            PROBLEM
        ================================================= */}

        <section className="section section-soft">

          <div className="landing-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent.problem
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent.problem
                    .title
                }
              </h2>

            </div>


            <div className="problem-grid">

              {
                homeContent.problem
                  .items
                  .map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        className="problem-card"
                        key={index}
                      >

                        <div className="problem-icon">
                          {
                            item.icon
                          }
                        </div>


                        <h3>
                          {
                            item.title
                          }
                        </h3>


                        <p>
                          {
                            item.description
                          }
                        </p>

                      </div>

                    )
                  )
              }

            </div>

          </div>

        </section>


        {/* =================================================
            TEMPLATES
        ================================================= */}

        <section
          className="section templates-section"
          id="templates"
        >

          <div className="landing-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent.templates
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent.templates
                    .title
                }
              </h2>

            </div>


            <div className="template-grid">

              {
                homeContent.templates
                  .items
                  .map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className={
                          `template-card ${
                            item.className ||
                            ""
                          }`
                        }
                      >

                        <div className="template-visual">

                          <div className="template-icon">
                            {
                              item.icon
                            }
                          </div>

                        </div>


                        <div className="template-body">

                          <h3>
                            {
                              item.title
                            }
                          </h3>


                          <p>
                            {
                              item.description
                            }
                          </p>


                          <button
                            type="button"
                          >
                            {
                              homeContent
                                .templates
                                .detailButton
                            }
                          </button>

                        </div>

                      </div>

                    )
                  )
              }

            </div>


            <p className="templates-note">
              {
                homeContent.templates
                  .note
              }
            </p>

          </div>

        </section>


        {/* =================================================
            BENEFITS
        ================================================= */}

        <section
          className="section section-soft"
          id="why-dataview"
        >

          <div className="landing-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent.benefits
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent.benefits
                    .title
                }
              </h2>

            </div>


            <div className="benefits-grid">

              {
                homeContent.benefits
                  .items
                  .map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        className="benefit-card"
                        key={index}
                      >

                        <div className="benefit-icon">
                          {
                            item.icon
                          }
                        </div>


                        <div>

                          <h3>
                            {
                              item.title
                            }
                          </h3>


                          <p>
                            {
                              item.description
                            }
                          </p>

                        </div>

                      </div>

                    )
                  )
              }

            </div>

          </div>

        </section>


        {/* =================================================
            STEPS
        ================================================= */}

        <section className="section steps-section">

          <div className="landing-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent.steps
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent.steps
                    .title
                }
              </h2>

            </div>


            <div className="steps-grid">

              {
                homeContent.steps
                  .items
                  .map(
                    (
                      item,
                      index
                    ) => (

                      <Fragment
                        key={index}
                      >

                        <div className="step-item">

                          <div className="step-number">
                            {
                              item.number
                            }
                          </div>


                          <h3>
                            {
                              item.title
                            }
                          </h3>


                          <p>
                            {
                              item.description
                            }
                          </p>

                        </div>


                        {
                          index <
                            homeContent.steps
                              .items
                              .length -
                              1 && (

                            <div className="step-line" />

                          )
                        }

                      </Fragment>

                    )
                  )
              }

            </div>


            <p className="steps-note">
              {
                homeContent.steps
                  .note
              }
            </p>

          </div>

        </section>


        {/* =================================================
            PRICING
        ================================================= */}

        {/*

        <section
          className="section section-soft"
          id="pricing"
        >

          <div className="landing-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent.pricing
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent.pricing
                    .title
                }
              </h2>

            </div>


            <div className="pricing-grid">

              {
                homeContent.pricing
                  .plans
                  .map(
                    (
                      plan,
                      index
                    ) => (

                      <div
                        key={index}
                        className={
                          plan.recommended
                            ? "pricing-card featured-plan"
                            : "pricing-card"
                        }
                      >

                        {
                          plan.recommended && (

                            <div className="recommended">
                              {
                                homeContent
                                  .pricing
                                  .recommendedText
                              }
                            </div>

                          )
                        }


                        <span className="plan-name">
                          {
                            plan.name
                          }
                        </span>


                        <div className="plan-price">

                          {
                            plan.price
                          }


                          <small>
                            {
                              plan.period
                            }
                          </small>

                        </div>


                        <ul>

                          {
                            plan.features
                              .map(
                                (
                                  feature,
                                  featureIndex
                                ) => (

                                  <li
                                    key={
                                      featureIndex
                                    }
                                  >
                                    ✓{" "}
                                    {
                                      feature
                                    }
                                  </li>

                                )
                              )
                          }

                        </ul>


                        <button
                          type="button"
                          className={
                            plan.recommended
                              ? "filled-plan-button"
                              : "outline-plan-button"
                          }
                          onClick={() =>
                            scrollTo(
                              "contact"
                            )
                          }
                        >
                          {
                            homeContent
                              .pricing
                              .contactButton
                          }
                        </button>

                      </div>

                    )
                  )
              }

            </div>


            <p className="pricing-note">
              {
                homeContent.pricing
                  .note
              }
            </p>


            <button
              type="button"
              className="pricing-link"
              onClick={() =>
                scrollTo(
                  "contact"
                )
              }
            >
              {
                homeContent.pricing
                  .quoteButton
              }
            </button>

          </div>

        </section>


        */}

        {/* =================================================
            TESTIMONIALS
        ================================================= */}

        <section
          className="section testimonials-section"
          id="testimonials"
        >

          <div className="landing-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent
                    .testimonials
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent
                    .testimonials
                    .title
                }
              </h2>

            </div>


            <div className="testimonial-grid">

              {
                homeContent
                  .testimonials
                  .items
                  .map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        className="testimonial-card"
                        key={index}
                      >

                        <div className="quote-mark">
                          ”
                        </div>


                        <p>
                          {
                            item.text
                          }
                        </p>


                        <div className="testimonial-person">

                          <div className="testimonial-avatar">
                            {
                              item.initials
                            }
                          </div>


                          <div>

                            <strong>
                              {
                                item.name
                              }
                            </strong>


                            <span>
                              {
                                item.position
                              }
                            </span>

                          </div>

                        </div>

                      </div>

                    )
                  )
              }

            </div>

          </div>

        </section>


        {/* =================================================
            FAQ
        ================================================= */}

        <section className="section section-soft">

          <div className="landing-container faq-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent.faq
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent.faq
                    .title
                }
              </h2>

            </div>


            <div className="faq-list">

              {
                homeContent.faq
                  .items
                  .map(
                    (
                      item,
                      index
                    ) => (

                      <details
                        key={index}
                        className="faq-item"
                      >

                        <summary>

                          {
                            item.question
                          }

                          <span>
                            ⌄
                          </span>

                        </summary>


                        <p>
                          {
                            item.answer
                          }
                        </p>

                      </details>

                    )
                  )
              }

            </div>

          </div>

        </section>


        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          className="section contact-section"
          id="contact"
        >

          <div className="landing-container">

            <div className="section-heading">

              <span className="section-kicker">
                {
                  homeContent.contact
                    .kicker
                }
              </span>


              <h2>
                {
                  homeContent.contact
                    .title
                }
              </h2>


              <p>
                {
                  homeContent.contact
                    .description
                }
              </p>

            </div>


            <div className="contact-layout">

              {/* CONTACT FORM */}

              <form
                className="contact-form"
                onSubmit={
                  handleSubmit
                }
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

                    <option
                      value=""
                      disabled
                    >
                      Сонгох...
                    </option>


                    <option value="Excel">
                      Excel
                    </option>

                    <option value="Oracle">
                      Oracle
                    </option>


                    <option value="1C">
                      1C
                    </option>


                    <option value="PostgreSQL">
                      PostgreSQL
                    </option>


                    <option value="MS SQL">
                      MS SQL
                    </option>

                  </select>

                </label>


                {/* TEMPLATE SELECTOR */}

                <div className="interest-label">
                  Сонирхсон загвар
                </div>


                <div className="interest-buttons">

                  {
                    templateOptions.map(
                      (
                        template
                      ) => {

                        const selected =
                          template ===
                          "Бүгд"
                            ? isAllSelected
                            : selectedTemplates.includes(
                                template
                              );


                        return (

                          <button
                            key={
                              template
                            }
                            type="button"
                            className={
                              selected
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              toggleTemplate(
                                template
                              )
                            }
                            aria-pressed={
                              selected
                            }
                          >

                            {
                              selected && (

                                <span className="interest-check">
                                  ✓
                                </span>

                              )
                            }


                            <span>
                              {
                                template
                              }
                            </span>

                          </button>

                        );

                      }
                    )
                  }

                </div>


                {/* REQUEST MESSAGE */}

                {
                  requestMessage && (

                    <div
                      className={
                        requestSuccess
                          ? "contact-message success"
                          : "contact-message error"
                      }
                    >
                      {
                        requestMessage
                      }
                    </div>

                  )
                }


                <button
                  type="submit"
                  className="submit-button"
                  disabled={
                    sendingRequest
                  }
                >
                  {
                    sendingRequest
                      ? "Илгээж байна..."
                      : homeContent
                          .contact
                          .submitButton
                  }
                </button>

              </form>


              {/* CONTACT INFORMATION */}

              <div className="contact-info">

                <div className="contact-info-row">

                  <div className="contact-info-icon">
                    ☎
                  </div>


                  <div>

                    <span>
                      Утас
                    </span>


                    <strong>
                      {
                        homeContent.contact
                          .phone
                      }
                    </strong>

                  </div>

                </div>


                <div className="contact-info-row">

                  <div className="contact-info-icon">
                    ✉
                  </div>


                  <div>

                    <span>
                      Имэйл
                    </span>


                    <strong>
                      {
                        homeContent.contact
                          .email
                      }
                    </strong>

                  </div>

                </div>


                <div className="contact-info-row">

                  <div className="contact-info-icon">
                    📍
                  </div>


                  <div>

                    <span>
                      Хаяг
                    </span>


                    <strong>
                      {
                        homeContent.contact
                          .address
                      }
                    </strong>

                  </div>

                </div>


                <div className="contact-socials">

                  <button
                    type="button"
                  >
                    in
                  </button>


                  <button
                    type="button"
                  >
                    f
                  </button>

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