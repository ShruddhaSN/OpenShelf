import { useEffect, useState } from "react";
import { fetchBooks } from "../api/books";
import { Link } from "react-router-dom";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              <strong>{book.title}</strong> — {book.author}
            </Link>
          </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BooksList;
