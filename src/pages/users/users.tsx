import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FaUserCircle, FaEnvelope, FaUser, FaTrashAlt } from "react-icons/fa";
import {
  addNewUser,
  deleteUser,
  updateUser,
} from "../../store/features/userSlice";
import { useState } from "react";
import Modal from "../../components/modal/modal";
import { FaPencil } from "react-icons/fa6";

const Users = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    userName: "",
    email: "",
  });
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);

  const [updateUserData, setUpdateUserData] = useState({
    id: "",
    name: "",
    userName: "",
    email: "",
  });

  const handleAddNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.id && newUser.name && newUser.userName && newUser.email) {
      dispatch(
        addNewUser({
          id: newUser.id,
          name: newUser.name,
          userName: newUser.userName,
          email: newUser.email,
        })
      );
      setNewUser({ id: "", name: "", userName: "", email: "" });
      setOpenAddUserModal(false);
    }
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const handleUpdateUserModal = (userId: string) => {
    setOpenUpdateUserModal(true);
    const user = users.find((u) => u.id === userId);
    console.log(user);
    setUpdateUserData({
      id: userId,
      name: user?.name || "",
      userName: user?.userName || "",
      email: user?.email || "",
    });
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      updateUserData.id &&
      updateUserData.name &&
      updateUserData.userName &&
      updateUserData.email
    ) {
      dispatch(updateUser(updateUserData));
      setUpdateUserData({ id: "", name: "", userName: "", email: "" });
      setOpenUpdateUserModal(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <header className="mb-8 flex flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Users</h2>
          <p className="text-gray-600 mt-2">Total users: {users.length}</p>
        </div>
        <button
          onClick={() => setOpenAddUserModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 cursor-pointer"
        >
          Add New User
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-none bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex gap-4">
                  <FaUserCircle className="w-12 h-12 text-gray-600" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-gray-500 text-sm">ID: {user.id}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  <button
                    onClick={() => handleUpdateUserModal(user.id)}
                    className="p-2 bg-yellow-500 rounded-full hover:scale-104 duration-500 cursor-pointer"
                  >
                    <FaPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 bg-red-500 rounded-full hover:scale-104 duration-500 cursor-pointer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUser className="w-4 h-4" />
                  <span>{user.userName}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
      <Modal
        isOpen={openAddUserModal}
        onClose={() => setOpenAddUserModal(false)}
        title="Add New User"
      >
        <form
          action="submit"
          onSubmit={handleAddNewUser}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="id">Id</label>
            <input
              type="number"
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
              placeholder="id"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="name"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
              placeholder="username"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="email"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 cursor-pointer">
            Add user
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={openUpdateUserModal}
        onClose={() => setOpenUpdateUserModal(false)}
        title="Update User"
      >
        <form
          action="submit"
          onSubmit={handleUpdateUser}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="id">Id</label>
            <input
              type="number"
              value={updateUserData.id}
              placeholder="id"
              className="border border-gray-500 rounded-md py-2 px-4"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, name: e.target.value })
              }
              value={updateUserData.name}
              placeholder="name"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={(e) =>
                setUpdateUserData({
                  ...updateUserData,
                  userName: e.target.value,
                })
              }
              value={updateUserData.userName}
              placeholder="username"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, email: e.target.value })
              }
              value={updateUserData.email}
              placeholder="email"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 cursor-pointer">
            Update user
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
