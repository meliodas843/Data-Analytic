import { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";
import "../styles/Admin/AdminUsers.css";

const API_URL = "http://localhost:5000/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [companyFilter, setCompanyFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company_id: "",
    role: "viewer",
    birthday: "",
    password: "",
  });

  // ==========================================
  // LOAD USERS
  // ==========================================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/users`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Хэрэглэгчдийг авахад алдаа гарлаа."
        );
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error("Load users error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD COMPANIES
  // ==========================================

  const loadCompanies = async () => {
    try {
      const response = await fetch(`${API_URL}/companies`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Харилцагчдыг авахад алдаа гарлаа."
        );
      }

      setCompanies(data.companies || []);
    } catch (err) {
      console.error("Load companies error:", err);
    }
  };

  useEffect(() => {
    loadUsers();
    loadCompanies();
  }, []);

  // ==========================================
  // FILTER USERS
  // ==========================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesCompany =
        companyFilter === "all" ||
        String(user.company_id) === String(companyFilter);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      const matchesSearch =
        !search ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCompany &&
        matchesRole &&
        matchesSearch
      );
    });
  }, [
    users,
    companyFilter,
    roleFilter,
    search,
  ]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / perPage)
  );

  const startIndex = (page - 1) * perPage;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + perPage
  );

  useEffect(() => {
    setPage(1);
  }, [companyFilter, roleFilter, search]);

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const openAddModal = () => {
    setEditingUser(null);

    setForm({
      name: "",
      email: "",
      company_id: "",
      role: "viewer",
      birthday: "",
      password: "",
    });

    setModalOpen(true);
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const openEditModal = (user) => {
    setEditingUser(user);

    setForm({
      name: user.name || "",
      email: user.email || "",
      company_id: user.company_id || "",
      role: user.role || "viewer",
      birthday: user.birthday
        ? String(user.birthday).slice(0, 10)
        : "",
      password: "",
    });

    setModalOpen(true);
  };

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SAVE USER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = `${API_URL}/users`;
      let method = "POST";

      if (editingUser) {
        url = `${API_URL}/users/${editingUser.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Хадгалахад алдаа гарлаа."
        );
      }

      setModalOpen(false);
      await loadUsers();
    } catch (err) {
      console.error("Save user error:", err);
      alert(err.message);
    }
  };

  // ==========================================
  // DELETE USER
  // ==========================================

  const deleteUser = async (user) => {
    const confirmed = window.confirm(
      `${user.email} хэрэглэгчийг устгах уу?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/users/${user.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Устгахад алдаа гарлаа."
        );
      }

      await loadUsers();
    } catch (err) {
      console.error("Delete user error:", err);
      alert(err.message);
    }
  };

  // ==========================================
  // LOCK / UNLOCK
  // ==========================================

  const toggleLock = async (user) => {
    try {
      const response = await fetch(
        `${API_URL}/users/${user.id}/lock`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            is_locked: !Boolean(user.is_locked),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Хэрэглэгчийн төлөв өөрчлөхөд алдаа гарлаа."
        );
      }

      await loadUsers();
    } catch (err) {
      console.error("Lock user error:", err);
      alert(err.message);
    }
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const hour = String(
      date.getHours()
    ).padStart(2, "0");

    const minute = String(
      date.getMinutes()
    ).padStart(2, "0");

    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  return (
    <div className="admin-users-page">

      {/* =====================================
          TITLE
      ====================================== */}

      <div className="admin-users-heading">
        <h2>Хэрэглэгчид</h2>

        <button
          type="button"
          className="add-user-button"
          onClick={openAddModal}
        >
          <span>+</span>
          Шинэ хэрэглэгч
        </button>
      </div>

      {/* =====================================
          FILTERS
      ====================================== */}

      <div className="users-toolbar">

        <select
          value={companyFilter}
          onChange={(e) =>
            setCompanyFilter(e.target.value)
          }
        >
          <option value="all">
            Бүх харилцагч
          </option>

          {companies.map((company) => (
            <option
              key={company.id}
              value={company.id}
            >
              {company.name}
            </option>
          ))}
        </select>

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
        >
          <option value="all">
            Бүгд
          </option>

          <option value="admin">
            Admin
          </option>

          <option value="viewer">
            Viewer
          </option>
        </select>

        <div className="user-search">
          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Имэйлээр хайх..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

      </div>

      {/* =====================================
          ERROR
      ====================================== */}

      {error && (
        <div className="users-error">
          {error}
        </div>
      )}

      {/* =====================================
          TABLE
      ====================================== */}

      <div className="users-table-card">

        <div className="users-table-scroll">

          <table className="users-table">

            <thead>
              <tr>
                <th>ИМЭЙЛ</th>
                <th>ХАРИЛЦАГЧ</th>
                <th>ҮҮРЭГ</th>
                <th>СҮҮЛД НЭВТЭРСЭН</th>
                <th>ҮЙЛДЭЛ</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="users-empty"
                  >
                    Уншиж байна...
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="users-empty"
                  >
                    Хэрэглэгч олдсонгүй.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={
                      user.is_locked
                        ? "locked-user-row"
                        : ""
                    }
                  >

                    <td>
                      <strong className="user-email">
                        {user.email}
                      </strong>
                    </td>

                    <td className="company-name">
                      {user.company_name || "-"}
                    </td>

                    <td>
                      <span
                        className={`role-badge ${
                          user.role === "admin"
                            ? "role-admin"
                            : "role-viewer"
                        }`}
                      >
                        {user.role || "viewer"}
                      </span>
                    </td>

                    <td className="last-login">
                      {formatDate(
                        user.last_login
                      )}
                    </td>

                    <td>
                      <div className="user-actions">

                        {/* EDIT */}

                        <button
                          type="button"
                          className="user-action-button"
                          title="Засах"
                          onClick={() =>
                            openEditModal(user)
                          }
                        >
                          ✎
                        </button>

                        <button
                        type="button"
                        className={`user-action-button ${
                            user.is_locked ? "unlock" : "lock"
                        }`}
                        title={
                            user.is_locked
                            ? "Түгжээ тайлах"
                            : "Түгжих"
                        }
                        onClick={() => toggleLock(user)}
                        >
                        {user.is_locked ? (
                            <Unlock size={16} />
                        ) : (
                            <Lock size={16} />
                        )}
                        </button>

                        <button
                        type="button"
                        className="user-action-button delete"
                        title="Устгах"
                        onClick={() => deleteUser(user)}
                        >
                        <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {/* =================================
            PAGINATION
        ================================== */}
        {!loading &&
          filteredUsers.length > 0 && (
            <div className="users-pagination">

              <span>
                {startIndex + 1}–
                {Math.min(
                  startIndex + perPage,
                  filteredUsers.length
                )}{" "}
                / {filteredUsers.length} нийт
              </span>

              <div className="pagination-buttons">

                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                >
                  ‹ Өмнөх
                </button>

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(
                        totalPages,
                        prev + 1
                      )
                    )
                  }
                >
                  Дараах ›
                </button>

              </div>

            </div>
          )}

      </div>

      {/* =====================================
          ADD / EDIT MODAL
      ====================================== */}

      {modalOpen && (
        <div
          className="user-modal-overlay"
          onMouseDown={() =>
            setModalOpen(false)
          }
        >

          <div
            className="user-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <div className="user-modal-header">

              <div>
                <h3>
                  {editingUser
                    ? "Хэрэглэгч засах"
                    : "Шинэ хэрэглэгч"}
                </h3>

                <p>
                  Хэрэглэгчийн мэдээллийг
                  оруулна уу.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setModalOpen(false)
                }
              >
                ×
              </button>

            </div>

            <form
              className="user-form"
              onSubmit={handleSubmit}
            >

              <label>
                Нэр

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Батболд Сүхбат"
                  required
                />
              </label>

              <label>
                Имэйл

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.mn"
                  required
                />
              </label>

              <label>
                Харилцагч

                <select
                  name="company_id"
                  value={form.company_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Харилцагч сонгох
                  </option>

                  {companies.map(
                    (company) => (
                      <option
                        key={company.id}
                        value={company.id}
                      >
                        {company.name}
                      </option>
                    )
                  )}
                </select>
              </label>

              <div className="user-form-row">

                <label>
                  Үүрэг

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="admin">
                      Admin
                    </option>

                    <option value="viewer">
                      Viewer
                    </option>
                  </select>
                </label>

                <label>
                  Төрсөн огноо

                  <input
                    type="date"
                    name="birthday"
                    value={form.birthday}
                    onChange={handleChange}
                  />
                </label>

              </div>

              <label>
                {editingUser
                  ? "Шинэ нууц үг"
                  : "Нууц үг"}

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={
                    editingUser
                      ? "Өөрчлөхгүй бол хоосон үлдээнэ"
                      : "••••••••"
                  }
                  required={!editingUser}
                />
              </label>

              <div className="user-modal-footer">

                <button
                  type="button"
                  className="cancel-user-button"
                  onClick={() =>
                    setModalOpen(false)
                  }
                >
                  Болих
                </button>

                <button
                  type="submit"
                  className="save-user-button"
                >
                  {editingUser
                    ? "Хадгалах"
                    : "+ Хэрэглэгч нэмэх"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminUsers;