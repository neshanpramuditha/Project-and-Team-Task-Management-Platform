function RecentTasks({ tasks }) {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">

      <h2 className="mb-5 text-xl font-bold">
        Recent Tasks
      </h2>

      <div className="space-y-4">

        {tasks.slice(0,5).map(task=>(

          <div
            key={task.id}
            className="flex items-center justify-between border-b pb-3 last:border-none"
          >

            <div>

              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="text-sm text-gray-500">
                {task.project.title}
              </p>

            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

              {task.status}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentTasks;