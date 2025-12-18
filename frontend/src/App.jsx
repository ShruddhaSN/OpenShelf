import { useState } from "react";
import BooksList from "./components/BooksList";
import Login from "./pages/Login";
import LogoutButton from "./components/LogoutButton";
import { isAuthenticated } from "./utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  return (
    <div style={{ padding: "2rem" }}>
      <h1>OpenShelf 📚</h1>
      <p>Digital Library Platform</p>

      {loggedIn ? (
        <>
          <LogoutButton setLoggedIn={setLoggedIn} />
          <BooksList />
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
