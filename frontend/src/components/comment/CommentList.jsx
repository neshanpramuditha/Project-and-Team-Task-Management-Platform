import CommentItem from "./CommentItem";

function CommentList({
  comments,
  onDelete,
}) {
  if (comments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CommentList;