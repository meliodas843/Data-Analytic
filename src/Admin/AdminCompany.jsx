import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../styles/Admin/AdminCompany.css";

const API_URL =
  "http://localhost:5000/api/companies";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader =
      new FileReader();

    reader.onload = () =>
      resolve(reader.result);

    reader.onerror = () =>
      reject(
        new Error(
          "Лого уншихад алдаа гарлаа."
        )
      );

    reader.readAsDataURL(file);
  });

function AdminCompany() {
  const [
    companies,
    setCompanies,
  ] = useState([]);

  const [
    filter,
    setFilter,
  ] = useState("all");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    editingCompany,
    setEditingCompany,
  ] = useState(null);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    logoPreview,
    setLogoPreview,
  ] = useState("");

  const logoInputRef =
    useRef(null);

  const [
    form,
    setForm,
  ] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
    status: "active",
    sync_status:
      "pending",
    sync_time: "",
    color: "#16A34A",
    logo: null,
  });

  const loadCompanies =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            API_URL
          );

        const result =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            result.message ||
              "Компаниудыг авахад алдаа гарлаа."
          );
        }

        setCompanies(
          result.companies ||
            []
        );
      } catch (err) {
        console.error(
          "Load companies error:",
          err
        );

        setError(
          err.message ||
            "Компаниудыг авахад алдаа гарлаа."
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    loadCompanies();
  }, []);

  const filteredCompanies =
    useMemo(() => {
      if (
        filter ===
        "active"
      ) {
        return companies.filter(
          (company) =>
            company.status ===
            "active"
        );
      }

      if (
        filter ===
        "inactive"
      ) {
        return companies.filter(
          (company) =>
            company.status ===
            "inactive"
        );
      }

      if (
        filter ===
        "pending"
      ) {
        return companies.filter(
          (company) =>
            company.status ===
            "pending"
        );
      }

      return companies;
    }, [
      companies,
      filter,
    ]);

  const openCreateModal =
    () => {
      setEditingCompany(
        null
      );

      setLogoPreview("");

      setForm({
        name: "",
        email: "",
        phone: "",
        domain: "",
        status: "active",
        sync_status:
          "pending",
        sync_time: "",
        color: "#16A34A",
        logo: null,
      });

      setShowModal(
        true
      );
    };

  const openEditModal =
    (company) => {
      setEditingCompany(
        company
      );

      setLogoPreview(
        company.logo?.startsWith(
          "data:image/"
        )
          ? company.logo
          : ""
      );

      setForm({
        name:
          company.name ||
          "",

        email:
          company.email ||
          "",

        phone:
          company.phone ||
          "",

        domain:
          company.domain ||
          "",

        status:
          company.status ||
          "pending",

        sync_status:
          company.sync_status ||
          "pending",

        sync_time:
          company.sync_time ||
          "",

        color:
          company.color ||
          "#16A34A",

        logo:
          company.logo ||
          null,
      });

      setShowModal(
        true
      );
    };

  const closeModal =
    () => {
      if (saving) {
        return;
      }

      setShowModal(
        false
      );

      setEditingCompany(
        null
      );

      setLogoPreview("");
    };

  const handleChange =
    (event) => {
      const {
        name,
        value,
      } =
        event.target;

      setForm(
        (current) => ({
          ...current,
          [name]:
            value,
        })
      );
    };

  const handleLogoChange =
    async (event) => {
      try {
        const file =
          event.target
            .files?.[0];

        if (!file) {
          return;
        }

        if (
          ![
            "image/png",
            "image/jpeg",
            "image/webp",
          ].includes(
            file.type
          )
        ) {
          alert(
            "PNG, JPG эсвэл WEBP зураг сонгоно уу."
          );

          event.target.value =
            "";

          return;
        }

        if (
          file.size >
          2 * 1024 * 1024
        ) {
          alert(
            "Лого 2MB-аас бага хэмжээтэй байна."
          );

          event.target.value =
            "";

          return;
        }

        const base64 =
          await fileToBase64(
            file
          );

        setLogoPreview(
          base64
        );

        setForm(
          (current) => ({
            ...current,
            logo:
              base64,
          })
        );
      } catch (err) {
        alert(
          err.message
        );
      }
    };

  const removeLogo =
    () => {
      setLogoPreview("");

      setForm(
        (current) => ({
          ...current,
          logo: null,
        })
      );

      if (
        logoInputRef.current
      ) {
        logoInputRef.current.value =
          "";
      }
    };

  const handleSave =
    async (event) => {
      event.preventDefault();

      if (
        !form.name.trim()
      ) {
        alert(
          "Компанийн нэр оруулна уу."
        );

        return;
      }

      if (
        !form.email.trim()
      ) {
        alert(
          "Компанийн имэйл оруулна уу."
        );

        return;
      }

      try {
        setSaving(true);

        let response;

        if (
          editingCompany
        ) {
          response =
            await fetch(
              `${API_URL}/${editingCompany.id}`,
              {
                method:
                  "PUT",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    name:
                      form.name.trim(),

                    email:
                      form.email
                        .trim()
                        .toLowerCase(),

                    phone:
                      form.phone.trim(),

                    domain:
                      form.domain.trim(),

                    status:
                      form.status,

                    sync_status:
                      form.sync_status,

                    sync_time:
                      form.sync_time,

                    color:
                      form.color,

                    logo:
                      form.logo,
                  }),
              }
            );
        } else {
          response =
            await fetch(
              `${API_URL}/register`,
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    name:
                      form.name.trim(),

                    email:
                      form.email
                        .trim()
                        .toLowerCase(),

                    phone:
                      form.phone.trim(),

                    domain:
                      form.domain.trim(),

                    status:
                      form.status,

                    color:
                      form.color,

                    logo:
                      form.logo,
                  }),
              }
            );
        }

        const result =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            result.message ||
              "Хадгалахад алдаа гарлаа."
          );
        }

        setShowModal(
          false
        );

        setEditingCompany(
          null
        );

        setLogoPreview("");

        await loadCompanies();
      } catch (err) {
        console.error(
          "Save company error:",
          err
        );

        alert(
          err.message ||
            "Хадгалахад алдаа гарлаа."
        );
      } finally {
        setSaving(
          false
        );
      }
    };

  const handleDelete =
    async (
      company
    ) => {
      const confirmed =
        window.confirm(
          `"${company.name}" компанийг устгах уу?`
        );

      if (
        !confirmed
      ) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/${company.id}`,
            {
              method:
                "DELETE",
            }
          );

        const result =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            result.message ||
              "Компани устгахад алдаа гарлаа."
          );
        }

        setCompanies(
          (current) =>
            current.filter(
              (item) =>
                item.id !==
                company.id
            )
        );
      } catch (err) {
        console.error(
          "Delete company error:",
          err
        );

        alert(
          err.message
        );
      }
    };

  const toggleStatus =
    async (
      company
    ) => {
      const newStatus =
        company.status ===
        "active"
          ? "inactive"
          : "active";

      try {
        const response =
          await fetch(
            `${API_URL}/${company.id}`,
            {
              method:
                "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  name:
                    company.name,

                  domain:
                    company.domain,

                  email:
                    company.email,

                  phone:
                    company.phone,

                  status:
                    newStatus,

                  sync_status:
                    company.sync_status ||
                    "pending",

                  sync_time:
                    company.sync_time ||
                    "",

                  color:
                    company.color ||
                    "#16A34A",

                  logo:
                    company.logo,
                }),
            }
          );

        const result =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            result.message ||
              "Статус өөрчлөхөд алдаа гарлаа."
          );
        }

        setCompanies(
          (current) =>
            current.map(
              (item) =>
                item.id ===
                company.id
                  ? {
                      ...item,
                      status:
                        newStatus,
                    }
                  : item
            )
        );
      } catch (err) {
        console.error(
          "Status update error:",
          err
        );

        alert(
          err.message
        );
      }
    };

  const getStatusText =
    (status) => {
      if (
        status ===
        "active"
      ) {
        return "Идэвхтэй";
      }

      if (
        status ===
        "inactive"
      ) {
        return "Идэвхгүй";
      }

      return "Хүлээгдэж буй";
    };

  const renderSync =
    (company) => {
      if (
        company.sync_status ===
        "success"
      ) {
        return (
          <span className="company-sync success">
            ✓{" "}
            {company.sync_time ||
              "06:00"}
          </span>
        );
      }

      if (
        company.sync_status ===
        "error"
      ) {
        return (
          <span className="company-sync error">
            × Алдаа
          </span>
        );
      }

      return (
        <span className="company-sync pending">
          ◷ Хүлээгдэж буй
        </span>
      );
    };

  const renderLogo =
    (
      company,
      large = false
    ) => {
      const isImage =
        company?.logo?.startsWith(
          "data:image/"
        );

      if (
        isImage
      ) {
        return (
          <img
            src={
              company.logo
            }
            alt={
              company.name ||
              "Company"
            }
          />
        );
      }

      return (
        <span
          style={{
            background:
              company?.color ||
              "#2dc5ba",
          }}
        >
          {company?.name
            ?.charAt(0)
            .toUpperCase() ||
            "D"}
        </span>
      );
    };

  return (
    <div className="companies-page">
      <div className="companies-header">
        <h1>
          Харилцагчид
        </h1>

        <button
          type="button"
          className="company-add-button"
          onClick={
            openCreateModal
          }
        >
          <span>
            ＋
          </span>

          Шинэ харилцагч
        </button>
      </div>

      <div className="company-filter-tabs">
        <button
          type="button"
          className={
            filter ===
            "all"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter(
              "all"
            )
          }
        >
          Бүгд
        </button>

        <button
          type="button"
          className={
            filter ===
            "active"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter(
              "active"
            )
          }
        >
          Идэвхтэй
        </button>

        <button
          type="button"
          className={
            filter ===
            "inactive"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter(
              "inactive"
            )
          }
        >
          Идэвхгүй
        </button>

        <button
          type="button"
          className={
            filter ===
            "pending"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter(
              "pending"
            )
          }
        >
          Хүлээгдэж буй
        </button>
      </div>

      {error && (
        <div className="company-error">
          {error}
        </div>
      )}

      <div className="companies-table-card">
        <div className="companies-table-scroll">
          <table className="companies-table">
            <thead>
              <tr>
                <th>
                  ЛОГО
                </th>

                <th>
                  НЭР
                </th>

                <th>
                  ДОМЭЙН
                </th>

                <th>
                  ХЭРЭГЛЭГЧ
                </th>

                <th>
                  ШИНЭЧЛЭЛТ
                </th>

                <th>
                  СТАТУС
                </th>

                <th>
                  ҮЙЛДЭЛ
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan="7"
                    className="company-table-message"
                  >
                    Уншиж байна...
                  </td>
                </tr>
              )}

              {!loading &&
                filteredCompanies.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="company-table-message empty"
                    >
                      Харилцагч олдсонгүй
                    </td>
                  </tr>
                )}

              {!loading &&
                filteredCompanies.map(
                  (
                    company
                  ) => (
                    <tr
                      key={
                        company.id
                      }
                    >
                      <td>
                        <div
                          className={`company-logo ${
                            company.logo?.startsWith(
                              "data:image/"
                            )
                              ? "has-image"
                              : ""
                          }`}
                        >
                          {renderLogo(
                            company
                          )}
                        </div>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="company-name-button"
                          onClick={() =>
                            openEditModal(
                              company
                            )
                          }
                        >
                          {
                            company.name
                          }
                        </button>

                        {company.status ===
                          "pending" && (
                          <div className="company-pending-label">
                            Шинэ хүсэлт
                          </div>
                        )}
                      </td>

                      <td>
                        <span className="company-domain">
                          {company.domain ||
                            "—"}
                        </span>
                      </td>

                      <td>
                        <div className="company-user-count">
                          <span>
                            {Number(
                              company.users ||
                                0
                            )}
                          </span>

                          <small>
                            хэрэглэгч
                          </small>
                        </div>
                      </td>

                      <td>
                        {renderSync(
                          company
                        )}
                      </td>

                      <td>
                        <div className="company-status-wrap">
                          <button
                            type="button"
                            className={`company-status-switch ${
                              company.status
                            }`}
                            onClick={() =>
                              toggleStatus(
                                company
                              )
                            }
                          >
                            <span />
                          </button>

                          <span
                            className={`company-status-text ${company.status}`}
                          >
                            {getStatusText(
                              company.status
                            )}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="company-actions">
                          <button
                            type="button"
                            title="Засах"
                            onClick={() =>
                              openEditModal(
                                company
                              )
                            }
                          >
                            ✎
                          </button>

                          <button
                            type="button"
                            title="Устгах"
                            onClick={() =>
                              handleDelete(
                                company
                              )
                            }
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        <div className="companies-pagination">
          <span>
            {filteredCompanies.length >
            0
              ? `1–${filteredCompanies.length}`
              : "0"}
            {" / "}
            {
              filteredCompanies.length
            }{" "}
            нийт
          </span>

          <button
            type="button"
            disabled
          >
            ‹ Өмнөх
          </button>

          <button
            type="button"
            disabled
          >
            Дараах ›
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="company-modal-overlay"
          onMouseDown={
            closeModal
          }
        >
          <div
            className="company-modal"
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >
            <div className="company-modal-header">
              <div>
                <h2>
                  {editingCompany
                    ? "Харилцагч засах"
                    : "Шинэ харилцагч"}
                </h2>

                <p>
                  Компанийн мэдээллийг оруулна уу
                </p>
              </div>

              <button
                type="button"
                className="company-modal-close"
                onClick={
                  closeModal
                }
              >
                ×
              </button>
            </div>

            <form
              onSubmit={
                handleSave
              }
            >
              <div className="company-form-group">
                <label>
                  Компанийн лого
                </label>

                <div className="company-logo-editor-row">
                  <div
                    className={`company-edit-logo ${
                      logoPreview
                        ? "has-image"
                        : ""
                    }`}
                  >
                    {logoPreview ? (
                      <img
                        src={
                          logoPreview
                        }
                        alt={
                          form.name ||
                          "Company logo"
                        }
                      />
                    ) : (
                      <span
                        style={{
                          background:
                            form.color ||
                            "#2dc5ba",
                        }}
                      >
                        {form.name
                          ?.charAt(
                            0
                          )
                          .toUpperCase() ||
                          "D"}
                      </span>
                    )}
                  </div>

                  <div className="company-logo-editor-actions">
                    <input
                      ref={
                        logoInputRef
                      }
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={
                        handleLogoChange
                      }
                      hidden
                    />

                    <button
                      type="button"
                      className="company-logo-upload-button"
                      onClick={() =>
                        logoInputRef.current?.click()
                      }
                    >
                      Лого сонгох
                    </button>

                    {(logoPreview ||
                      form.logo) && (
                      <button
                        type="button"
                        className="company-logo-remove-button"
                        onClick={
                          removeLogo
                        }
                      >
                        Устгах
                      </button>
                    )}

                    <small>
                      PNG, JPG, WEBP · макс 2MB
                    </small>
                  </div>
                </div>
              </div>

              <div className="company-form-group">
                <label>
                  Компанийн нэр *
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Монгол Медиа ХХК"
                  required
                />
              </div>

              <div className="company-form-group">
                <label>
                  Имэйл *
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="info@company.mn"
                  required
                />
              </div>

              <div className="company-form-group">
                <label>
                  Утас
                </label>

                <input
                  type="text"
                  name="phone"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+976 9900 0000"
                />
              </div>

              <div className="company-form-group">
                <label>
                  Домэйн
                </label>

                <input
                  type="text"
                  name="domain"
                  value={
                    form.domain
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="company.dataview.mn"
                />
              </div>

              <div className="company-form-row">
                <div className="company-form-group">
                  <label>
                    Статус
                  </label>

                  <div className="company-select-wrapper">
                    <select
                      className="company-modern-select"
                      name="status"
                      value={
                        form.status
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="pending">
                        Хүлээгдэж буй
                      </option>

                      <option value="active">
                        Идэвхтэй
                      </option>

                      <option value="inactive">
                        Идэвхгүй
                      </option>
                    </select>

                    <span className="company-select-arrow">
                      ▾
                    </span>
                  </div>
                </div>

                <div className="company-form-group">
                  <label>
                    Дата шинэчлэлтийн статус
                  </label>

                  <div className="company-select-wrapper">
                    <select
                      className="company-modern-select"
                      name="sync_status"
                      value={
                        form.sync_status
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="pending">
                        Хүлээгдэж буй
                      </option>

                      <option value="success">
                        Амжилттай
                      </option>

                      <option value="error">
                        Алдаа
                      </option>
                    </select>

                    <span className="company-select-arrow">
                      ▾
                    </span>
                  </div>
                </div>
              </div>

              <div className="company-form-row">
                <div className="company-form-group">
                  <label>
                    Шинэчлэх цаг
                  </label>

                  <input
                    type="time"
                    name="sync_time"
                    value={
                      form.sync_time
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="company-form-group">
                  <label>
                    Лого өнгө
                  </label>

                  <div className="company-color-row">
                    <input
                      type="color"
                      name="color"
                      value={
                        form.color
                      }
                      onChange={
                        handleChange
                      }
                      className="company-color-input"
                    />

                    <span>
                      {form.color}
                    </span>
                  </div>
                </div>
              </div>

              <div className="company-modal-actions">
                <button
                  type="button"
                  className="company-cancel-button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving
                  }
                >
                  Цуцлах
                </button>

                <button
                  type="submit"
                  className="company-save-button"
                  disabled={
                    saving
                  }
                >
                  {saving
                    ? "Хадгалж байна..."
                    : editingCompany
                    ? "Хадгалах"
                    : "Үүсгэх"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCompany;