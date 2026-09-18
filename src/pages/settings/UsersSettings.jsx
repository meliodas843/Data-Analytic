import {
  Search,
  Info,
  Plus,
} from "lucide-react";

export default function UsersSettings() {
  const users = [
    {
      avatar: "Б",
      name: "Бат-Эрдэнэ",
      email: "demo@company.mn",
      role: "Admin",
      branch: "Бүгд",
      last: "Одоо",
      status: "Идэвхтэй",
      owner: true,
    },
    {
      avatar: "С",
      name: "Сарантуяа",
      email: "sara@company.mn",
      role: "Editor",
      branch: "Нийслэл",
      last: "2026-09-16",
      status: "Идэвхтэй",
    },
    {
      avatar: "Э",
      name: "Энхбаяр",
      email: "enkh@company.mn",
      role: "Viewer",
      branch: "Дархан",
      last: "—",
      status: "Урилга илгээсэн",
    },
  ];

  return (
    <div className="settings-inner">
      <div className="settings-page-title">
        <h1>Хэрэглэгчид & эрх</h1>
        <p>
          Багийн гишүүдийг урьж, эрх ба
          салбар хуваарилах
        </p>
      </div>

      <div className="users-top-grid">
        <section className="settings-card">
          <h3>Хэрэглэгч урих</h3>

          <p className="settings-card-subtitle">
            Урилгын холбоос и-мэйлээр очно,
            7 хоног хүчинтэй
          </p>

          <div className="invite-row">
            <input
              type="email"
              placeholder="И-мэйл хаяг"
            />

            <select defaultValue="Viewer">
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>

            <Info size={17} />

            <select defaultValue="all">
              <option value="all">Бүгд</option>
              <option>Нийслэл</option>
              <option>Дархан</option>
            </select>

            <button
              type="button"
              className="settings-primary-button"
            >
              <Plus size={16} />
              Урих
            </button>
          </div>
        </section>

        <section className="settings-card">
          <h3>Хэрэглэгчийн тоо</h3>

          <div className="user-count-row">
            <strong>
              3 <span>/ 5</span>
            </strong>

            <span>Starter</span>
          </div>

          <div className="user-progress">
            <span />
          </div>
        </section>
      </div>

      <section className="settings-card users-table-card">
        <div className="users-filter-row">
          <div className="users-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Нэр, и-мэйлээр хайх"
            />
          </div>

          <select defaultValue="all">
            <option value="all">
              Бүх эрх
            </option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>

        <div className="users-table">
          <div className="users-table-head">
            <span>Нэр</span>
            <span>И-мэйл</span>
            <span>Эрх</span>
            <span>Салбар нэгж</span>
            <span>Сүүлд нэвтэрсэн</span>
            <span>Төлөв</span>
          </div>

          {users.map((user) => (
            <div
              className="users-table-row"
              key={user.email}
            >
              <div className="user-name-cell">
                <span className="small-avatar">
                  {user.avatar}
                </span>

                <strong>{user.name}</strong>

                {user.owner && (
                  <span className="owner-badge">
                    Та
                  </span>
                )}
              </div>

              <span>{user.email}</span>

              <select defaultValue={user.role}>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>

              <span>{user.branch}</span>
              <span>{user.last}</span>

              <span
                className={
                  user.status === "Идэвхтэй"
                    ? "user-status active"
                    : "user-status pending"
                }
              >
                {user.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}