import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#22C55E",
];

function TaskStatusChart({ stats }) {

  const data = [

    {
      name: "Todo",
      value: stats.tasks.todo,
    },

    {
      name: "In Progress",
      value: stats.tasks.inProgress,
    },

    {
      name: "Completed",
      value: stats.tasks.completed,
    },

  ];

  return (

    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">

        Task Status

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie

            data={data}

            dataKey="value"

            outerRadius={100}

            label

          >

            {

              data.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))

            }

          </Pie>

          <Tooltip/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default TaskStatusChart;