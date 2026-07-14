function DeleteUserModal({
  isOpen,
  user,
  onCancel,
  onConfirm,
}) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="text-2xl font-bold text-red-600">
          Delete User
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {user.firstName} {user.lastName}
          </span>
          ?
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteUserModal;