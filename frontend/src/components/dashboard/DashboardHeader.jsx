import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

function DashboardHeader() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          {greeting},{" "}
          <span className="font-semibold text-blue-600">
            {user?.firstName}
          </span>{" "}
          👋
        </p>

      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm border border-gray-200">

        <FaCalendarAlt className="text-blue-600 text-xl" />

        <div>

          <p className="text-xs text-gray-500">
            Today
          </p>

          <p className="font-semibold">
            {new Date().toLocaleDateString()}
          </p>

        </div>

        <FaUserCircle className="text-4xl text-gray-400 ml-4" />

      </div>

    </div>
  );
}

export default DashboardHeader;