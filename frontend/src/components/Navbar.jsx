import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar({ setLoggedIn }) {
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  const linkClasses = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-700"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-screen-xl mx-auto ">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-indigo-700"
          >
            OpenShelf 📚
          </Link>

          {/* Right: Nav Links */}
<div className="flex space-x-2 ml-auto">
  <Link to="/" className={linkClasses("/")}>
    Books
  </Link>
  <Link to="/my-books" className={linkClasses("/my-books")}>
    My Books
  </Link>
</div>


          {/* Right: Logout */}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-500 hover:text-red-600 ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
