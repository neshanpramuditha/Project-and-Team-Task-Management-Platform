import { FaFolderOpen } from "react-icons/fa";

function EmptyState({ title }) {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white">

      <FaFolderOpen className="text-5xl text-gray-400" />

      <h2 className="mt-4 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        No data available.
      </p>

    </div>
  );
}

export default EmptyState;