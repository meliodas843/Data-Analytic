import {
  useEffect,
  useState,
} from "react";


const defaultHomeContent = {

  /* =========================================
     HERO
  ========================================= */

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
    leftImage: "",
    rightImage: "",
  },


  /* =========================================
     PROBLEM
  ========================================= */

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


  /* =========================================
     TEMPLATES
  ========================================= */

  templates: {
    kicker:
      "ШИЙДЭЛ",

    title:
      "Туршигдсан 5 загвар — тэг-ээс эхлэх шаардлагагүй",

    note:
      "Загвар бүр бүрэн монгол хэлээр, утас компьютер хоёуланд нь",

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


  /* =========================================
     BENEFITS
  ========================================= */

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


  /* =========================================
     STEPS
  ========================================= */

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


  /* =========================================
     PRICING
  ========================================= */

  pricing: {
    kicker:
      "ҮНЭ",

    title:
      "Энгийн, ил тод үнэ",

    note:
      "Суурилуулалтын нэг удаагийн хөлс тусдаа — эх үүсвэрийн төрлөөс хамаарна",

    plans: [
      {
        name:
          "Эхлэл",

        price:
          "₮200,000",

        period:
          "/сар",

        recommended:
          false,

        features: [
          "2 хяналтын самбар (Захирлын тойм + Санхүү)",
          "1 эх үүсвэр",
          "3 хэрэглэгч хүртэл",
          "Өдөрт 1 удаа шинэчлэлт",
          "И-мэйл дэмжлэг",
        ],
      },

      {
        name:
          "Мэргэжлийн",

        price:
          "₮400,000",

        period:
          "/сар",

        recommended:
          true,

        features: [
          "Бүх 5 хяналтын самбар",
          "Олон эх үүсвэр",
          "10 хэрэглэгч хүртэл",
          "4 цаг тутам шинэчлэлт",
          "И-мэйл + чат дэмжлэг",
        ],
      },

      {
        name:
          "Байгууллага",

        price:
          "₮800,000+",

        period:
          "/сар",

        recommended:
          false,

        features: [
          "Хязгааргүй хяналтын самбар + захиалгат тохиргоо",
          "Бүх эх үүсвэр + API",
          "Хязгааргүй хэрэглэгч",
          "Бодит цагийн шинэчлэлт",
          "Тусгай менежер",
        ],
      },
    ],
  },


  /* =========================================
     TESTIMONIALS
  ========================================= */

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


  /* =========================================
     FAQ
  ========================================= */

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


  /* =========================================
     CONTACT
  ========================================= */

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
  },
};



function AdminHome() {

  const [
    content,
    setContent,
  ] = useState(
    defaultHomeContent
  );


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    message,
    setMessage,
  ] = useState("");


  /* =========================================
     LOAD CONTENT
  ========================================= */

  useEffect(() => {

    const loadContent =
      async () => {

        try {

          const response =
            await fetch(
              "http://localhost:5000/api/home"
            );


          const result =
            await response.json();


          if (
            response.ok &&
            result.data
          ) {

            setContent({
              ...defaultHomeContent,
              ...result.data,
              hero: {
                ...defaultHomeContent.hero,
                ...(result.data.hero || {}),
              },
            });

          }

        } catch (error) {

          console.error(
            "Нүүр хуудас ачаалах алдаа:",
            error
          );

        } finally {

          setLoading(false);

        }

      };


    loadContent();

  }, []);


  /* =========================================
     BASIC SECTION CHANGE
  ========================================= */

  const updateSection = (
    section,
    field,
    value
  ) => {

    setContent(
      (current) => ({

        ...current,

        [section]: {

          ...current[section],

          [field]:
            value,

        },

      })
    );

  };


  /* =========================================
     ARRAY ITEM CHANGE
  ========================================= */

  const updateArrayItem = (
    section,
    arrayName,
    index,
    field,
    value
  ) => {

    setContent(
      (current) => {

        const items = [
          ...current[section][arrayName],
        ];


        items[index] = {

          ...items[index],

          [field]:
            value,

        };


        return {

          ...current,

          [section]: {

            ...current[section],

            [arrayName]:
              items,

          },

        };

      }
    );

  };
  /* =========================================
     FEATURE CHANGE
  ========================================= */

  const updatePlanFeature = (
    planIndex,
    featureIndex,
    value
  ) => {

    setContent(
      (current) => {

        const plans = [
          ...current.pricing.plans,
        ];


        const features = [
          ...plans[planIndex].features,
        ];


        features[
          featureIndex
        ] = value;


        plans[
          planIndex
        ] = {

          ...plans[
            planIndex
          ],

          features,

        };


        return {

          ...current,

          pricing: {

            ...current.pricing,

            plans,

          },

        };

      }
    );

  };


  /* =========================================
     SAVE
  ========================================= */

  const saveHome =
    async () => {

      try {

        setSaving(true);

        setMessage("");


        const response =
          await fetch(
            "http://localhost:5000/api/home",
            {

              method:
                "PUT",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body:
                JSON.stringify(
                  content
                ),

            }
          );


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
            "Хадгалахад алдаа гарлаа"
          );

        }


        setMessage(
          "Нүүр хуудас амжилттай хадгалагдлаа."
        );

      } catch (error) {

        console.error(
          error
        );


        setMessage(
          error.message
        );

      } finally {

        setSaving(false);

      }

    };


  if (loading) {

    return (
      <div className="admin-loading">
        Нүүр хуудсыг ачаалж байна...
      </div>
    );

  }


  return (

    <div className="admin-home-page">


      {/* =========================================
          TOP
      ========================================= */}

      <div className="admin-page-heading">

        <div>

          <h2>
            Нүүр хуудас
          </h2>

          <p>
            Нийтийн вэбсайтын бүх мэдээллийг удирдах
          </p>

        </div>


        <button
          type="button"
          className="admin-save-button"
          onClick={
            saveHome
          }
          disabled={
            saving
          }
        >

          {
            saving
              ? "Хадгалж байна..."
              : "Бүх өөрчлөлтийг хадгалах"
          }

        </button>

      </div>


      {
        message && (

          <div className="admin-message">
            {message}
          </div>

        )
      }


      {/* =========================================
          HERO
      ========================================= */}

      <EditorSection
        title="Нүүр хэсэг / Excel vs DataView"
        subtitle="Нүүр хуудасны дээд хэсгийн гарчиг болон харьцуулалтын самбарын мэдээллийг удирдах"
      >
        <Field
          label="Дээд жижиг гарчиг"
          value={content.hero.eyebrow}
          onChange={(value) =>
            updateSection("hero", "eyebrow", value)
          }
        />

        <Field
          label="Үндсэн гарчиг"
          textarea
          value={content.hero.title}
          onChange={(value) =>
            updateSection("hero", "title", value)
          }
        />

        <Field
          label="Тайлбар"
          textarea
          value={content.hero.description}
          onChange={(value) =>
            updateSection("hero", "description", value)
          }
        />

        <div className="admin-form-row">
          <Field
            label="Зүүн талын нэр"
            value={content.hero.beforeLabel}
            onChange={(value) =>
              updateSection("hero", "beforeLabel", value)
            }
          />

          <Field
            label="Баруун талын нэр"
            value={content.hero.afterLabel}
            onChange={(value) =>
              updateSection("hero", "afterLabel", value)
            }
          />
        </div>

        <Field
          label="Харьцуулах заавар"
          value={content.hero.compareHint}
          onChange={(value) =>
            updateSection("hero", "compareHint", value)
          }
        />

        <div className="admin-form-row">
          <Field
            label="Үндсэн товч"
            value={content.hero.primaryButton}
            onChange={(value) =>
              updateSection("hero", "primaryButton", value)
            }
          />

          <Field
            label="Хоёрдогч товч"
            value={content.hero.secondaryButton}
            onChange={(value) =>
              updateSection("hero", "secondaryButton", value)
            }
          />
        </div>

        <div className="admin-array-title">
          Харьцуулалтын зураг
        </div>

        <div className="admin-form-row">
          <ImageField
            label="Зүүн зураг / Excel"
            value={content.hero.leftImage}
            onChange={(value) =>
              updateSection("hero", "leftImage", value)
            }
          />

          <ImageField
            label="Баруун зураг / DataView"
            value={content.hero.rightImage}
            onChange={(value) =>
              updateSection("hero", "rightImage", value)
            }
          />
        </div>

        <Field
          label="Тэмдэглэл"
          value={content.hero.note}
          onChange={(value) =>
            updateSection("hero", "note", value)
          }
        />
      </EditorSection>


      {/* =========================================
          PROBLEMS
      ========================================= */}

      <EditorSection
        title="Асуудлын хэсэг"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.problem.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "problem",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.problem.title
          }
          onChange={
            (value) =>
              updateSection(
                "problem",
                "title",
                value
              )
          }
        />


        {
          content.problem.items.map(
            (
              item,
              index
            ) => (

              <ArrayCard
                key={index}
                title={
                  `Асуудал ${index + 1}`
                }
              >

                <Field
                  label="Дүрс"
                  value={
                    item.icon
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "problem",
                        "items",
                        index,
                        "icon",
                        value
                      )
                  }
                />


                <Field
                  label="Гарчиг"
                  value={
                    item.title
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "problem",
                        "items",
                        index,
                        "title",
                        value
                      )
                  }
                />


                <Field
                  label="Тайлбар"
                  textarea
                  value={
                    item.description
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "problem",
                        "items",
                        index,
                        "description",
                        value
                      )
                  }
                />

              </ArrayCard>

            )
          )
        }

      </EditorSection>


      {/* =========================================
          TEMPLATES
      ========================================= */}

      <EditorSection
        title="Хяналтын самбарын загварууд"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.templates.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "templates",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.templates.title
          }
          onChange={
            (value) =>
              updateSection(
                "templates",
                "title",
                value
              )
          }
        />


        {
          content.templates.items.map(
            (
              item,
              index
            ) => (

              <ArrayCard
                key={index}
                title={
                  `Загвар ${index + 1}`
                }
              >

                <div className="admin-form-row">

                  <Field
                    label="Дүрс"
                    value={
                      item.icon
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "templates",
                          "items",
                          index,
                          "icon",
                          value
                        )
                    }
                  />


                  <Field
                    label="Гарчиг"
                    value={
                      item.title
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "templates",
                          "items",
                          index,
                          "title",
                          value
                        )
                    }
                  />

                </div>


                <Field
                  label="Тайлбар"
                  textarea
                  value={
                    item.description
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "templates",
                        "items",
                        index,
                        "description",
                        value
                      )
                  }
                />

              </ArrayCard>

            )
          )
        }


        <Field
          label="Доод тэмдэглэл"
          value={
            content.templates.note
          }
          onChange={
            (value) =>
              updateSection(
                "templates",
                "note",
                value
              )
          }
        />

      </EditorSection>


      {/* =========================================
          BENEFITS
      ========================================= */}

      <EditorSection
        title="Яагаад DataView?"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.benefits.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "benefits",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.benefits.title
          }
          onChange={
            (value) =>
              updateSection(
                "benefits",
                "title",
                value
              )
          }
        />


        {
          content.benefits.items.map(
            (
              item,
              index
            ) => (

              <ArrayCard
                key={index}
                title={
                  `Давуу тал ${index + 1}`
                }
              >

                <div className="admin-form-row">

                  <Field
                    label="Дүрс"
                    value={
                      item.icon
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "benefits",
                          "items",
                          index,
                          "icon",
                          value
                        )
                    }
                  />


                  <Field
                    label="Гарчиг"
                    value={
                      item.title
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "benefits",
                          "items",
                          index,
                          "title",
                          value
                        )
                    }
                  />

                </div>


                <Field
                  label="Тайлбар"
                  value={
                    item.description
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "benefits",
                        "items",
                        index,
                        "description",
                        value
                      )
                  }
                />

              </ArrayCard>

            )
          )
        }

      </EditorSection>


      {/* =========================================
          STEPS
      ========================================= */}

      <EditorSection
        title="Хэрхэн ажилладаг вэ?"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.steps.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "steps",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.steps.title
          }
          onChange={
            (value) =>
              updateSection(
                "steps",
                "title",
                value
              )
          }
        />


        {
          content.steps.items.map(
            (
              item,
              index
            ) => (

              <ArrayCard
                key={index}
                title={
                  `Алхам ${index + 1}`
                }
              >

                <Field
                  label="Гарчиг"
                  value={
                    item.title
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "steps",
                        "items",
                        index,
                        "title",
                        value
                      )
                  }
                />


                <Field
                  label="Тайлбар"
                  textarea
                  value={
                    item.description
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "steps",
                        "items",
                        index,
                        "description",
                        value
                      )
                  }
                />

              </ArrayCard>

            )
          )
        }


        <Field
          label="Доод тэмдэглэл"
          value={
            content.steps.note
          }
          onChange={
            (value) =>
              updateSection(
                "steps",
                "note",
                value
              )
          }
        />

      </EditorSection>


      {/* =========================================
          PRICING
      ========================================= */}

      <EditorSection
        title="Үнийн мэдээлэл"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.pricing.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "pricing",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.pricing.title
          }
          onChange={
            (value) =>
              updateSection(
                "pricing",
                "title",
                value
              )
          }
        />


        {
          content.pricing.plans.map(
            (
              plan,
              planIndex
            ) => (

              <ArrayCard
                key={planIndex}
                title={
                  `Багц ${planIndex + 1}`
                }
              >

                <div className="admin-form-row">

                  <Field
                    label="Нэр"
                    value={
                      plan.name
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "pricing",
                          "plans",
                          planIndex,
                          "name",
                          value
                        )
                    }
                  />


                  <Field
                    label="Үнэ"
                    value={
                      plan.price
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "pricing",
                          "plans",
                          planIndex,
                          "price",
                          value
                        )
                    }
                  />

                </div>


                {
                  plan.features.map(
                    (
                      feature,
                      featureIndex
                    ) => (

                      <Field
                        key={
                          featureIndex
                        }
                        label={
                          `Боломж ${featureIndex + 1}`
                        }
                        value={
                          feature
                        }
                        onChange={
                          (value) =>
                            updatePlanFeature(
                              planIndex,
                              featureIndex,
                              value
                            )
                        }
                      />

                    )
                  )
                }

              </ArrayCard>

            )
          )
        }


        <Field
          label="Доод тэмдэглэл"
          value={
            content.pricing.note
          }
          onChange={
            (value) =>
              updateSection(
                "pricing",
                "note",
                value
              )
          }
        />

      </EditorSection>


      {/* =========================================
          TESTIMONIALS
      ========================================= */}

      <EditorSection
        title="Харилцагчдын сэтгэгдэл"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.testimonials.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "testimonials",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.testimonials.title
          }
          onChange={
            (value) =>
              updateSection(
                "testimonials",
                "title",
                value
              )
          }
        />


        {
          content.testimonials.items.map(
            (
              item,
              index
            ) => (

              <ArrayCard
                key={index}
                title={
                  `Сэтгэгдэл ${index + 1}`
                }
              >

                <Field
                  label="Сэтгэгдэл"
                  textarea
                  value={
                    item.text
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "testimonials",
                        "items",
                        index,
                        "text",
                        value
                      )
                  }
                />


                <div className="admin-form-row">

                  <Field
                    label="Нэр"
                    value={
                      item.name
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "testimonials",
                          "items",
                          index,
                          "name",
                          value
                        )
                    }
                  />


                  <Field
                    label="Албан тушаал"
                    value={
                      item.position
                    }
                    onChange={
                      (value) =>
                        updateArrayItem(
                          "testimonials",
                          "items",
                          index,
                          "position",
                          value
                        )
                    }
                  />

                </div>

              </ArrayCard>

            )
          )
        }

      </EditorSection>


      {/* =========================================
          FAQ
      ========================================= */}

      <EditorSection
        title="Түгээмэл асуулт"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.faq.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "faq",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.faq.title
          }
          onChange={
            (value) =>
              updateSection(
                "faq",
                "title",
                value
              )
          }
        />


        {
          content.faq.items.map(
            (
              item,
              index
            ) => (

              <ArrayCard
                key={index}
                title={
                  `Асуулт ${index + 1}`
                }
              >

                <Field
                  label="Асуулт"
                  value={
                    item.question
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "faq",
                        "items",
                        index,
                        "question",
                        value
                      )
                  }
                />


                <Field
                  label="Хариулт"
                  textarea
                  value={
                    item.answer
                  }
                  onChange={
                    (value) =>
                      updateArrayItem(
                        "faq",
                        "items",
                        index,
                        "answer",
                        value
                      )
                  }
                />

              </ArrayCard>

            )
          )
        }

      </EditorSection>


      {/* =========================================
          CONTACT
      ========================================= */}

      <EditorSection
        title="Холбоо барих"
      >

        <Field
          label="Хэсгийн нэр"
          value={
            content.contact.kicker
          }
          onChange={
            (value) =>
              updateSection(
                "contact",
                "kicker",
                value
              )
          }
        />


        <Field
          label="Гарчиг"
          value={
            content.contact.title
          }
          onChange={
            (value) =>
              updateSection(
                "contact",
                "title",
                value
              )
          }
        />


        <Field
          label="Тайлбар"
          value={
            content.contact.description
          }
          onChange={
            (value) =>
              updateSection(
                "contact",
                "description",
                value
              )
          }
        />


        <Field
          label="Утас"
          value={
            content.contact.phone
          }
          onChange={
            (value) =>
              updateSection(
                "contact",
                "phone",
                value
              )
          }
        />


        <Field
          label="И-мэйл"
          value={
            content.contact.email
          }
          onChange={
            (value) =>
              updateSection(
                "contact",
                "email",
                value
              )
          }
        />


        <Field
          label="Хаяг"
          value={
            content.contact.address
          }
          onChange={
            (value) =>
              updateSection(
                "contact",
                "address",
                value
              )
          }
        />

      </EditorSection>


      {/* SAVE BOTTOM */}

      <div className="admin-bottom-save">

        <button
          type="button"
          className="admin-save-button"
          onClick={
            saveHome
          }
          disabled={
            saving
          }
        >

          {
            saving
              ? "Хадгалж байна..."
              : "Бүх өөрчлөлтийг хадгалах"
          }

        </button>

      </div>

    </div>

  );

}


/* =========================================
   EDITOR COMPONENT
========================================= */

function EditorSection({
  title,
  subtitle,
  children,
}) {

  return (

    <section className="admin-editor-card admin-home-section">

      <div className="admin-card-heading">

        <h3>
          {title}
        </h3>


        {
          subtitle && (

            <p>
              {subtitle}
            </p>

          )
        }

      </div>


      {children}

    </section>

  );

}


/* =========================================
   ARRAY CARD
========================================= */

function ArrayCard({
  title,
  children,
}) {

  return (

    <div className="admin-array-card">

      <div className="admin-array-title">
        {title}
      </div>


      {children}

    </div>

  );

}


/* =========================================
   FIELD
========================================= */

function ImageField({
  label,
  value,
  onChange,
}) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-form-group">
      <label>{label}</label>

      <div
        style={{
          padding: "14px",
          border: "1px solid #dce4ed",
          borderRadius: "10px",
          background: "#f8fafc",
        }}
      >
        {value ? (
          <div
            style={{
              width: "100%",
              height: "220px",
              marginBottom: "12px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              background: "#ffffff",
            }}
          >
            <img
              src={value}
              alt={label}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "220px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px dashed #cbd5e1",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#8fa2be",
              fontSize: "13px",
            }}
          >
            Зураг сонгоогүй
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            width: "100%",
            padding: "9px",
            border: "1px solid #dce4ed",
            borderRadius: "8px",
            background: "#ffffff",
            color: "#425775",
            fontFamily: "inherit",
            fontSize: "12px",
          }}
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              width: "100%",
              height: "38px",
              marginTop: "10px",
              border: "1px solid #fecdd3",
              borderRadius: "8px",
              background: "#fff1f2",
              color: "#e11d48",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Зураг устгах
          </button>
        )}
      </div>
    </div>
  );
}


function Field({
  label,
  value,
  onChange,
  textarea = false,
}) {

  return (

    <div className="admin-form-group">

      <label>
        {label}
      </label>


      {
        textarea ? (

          <textarea
            value={
              value || ""
            }
            onChange={
              (event) =>
                onChange(
                  event.target.value
                )
            }
            rows="3"
          />

        ) : (

          <input
            type="text"
            value={
              value || ""
            }
            onChange={
              (event) =>
                onChange(
                  event.target.value
                )
            }
          />

        )
      }

    </div>

  );

}


export default AdminHome;