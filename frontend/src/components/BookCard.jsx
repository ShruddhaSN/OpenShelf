import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col h-full">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {book.author}
          </p>
        </div>

        {/* Status badge (optional if available) */}
        {book.status && (
          <span
            className={`inline-block w-fit px-2 py-1 mb-3 rounded text-xs font-medium ${
              book.status === "read"
                ? "bg-green-100 text-green-700"
                : book.status === "reading"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {book.status.replace("_", " ")}
          </span>
        )}

        <div className="mt-auto">
          <Link
            to={`/books/${book.id}`}
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
}
