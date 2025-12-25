import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="
        bg-white
        rounded-xl
        border border-gray-200
        shadow-md
        hover:shadow-lg
        hover:-translate-y-1
        transition
        p-5        
      ">
        
      <h3 style={{ marginBottom: "0.25rem" }}>{book.title}</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        {book.author}
      </p>


      <Link
        to={`/books/${book.id}`}
        className="text-indigo-600 text-sm font-medium hover:underline cursor-pointer"
      >View details</Link>
    </div>
  );
}

export default BookCard;
