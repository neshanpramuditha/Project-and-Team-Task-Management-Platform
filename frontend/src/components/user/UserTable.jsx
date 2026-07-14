import { FaEdit, FaTrash } from "react-icons/fa";

function UserTable({
  users,
  onEdit,
  onDelete,
}) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white py-20 text-center">

  <div className="text-6xl">
    👥
  </div>

  <h2 className="mt-4 text-2xl font-bold">
    No Users Found
  </h2>

  <p className="mt-2 text-gray-500">
    Create your first team member.
  </p>

</div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Role
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => {

            const role = user.role?.name || "";

            return (

              <tr
                key={user.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {user.firstName} {user.lastName}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      role === "ADMIN"
                        ? "bg-red-100 text-red-700"
                        : role === "PROJECT_MANAGER"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {role.replaceAll("_", " ")}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-4">

                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(user)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}

export default UserTable;