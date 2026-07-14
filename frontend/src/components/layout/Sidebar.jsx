import {
    FaHome,
    FaProjectDiagram,
    FaTasks,
    FaComments,
    FaBell,
    FaChartBar,
    FaUser
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
    {
  name: "Comments",
  icon: FaComments,
  path: "/comments",
},
  {
    name: "Notifications",
    icon: FaBell,
    path: "/notifications",
  },
  {
    name: "Activity",
    icon: FaChartBar,
    path: "/activity",
  },
  {
    name: "Profile",
    icon: FaUser,
    path: "/profile",
  },
];

function Sidebar() {

    return (

        <aside className="sticky top-0 h-screen w-64 bg-slate-900 text-white shadow-xl">

            <div className="p-6">

                <h1 className="text-2xl font-bold text-blue-500">

                  TaskFlow

                </h1>

            </div>
            
            <nav>
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
                    <item.icon />

                    <span>{item.name}</span>
                  </NavLink>
                ))}
            </nav>

        </aside>

    );

}

export default Sidebar;