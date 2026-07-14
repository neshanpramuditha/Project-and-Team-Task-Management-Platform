import { useState } from "react";

function CommentForm({
  onSubmit,
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) return;

    onSubmit({
      message,
    });

    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <textarea
        rows={3}
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Write a comment..."
        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;