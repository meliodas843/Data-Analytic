import {
  useEffect,
  useState,
} from "react";

const defaultHomeContent = {
  hero: {
    eyebrow: "",
    title: "",
    description: "",
    beforeLabel: "",
    afterLabel: "",
    compareHint: "",
    primaryButton: "",
    secondaryButton: "",
    note: "",
    leftImage: "",
    rightImage: "",
  },
  problem: {
    kicker: "",
    title: "",
    items: [],
  },
  templates: {
    kicker: "",
    title: "",
    note: "",
    items: [],
  },
  benefits: {
    kicker: "",
    title: "",
    items: [],
  },
  steps: {
    kicker: "",
    title: "",
    note: "",
    items: [],
  },
  pricing: {
    kicker: "",
    title: "",
    note: "",
    plans: [],
  },
  testimonials: {
    kicker: "",
    title: "",
    items: [],
  },
  faq: {
    kicker: "",
    title: "",
    items: [],
  },
  contact: {
    kicker: "",
    title: "",
    description: "",
    phone: "",
    email: "",
    address: "",
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
