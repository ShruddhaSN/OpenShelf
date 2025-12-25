import { useEffect, useState } from "react";
import { fetchBooks } from "../api/books";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

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
    <h2 className="text-2xl font-semibold mb-6">
      Available Books
    </h2>

    {books.length === 0 ? (
      <p className="text-gray-500">No books found.</p>
    ) : (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    )}
  </div>
);

}

export default BooksList;
