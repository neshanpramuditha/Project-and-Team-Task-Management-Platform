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
      <div className="mt-20 text-center text-lg">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Users
          </h1>

          <p className="mt-2 text-gray-500">
            Manage system users
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FaPlus />

          New User
        </button>

      </div>

      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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