import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

function Navbar({ setLoggedIn }) {
  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "1.5rem",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "1rem" }}>
          OpenShelf
        </Link>
        <Link to="/my-books">My Books</Link>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
