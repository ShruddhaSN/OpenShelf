import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import BooksList from "./components/BooksList";
import Login from "./pages/Login";
import LogoutButton from "./components/LogoutButton";
import BookDetail from "./pages/BookDetail";
import { isAuthenticated } from "./utils/auth";
import MyBooks from "./pages/MyBooks";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  return (
    <div style={{ padding: "2rem" }}>
      <h1>OpenShelf 📚</h1>
      <p>Digital Library Platform</p>

      {loggedIn ? (
        <>
          <LogoutButton setLoggedIn={setLoggedIn} />
          <Link to="/my-books">My Books</Link>

          <Routes>
            <Route path="/" element={<BooksList />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/my-books" element={<MyBooks />} />
          </Routes>
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
