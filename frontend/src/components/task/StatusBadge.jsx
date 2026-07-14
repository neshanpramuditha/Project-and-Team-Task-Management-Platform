function StatusBadge({ status }) {

  const colors = {

    TODO: "bg-gray-100 text-gray-700",

    IN_PROGRESS: "bg-blue-100 text-blue-700",

    DONE: "bg-green-100 text-green-700",

  };

  return (

    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        colors[status]
      }`}
    >
      {status.replace("_", " ")}
    </span>

  );

}

export default StatusBadge;