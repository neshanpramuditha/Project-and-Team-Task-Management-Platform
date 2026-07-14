function DeleteProjectModal({
  isOpen,
  project,
  onCancel,
  onConfirm,
}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="text-2xl font-bold text-red-600">

          Delete Project

        </h2>

        <p className="mt-4 text-gray-600">

          Are you sure you want to delete

          <span className="font-semibold">

            {" "}
            {project?.title}

          </span>

          ?

        </p>

        <p className="mt-2 text-sm text-red-500">

          This action cannot be undone.

        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button

            onClick={onCancel}

            className="rounded-lg border px-5 py-3"

          >

            Cancel

          </button>

          <button

            onClick={onConfirm}

            className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteProjectModal;