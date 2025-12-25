import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated } from "./utils/auth";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import BooksList from "./components/BooksList";
import BookDetail from "./pages/BookDetail";
import MyBooks from "./pages/MyBooks";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  // 🔴 IMPORTANT: Login has NO app layout
  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  // ✅ App layout only for logged-in users
  return (
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
  );
}

export default App;
