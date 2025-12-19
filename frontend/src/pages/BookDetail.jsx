import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookById } from "../api/books";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) return <p>Loading book...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <Link to="/">← Back to books</Link>

      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>

      {book.description && (
        <p><strong>Description:</strong> {book.description}</p>
      )}

      {book.pdf && (
        <p>
          <a href={book.pdf} target="_blank" rel="noreferrer">
            📄 Open PDF
          </a>
        </p>
      )}
    </div>
  );
}

export default BookDetail;
