import { SlMenu } from "react-icons/sl";
import UserSelection from "./userSelection";
import { Link } from "react-router-dom";

const Navbar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="h-20 shadow-lg sticky flex flex-row items-center px-16 justify-between">
      <Link to="/" className="font-bold text-xl">
        SOCIAL MEDIA
      </Link>
      <div className="hidden md:flex flex-row items-center gap-4">
        <Link
          to="/users"
          className="w-full bg-blue-500 p-2 text-white rounded-md cursor-pointer hover:scale-104 
          transition duration-500 text-center"
        >
          Users
        </Link>
        <Link
          to="/posts"
          className="w-full bg-blue-500 p-2 text-white rounded-md cursor-pointer hover:scale-104 transition duration-500 text-center"
        >
          Posts
        </Link>
        <div className="w-full">
          <UserSelection />
        </div>
      </div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden cursor-pointer"
      >
        <SlMenu size={20} />
      </button>
    </div>
  );
};

export default Navbar;
