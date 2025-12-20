import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        width: "250px",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>{book.title}</h3>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        {book.author}
      </p>

      <Link to={`/books/${book.id}`}>View details</Link>
    </div>
  );
}

export default BookCard;
