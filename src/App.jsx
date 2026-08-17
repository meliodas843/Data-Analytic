import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Setup from "./pages/Setup";

import FinanceDashboard from "./pages/graphs/FinanceDashboard";
import SalesDashboard from "./pages/graphs/SalesDashboard";
import ArApDashboard from "./pages/graphs/ArApDashboard";
import InventoryDashboard from "./pages/graphs/InventoryDashboard";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminHome from "./Admin/AdminHome";
import AdminCompany from "./Admin/AdminCompany";
import AdminRequests from "./Admin/AdminRequests";
import AdminUsers from "./Admin/AdminUsers";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/setup"
          element={<Setup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/finance"
          element={<FinanceDashboard />}
        />

        <Route
          path="/sales"
          element={<SalesDashboard />}
        />

        <Route
          path="/ar-ap"
          element={<ArApDashboard />}
        />

        <Route
          path="/inventory"
          element={<InventoryDashboard />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="home"
            element={<AdminHome />}
          />

          <Route
            path="company"
            element={<AdminCompany />}
          />

          <Route
            path="requests"
            element={<AdminRequests />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;