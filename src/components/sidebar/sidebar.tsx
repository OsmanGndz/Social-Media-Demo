import { useState } from "react";
import { FaUser, FaCog } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Modal from "../modal/modal";
import { setSelectedUser } from "../../store/features/userSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const menuItems = [
    { title: "Profil", icon: <FaUser /> },
    { title: "Ayarlar", icon: <FaCog /> },
  ];
  const [userSelectionModalOpen, setUserSelectionModalOpen] = useState(false);
  const { users, selectedUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleUserSelect = (userId: string) => {
    dispatch(setSelectedUser(userId));
    setUserSelectionModalOpen(false);
  };

  return (
    <div className="w-full">
      {/* Overlay - sadece mobilde ve sidebar açıkken görünür */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-[70%] bg-white
          transform transition-transform duration-300 ease-in-out md:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          
        `}
      >
        <div className="w-full">
          <div className="text-xl font-bold mb-6 h-20 shadow-md flex items-center px-8 justify-between">
            <h2 className="">Social Media</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <MdCancel size={24} />
            </button>
          </div>
          <ul className="space-y-4 px-8 w-full">
            <li key="profile" className="w-full">
              <button
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
                onClick={() => {
                  setUserSelectionModalOpen(true);
                }}
              >
                <span className="text-xl">{menuItems[0].icon}</span>
                <span>{selectedUser.name}</span>
                <IoMdArrowDropdown size={20} />
              </button>
            </li>
            <li className="w-full">
              <Link
                onClick={() => setSidebarOpen(false)}
                to="/users"
                className="w-full block bg-blue-500 p-2 text-white rounded-md cursor-pointer hover:scale-104 
          transition duration-500 text-center"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setSidebarOpen(false)}
                to="/posts"
                className="w-full block bg-blue-500 p-2 text-white rounded-md cursor-pointer hover:scale-104 transition duration-500 text-center"
              >
                Posts
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-4 h-fit mt-8 px-8 w-full" >
            <h2 className="font-bold text-xl text-center">User Information</h2>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-row gap-2">
                <p className="font-semibold">ID:</p>
                <p>{selectedUser.id}</p>
              </li>
              <li className="flex flex-row gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedUser.name}</p>
              </li>
              <li className="flex flex-row gap-2">
                <p className="font-semibold">Username:</p>
                <p>{selectedUser.userName}</p>
              </li>
              <li className="flex flex-row gap-2">
                <p className="font-semibold">Email:</p>
                <p className="truncate max-w-[200px]">{selectedUser.email}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        isOpen={userSelectionModalOpen}
        onClose={() => setUserSelectionModalOpen(false)}
        title="Select User"
        scrollable={true}
      >
        <div className="flex flex-col gap-4">
          {users && users.length > 0 && (
            <ul className="flex flex-col gap-2">
              {users.map((u: any) => (
                <li
                  key={u.id}
                  onClick={() => {
                    handleUserSelect(u.id);
                    setSidebarOpen(false);
                  }}
                  className={`${
                    u.id === selectedUser.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  } p-2 rounded-md cursor-pointer`}
                >
                  {u.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
