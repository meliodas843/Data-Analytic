import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/Admin/Admin.css";


function AdminLayout() {
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    `admin-nav-item ${isActive ? "active" : ""}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <div>

          <div className="admin-logo">
            <div className="admin-logo-icon">
              D
            </div>

            <div>
              <strong>DataView</strong>
              <span>Super Admin</span>
            </div>
          </div>


          <nav className="admin-nav">

            <NavLink
              to="/admin"
              end
              className={getLinkClass}
            >
              <span>Dashboard</span>
            </NavLink>


            <NavLink
              to="/admin/home"
              className={getLinkClass}
            >
              <span>Home Page</span>
            </NavLink>


            <NavLink
              to="/admin/company"
              className={getLinkClass}
            >
              <span>Company</span>
            </NavLink>

            <NavLink
              to="/admin/users"
              className={getLinkClass}
            >
              <span>Users</span>
            </NavLink>

            <NavLink
              to="/admin/requests"
              className={getLinkClass}
            >
              <span>Requests</span>
            </NavLink>

          </nav>

        </div>


        <div className="admin-sidebar-bottom">

          <button
            type="button"
            className="admin-view-site"
            onClick={() => navigate("/")}
          >
            🌐 View Website
          </button>


          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            ⏻ Logout
          </button>

        </div>

      </aside>


      <main className="admin-main">

        <header className="admin-header">

          <div>
            <h1>DataView Administration</h1>
            <p>
              Manage website content and administrators
            </p>
          </div>

        </header>


        <div className="admin-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}


export default AdminLayout;