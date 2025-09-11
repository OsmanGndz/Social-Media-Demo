import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import type { RootState } from "./store/store";
import { useEffect } from "react";
import { setSelectedUser, setUsers } from "./store/features/userSlice";
import { api } from "./lib/axios";
import { FaUserCircle } from "react-icons/fa";
import { setUserPosts } from "./store/features/postSlice";

function App() {
  const { selectedUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state: RootState) => state.post);

  const fetchPosts = async (userId: string) => {
    try {
      const storedPosts = localStorage.getItem("userPosts");
      const parsedStoredPosts = storedPosts ? JSON.parse(storedPosts) : [];

      if (
        parsedStoredPosts.length > 0 &&
        parsedStoredPosts[0]?.userId === userId
      ) {
        dispatch(setUserPosts(parsedStoredPosts));
        return;
      }

      // Değilse API'dan yeni postları getir
      const response = await api.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      dispatch(setUserPosts(response.data));
      localStorage.setItem("userPosts", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("users")) {
      const usersFromStorage = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      dispatch(setUsers(usersFromStorage));
    }

    if (localStorage.getItem("selectedUser")) {
      const userFromStorage = JSON.parse(
        localStorage.getItem("selectedUser") || "{}"
      );
      dispatch(setSelectedUser(userFromStorage.id));
      if (userFromStorage.id) {
        fetchPosts(userFromStorage.id);
      }
    }
  }, []);

  useEffect(() => {
    fetchPosts(selectedUser.id);
  }, [selectedUser]);

  return (
    <div className="flex flex-row w-full gap-16">
      <section className="w-3/4">
        <ul className="flex flex-col gap-8 w-full">
          {userPosts.map((post: any) => (
            <li
              key={post.id}
              className="border border-gray-100 p-8 shadow-md rounded-md bg-white flex flex-col gap-4 w-full"
            >
              <div className="flex flex-row items-center gap-4 font-semibold text-lg">
                <FaUserCircle size={40} className="" />
                {post.userId} - {selectedUser.name}
              </div>
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p>{post.body}</p>
              <img
                className="w-full object-cover"
                src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9zdHxlbnwwfHwwfHx8MA%3D%3D"
                alt="post image"
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="w-1/4 flex flex-col shadow-md py-4 px-4 rounded-md border border-gray-100 gap-4 h-fit">
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
            <p>{selectedUser.email}</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
