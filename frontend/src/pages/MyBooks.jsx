import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function MyBooks() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyBooks = async () => {
      try {
        const response = await api.get("my-books/");
        setItems(response.data);
      } catch (err) {
        console.error("Failed to load my books");
      } finally {
        setLoading(false);
      }
    };

    loadMyBooks();
  }, []);

  if (loading) return <p>Loading your books...</p>;

  const grouped = {
    reading: [],
    read: [],
    not_read: [],
  };

  items.forEach((item) => {
    grouped[item.status]?.push(item.book);
  });

  return (
    <div>
      <h2>My Books</h2>

      {Object.entries(grouped).map(([status, books]) => (
        <div key={status} style={{ marginBottom: "1.5rem" }}>
          <h3>{status.replace("_", " ").toUpperCase()}</h3>

          {books.length === 0 ? (
            <p>No books</p>
          ) : (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {books.map((book) => (
                    <Link key={book.id} to={`/books/${book.id}`}>
                    {book.title}
                    </Link>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBooks;
