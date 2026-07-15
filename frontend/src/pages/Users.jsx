import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user.service";

import UserTable from "../components/user/UserTable";
import UserModal from "../components/user/UserModal";
import DeleteUserModal from "../components/user/DeleteUserModal";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserItem, setDeleteUserItem] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setShowModal(true);
  }

  function handleDelete(user) {
    setDeleteUserItem(user);
    setDeleteModal(true);
  }

  async function handleSave(data) {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success("User updated successfully");
      } else {
        await createUser(data);
        toast.success("User created successfully");
      }

      setShowModal(false);
      setSelectedUser(null);

      await loadUsers();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Failed to save user"
      );
    }
  }

  async function confirmDelete() {
    try {
      await deleteUser(deleteUserItem.id);

      toast.success("User deleted successfully");

      setDeleteModal(false);
      setDeleteUserItem(null);

      await loadUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  }

  if (loading) {
    return (
      <div className="syncro-users flex min-h-[60vh] items-center justify-center">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
            .syncro-users { font-family: 'Inter', sans-serif; }
            .syncro-users h1 { font-family: 'Space Grotesk', sans-serif; }
        `}</style>
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return (
    <div className="syncro-users space-y-6">

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          .syncro-users { font-family: 'Inter', sans-serif; }
          .syncro-users h1 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-semibold text-[#12141C]">
            Users
          </h1>

          <p className="mt-1.5 text-sm text-[#6B7280]">
            Manage system users
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B4A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#F0562F] focus:outline-none focus:ring-4 focus:ring-[#FF6B4A]/25"
        >
          <FaPlus className="text-xs" />

          New User
        </button>

      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-sm sm:p-4">
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <UserModal
        isOpen={showModal}
        initialData={selectedUser}
        onClose={() => {
          setShowModal(false);
          setSelectedUser(null);
        }}
        onSubmit={handleSave}
      />

      <DeleteUserModal
        isOpen={deleteModal}
        user={deleteUserItem}
        onCancel={() => {
          setDeleteModal(false);
          setDeleteUserItem(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
}

export default Users;