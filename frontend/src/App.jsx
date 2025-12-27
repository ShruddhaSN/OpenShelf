import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated } from "./utils/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import BooksList from "./components/BooksList";
import BookDetail from "./pages/BookDetail";
import MyBooks from "./pages/MyBooks";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  return (
    <Routes>
      {/* Auth pages — NO navbar */}
      <Route
        path="/login"
        element={<Login setLoggedIn={setLoggedIn} />}
      />
      <Route path="/register" element={<Register />} />

      {/* App pages — WITH navbar */}
      <Route
        path="/*"
        element={
          loggedIn ? (
            <div className="min-h-screen bg-gray-200">
              <Navbar setLoggedIn={setLoggedIn} />
              <main className="max-w-screen-xl mx-auto py-8">
                <Routes>
                  <Route path="/" element={<BooksList />} />
                  <Route path="/books/:id" element={<BookDetail />} />
                  <Route path="/my-books" element={<MyBooks />} />
                </Routes>
              </main>
            </div>
          ) : (
            <Login setLoggedIn={setLoggedIn} />
          )
        }
      />
    </Routes>
  );
}

export default App;
