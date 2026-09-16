import "../styles/Admin/AdminDashboard.css";
function AdminDashboard() {
  const stats = [
    {
      label: "Нийт админ",
      value: 0,
      icon: "👥",
    },
    {
      label: "Хүлээгдэж буй админ",
      value: 0,
      icon: "◷",
    },
    {
      label: "Идэвхтэй админ",
      value: 0,
      icon: "✓",
    },
    {
      label: "Нүүр хуудасны хэсэг",
      value: 8,
      icon: "▤",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="admin-page-heading">
        <div>
          <h2>Хяналтын самбар</h2>

          <p>
            DataView системийн удирдлагын ерөнхий мэдээлэл
          </p>
        </div>
      </div>

      <div className="admin-stat-grid">
        {stats.map((item) => (
          <div
            className="admin-stat-card"
            key={item.label}
          >
            <div className="admin-stat-card-top">
              <span className="admin-stat-label">
                {item.label}
              </span>

              <div className="admin-stat-icon">
                {item.icon}
              </div>
            </div>

            <strong className="admin-stat-value">
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;