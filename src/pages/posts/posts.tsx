import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import {
  addNewPost,
  deletePost,
  setPosts,
  updatePost,
} from "../../store/features/postSlice";
import Modal from "../../components/modal/modal";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsFileEarmarkPost } from "react-icons/bs";
import { MdContentPaste, MdOutlineTitle } from "react-icons/md";

interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const Posts = () => {
  const { posts } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    userId: "",
    title: "",
    body: "",
  });
  const [openUpdatePostModal, setOpenUpdatePostModal] = useState(false);
  const [updatePostData, setUpdatePostData] = useState<Post>({
    id: "",
    userId: "",
    title: "",
    body: "",
  });

  const fetchPosts = async () => {
    try {
      const response = await api.get("posts");
      console.log("posts:", response.data);
      dispatch(setPosts(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("posts")) {
      return;
    }
    fetchPosts();
  }, []);

  const handleAddNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addNewPost(newPost));
    setOpenAddPostModal(false)
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deletePost(id));
  };

  const handleUpdatePostModal = (id: string) => {
    setOpenUpdatePostModal(true);
    const updatePost = posts.find((p: Post) => p.id == id);
    setUpdatePostData({
      id: updatePost.id || "",
      userId: updatePost.userId || "",
      title: updatePost.title || "",
      body: updatePost.body || "",
    });
  };

  const handleUpdatePost = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(updatePost(updatePostData));
    setOpenUpdatePostModal(false);
  };

  return (
    <div>
      <header className="mb-8 flex flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Posts</h2>
          <p className="text-gray-600 mt-2">Total posts: {posts.length}</p>
        </div>
        <button
          onClick={() => setOpenAddPostModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 cursor-pointer"
        >
          Add New Post
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post: any) => (
          <li
            key={post.id}
            className="list-none bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex gap-4">
                  <BsFileEarmarkPost className="w-12 h-12 text-gray-600" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      Post Id: {post.id}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      user Id: {post.userId}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  <button
                    onClick={() => handleUpdatePostModal(post.id)}
                    className="p-2 bg-yellow-500 rounded-full hover:scale-104 duration-500 cursor-pointer"
                  >
                    <FaPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(post.id)}
                    className="p-2 bg-red-500 rounded-full hover:scale-104 duration-500 cursor-pointer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MdOutlineTitle className="w-16 h-16" />
                  <span className="font-semibold">{post.title}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MdContentPaste className="w-20 h-20" />
                  <span>{post.body}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>

      <Modal
        isOpen={openAddPostModal}
        onClose={() => setOpenAddPostModal(false)}
        title="Add New Post"
      >
        <form
          action="submit"
          onSubmit={handleAddNewPost}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="id">Id</label>
            <input
              name="id"
              type="number"
              onChange={(e) => setNewPost({ ...newPost, id: e.target.value })}
              placeholder="id"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="userId">User Id</label>
            <input
              name="userId"
              type="number"
              onChange={(e) =>
                setNewPost({ ...newPost, userId: e.target.value })
              }
              placeholder="User id"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              placeholder="Title"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="body">Body</label>
            <input
              name="body"
              type="text"
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              placeholder="Body"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 cursor-pointer">
            Add Post
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={openUpdatePostModal}
        onClose={() => setOpenUpdatePostModal(false)}
        title="Update Post"
      >
        <form
          action="submit"
          onSubmit={handleUpdatePost}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="id">Id</label>
            <input
              name="id"
              type="number"
              value={updatePostData.id}
              placeholder="id"
              className="border border-gray-500 rounded-md py-2 px-4"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="userId">User Id</label>
            <input
              name="userId"
              type="text"
              onChange={(e) =>
                setUpdatePostData({ ...updatePostData, userId: e.target.value })
              }
              value={updatePostData.userId}
              placeholder="user Id"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              onChange={(e) =>
                setUpdatePostData({
                  ...updatePostData,
                  title: e.target.value,
                })
              }
              value={updatePostData.title}
              placeholder="Title"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="body">Body</label>
            <input
              type="text"
              onChange={(e) =>
                setUpdatePostData({ ...updatePostData, body: e.target.value })
              }
              value={updatePostData.body}
              placeholder="Body"
              className="border border-gray-500 rounded-md py-2 px-4"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 cursor-pointer">
            Update Post
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Posts;
