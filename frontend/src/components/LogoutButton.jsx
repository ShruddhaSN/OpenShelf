import { logout } from "../utils/auth";

function LogoutButton({ setLoggedIn }) {
  const handleLogout = () => {
    logout();
    setLoggedIn(false); // 🔥 UI updates instantly
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
      Logout
    </button>
  );
}

export default LogoutButton;
