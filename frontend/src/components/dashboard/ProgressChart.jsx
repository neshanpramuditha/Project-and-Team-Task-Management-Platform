import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

function ProgressChart({ stats }) {

  const data = [
    {
      name: "Projects",
      value: stats.projects.total,
    },
    {
      name: "Tasks",
      value: stats.tasks.total,
    },
    {
      name: "Users",
      value: stats.users.total,
    },
    {
      name: "Completed",
      value: stats.tasks.completed,
    },
  ];

  return (

    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">

        Overview

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <XAxis dataKey="name"/>

          <Tooltip/>

          <Bar
            dataKey="value"
            fill="#2563EB"
            radius={[6,6,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ProgressChart;