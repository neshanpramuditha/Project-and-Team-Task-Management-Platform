function PriorityBadge({ priority }) {

  const colors = {

    LOW: "bg-green-100 text-green-700",

    MEDIUM: "bg-yellow-100 text-yellow-700",

    HIGH: "bg-red-100 text-red-700",

    URGENT: "bg-purple-100 text-purple-700",

  };

  return (

    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        colors[priority]
      }`}
    >
      {priority}
    </span>

  );

}

export default PriorityBadge;