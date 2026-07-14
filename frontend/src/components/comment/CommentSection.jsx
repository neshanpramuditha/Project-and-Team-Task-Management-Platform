import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getComments,
  createComment,
  deleteComment,
} from "../../services/comment.service";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (taskId) {
      loadComments();
    }
  }, [taskId]);

  async function loadComments() {
    try {
      const data = await getComments(taskId);
      setComments(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    try {
      const comment = await createComment(taskId, data);

      setComments((prev) => [...prev, comment]);

      toast.success("Comment added");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteComment(id);

      setComments((prev) =>
        prev.filter((comment) => comment.id !== id)
      );

      toast.success("Comment deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  }

  return (
    <div className="mt-8 border-t pt-6">

      <h2 className="mb-4 text-xl font-bold">
        💬 Comments
      </h2>

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <CommentList
          comments={comments}
          onDelete={handleDelete}
        />
      )}

      <div className="mt-6">
        <CommentForm
          onSubmit={handleCreate}
        />
      </div>

    </div>
  );
}

export default CommentSection;