function AdminDashboard() {
  return (
    <div>

      <div className="admin-page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>
            DataView administration overview
          </p>
        </div>
      </div>


      <div className="admin-stat-grid">

        <div className="admin-stat-card">
          <span>Total Admins</span>
          <strong>0</strong>
        </div>


        <div className="admin-stat-card">
          <span>Pending Admins</span>
          <strong>0</strong>
        </div>


        <div className="admin-stat-card">
          <span>Active Admins</span>
          <strong>0</strong>
        </div>


        <div className="admin-stat-card">
          <span>Home Sections</span>
          <strong>8</strong>
        </div>

      </div>

    </div>
  );
}


export default AdminDashboard;