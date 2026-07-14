import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserModal({
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
    if (!isOpen) return;

    if (initialData) {
      reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,

        // Always blank when editing
        password: "",

        // IMPORTANT
        role:
          typeof initialData.role === "string"
            ? initialData.role
            : initialData.role?.name || "TEAM_MEMBER",
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "TEAM_MEMBER",
      });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          {initialData ? "Edit User" : "Create User"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label>First Name</label>

              <input
                {...register("firstName", {
                  required: true,
                })}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label>Last Name</label>

              <input
                {...register("lastName", {
                  required: true,
                })}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

          </div>

          <div>

            <label>Email</label>

            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          {/* Password */}

          <div>

            <label>
              Password
              {initialData && (
                <span className="ml-2 text-xs text-gray-500">
                  (Leave blank to keep current password)
                </span>
              )}
            </label>

            <input
              type="password"
              {...register("password")}
              className="mt-2 w-full rounded-lg border p-3"
              placeholder={
                initialData
                  ? "Leave blank"
                  : "Enter password"
              }
            />

          </div>

          <div>

            <label>Role</label>

            <select
              {...register("role")}
              className="mt-2 w-full rounded-lg border p-3"
            >

              <option value="ADMIN">
                ADMIN
              </option>

              <option value="PROJECT_MANAGER">
                PROJECT MANAGER
              </option>

              <option value="TEAM_MEMBER">
                TEAM MEMBER
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
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              {initialData
                ? "Update User"
                : "Create User"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UserModal;