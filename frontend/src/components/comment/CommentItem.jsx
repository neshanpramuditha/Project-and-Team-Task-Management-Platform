import { FaTrash } from "react-icons/fa";

function CommentItem({
  comment,
  onDelete,
}) {
  return (
    <div className="rounded-lg border bg-white p-3">

      <div className="flex items-center justify-between">

        <div>

          <h4 className="font-semibold">
            {comment.user.firstName} {comment.user.lastName}
          </h4>

          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>

        </div>

        <button
          onClick={() => onDelete(comment.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>

      </div>

      <p className="mt-3 text-gray-700">
        {comment.message}
      </p>

    </div>
  );
}

export default CommentItem;