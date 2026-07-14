import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {

    if (initialData) {

      reset(initialData);

    } else {

      reset({
        code: "",
        title: "",
        description: "",
        status: "PLANNING",
      });

    }

  }, [initialData, reset]);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">

          {initialData
            ? "Edit Project"
            : "Create Project"}

        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="font-medium">

              Project Code

            </label>

            <input
              {...register("code", {
                required: true,
              })}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="font-medium">

              Title

            </label>

            <input
              {...register("title", {
                required: true,
              })}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="font-medium">

              Description

            </label>

            <textarea
              {...register("description")}
              rows={4}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="font-medium">

              Status

            </label>

            <select
              {...register("status")}
              className="mt-2 w-full rounded-lg border p-3"
            >

              <option value="PLANNING">
                Planning
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="CANCELLED">
                Cancelled
              </option>

            </select>

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-3"
            >

              Cancel

            </button>

            <button
              className="rounded-lg bg-blue-600 px-6 py-3 text-white"
            >

              Save

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default ProjectModal;