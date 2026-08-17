import {
  useEffect,
  useState,
} from "react";


const defaultHomeContent = {

  /* =========================================
     HERO
  ========================================= */

  hero: {
    title:
      "ТАНАЙ БИЗНЕСИЙН ТОО — НЭГ ДАШБОАРД ДЭЭР, МОНГОЛООР",

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

            setContent(
              result.data
            );

          }

        } catch (error) {

          console.error(
            "Load home error:",
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
            "Save failed"
          );

        }


        setMessage(
          "Home page амжилттай хадгалагдлаа."
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
        Loading Home Page...
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
            Home Page
          </h2>

          <p>
            Public website-ийн бүх мэдээллийг удирдах
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
              ? "Saving..."
              : "Save All Changes"
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
        title="Hero Section"
        subtitle="Homepage-ийн хамгийн дээд хэсэг"
      >

        <Field
          label="Title"
          textarea
          value={
            content.hero.title
          }
          onChange={
            (value) =>
              updateSection(
                "hero",
                "title",
                value
              )
          }
        />


        <Field
          label="Description"
          textarea
          value={
            content.hero.description
          }
          onChange={
            (value) =>
              updateSection(
                "hero",
                "description",
                value
              )
          }
        />


        <div className="admin-form-row">

          <Field
            label="Primary button"
            value={
              content.hero.primaryButton
            }
            onChange={
              (value) =>
                updateSection(
                  "hero",
                  "primaryButton",
                  value
                )
            }
          />


          <Field
            label="Secondary button"
            value={
              content.hero.secondaryButton
            }
            onChange={
              (value) =>
                updateSection(
                  "hero",
                  "secondaryButton",
                  value
                )
            }
          />

        </div>


        <Field
          label="Note"
          value={
            content.hero.note
          }
          onChange={
            (value) =>
              updateSection(
                "hero",
                "note",
                value
              )
          }
        />

      </EditorSection>


      {/* =========================================
          PROBLEMS
      ========================================= */}

      <EditorSection
        title="Problem Section"
      >

        <Field
          label="Section label"
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
          label="Title"
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
                  `Problem ${index + 1}`
                }
              >

                <Field
                  label="Icon"
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
                  label="Title"
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
                  label="Description"
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
        title="Dashboard Templates"
      >

        <Field
          label="Section label"
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
          label="Title"
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
                  `Template ${index + 1}`
                }
              >

                <div className="admin-form-row">

                  <Field
                    label="Icon"
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
                    label="Title"
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
                  label="Description"
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
          label="Bottom note"
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
        title="Why DataView"
      >

        <Field
          label="Section label"
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
          label="Title"
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
                  `Benefit ${index + 1}`
                }
              >

                <div className="admin-form-row">

                  <Field
                    label="Icon"
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
                    label="Title"
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
                  label="Description"
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
        title="How It Works"
      >

        <Field
          label="Section label"
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
          label="Title"
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
                  `Step ${index + 1}`
                }
              >

                <Field
                  label="Title"
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
                  label="Description"
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
          label="Bottom note"
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
        title="Pricing"
      >

        <Field
          label="Section label"
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
          label="Title"
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
                  `Plan ${planIndex + 1}`
                }
              >

                <div className="admin-form-row">

                  <Field
                    label="Name"
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
                    label="Price"
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
                          `Feature ${featureIndex + 1}`
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
          label="Bottom note"
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
        title="Testimonials"
      >

        <Field
          label="Section label"
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
          label="Title"
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
                  `Testimonial ${index + 1}`
                }
              >

                <Field
                  label="Comment"
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
                    label="Name"
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
                    label="Position"
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
        title="FAQ"
      >

        <Field
          label="Section label"
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
          label="Title"
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
                  `FAQ ${index + 1}`
                }
              >

                <Field
                  label="Question"
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
                  label="Answer"
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
        title="Contact"
      >

        <Field
          label="Section label"
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
          label="Title"
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
          label="Description"
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
          label="Phone"
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
          label="Email"
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
          label="Address"
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
              ? "Saving..."
              : "Save All Changes"
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