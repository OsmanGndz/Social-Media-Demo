import { FaUserCircle } from "react-icons/fa";
import { api } from "../../lib/axios";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setUsers } from "../../store/features/userSlice";
import type { RootState } from "../../store/store";

interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
}

const UserSelection = () => {
  const [userSelectionOpen, setUserSelectionOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { users, selectedUser } = useSelector((state: RootState) => state.user);

  const fetchUsers = async () => {
    if (
      localStorage.getItem("users") &&
      JSON.parse(localStorage.getItem("users") || "[]").length > 0
    ) {
      const usersFromStorage = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      dispatch(setUsers(usersFromStorage));
      return;
    }
    try {
      const response = await api.get("/users");
      console.log(response.data);
      const users = response.data.map((us: any) => ({
        id: us.id,
        name: us.name,
        userName: us.username,
        email: us.email,
      }));
      dispatch(setUsers(users));
      localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      console.log(users);
      console.log(selectedUser);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setUserSelectionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserSelect = (user: User) => {
    dispatch(setSelectedUser(user.id));
    setUserSelectionOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        onClick={() => {
          setUserSelectionOpen(!userSelectionOpen);
          console.log(userSelectionOpen);
        }}
        className="flex flex-row items-center gap-2 cursor-pointer"
      >
        <FaUserCircle size={32} />
        <p className="font-semibold">{selectedUser.name ? selectedUser.name : "Select user"}</p>
        {userSelectionOpen ? (
          <IoMdArrowDropup size={20} />
        ) : (
          <IoMdArrowDropdown size={20} />
        )}
      </button>
      {userSelectionOpen && (
        <div className="bg-gray-100 absolute w-[250px] right-0 top-full shadow-md p-4 h-40 overflow-y-scroll z-10 scroll-smooth rounded-md">
          {users && users.length > 0 && (
            <ul>
              {users.map((u: any) => (
                <li
                  key={u.id}
                  className={`p-2 hover:bg-gray-200 hover:text-black cursor-pointer rounded-md ${
                    u.id === selectedUser.id ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() =>
                    handleUserSelect({
                      id: u.id,
                      name: u.name,
                      userName: u.userName,
                      email: u.email,
                    })
                  }
                >
                  {u.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSelection;
