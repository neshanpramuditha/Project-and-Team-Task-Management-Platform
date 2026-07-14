import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Get role name safely
  const role = user?.role?.name ?? "";

  const menus = [
    {
      name: "Dashboard",
      icon: FaHome,
      path: "/",
    },
    {
      name: "Projects",
      icon: FaProjectDiagram,
      path: "/projects",
    },
    {
      name: "Tasks",
      icon: FaTasks,
      path: "/tasks",
    },
  ];

  // Admin only menu
  if (role === "ADMIN") {
    menus.push({
      name: "Users",
      icon: FaUsers,
      path: "/users",
    });
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col bg-slate-900 text-white shadow-xl">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-blue-500">
          TaskFlow
        </h1>

        {user && (
          <div className="mt-4">

            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-sm text-slate-400">
              {role.replace(/_/g, " ")}
            </p>

          </div>
        )}

      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1">

        {menus.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `mx-3 mb-2 flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition-all duration-200 hover:bg-red-600 hover:text-white"
        >
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;