import React from "react";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`h-14 w-14 rounded-xl ${color} flex items-center justify-center text-white text-2xl shadow-md`}
        >
          <Icon />
        </div>

      </div>
    </div>
  );
}

export default StatCard;