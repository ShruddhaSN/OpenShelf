import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookById, updateReadingStatus } from "../api/books";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingStatus, setReadingStatus] = useState("");
  const [saving, setSaving] = useState(false);


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
  const handleStatusChange = async (status) => {
    try {
      setSaving(true);
      await updateReadingStatus(book.id, status);
      setReadingStatus(status);
    } catch (err) {
      alert("Failed to update reading status");
    } finally {
      setSaving(false);
    }
  };


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

      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Your status:</strong>{" "}
          {readingStatus ? readingStatus : "Not set"}
        </p>

        <button
          onClick={() => handleStatusChange("reading")}
          disabled={saving}
        >
          Reading
        </button>

        <button
          onClick={() => handleStatusChange("read")}
          disabled={saving}
          style={{ marginLeft: "0.5rem" }}
        >
          Read
        </button>

        <button
          onClick={() => handleStatusChange("not_read")}
          disabled={saving}
          style={{ marginLeft: "0.5rem" }}
        >
          Not Read
        </button>
      </div>

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
