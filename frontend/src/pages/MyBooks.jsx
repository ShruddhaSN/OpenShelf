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
        console.error("Failed to load my books", err);
      } finally {
        setLoading(false);
      }
    };

    loadMyBooks();
  }, []);

  if (loading) return <p>Loading your books...</p>;

  // ✅ Always-defined grouped object
  const grouped = {
    reading: [],
    read: [],
  };

  // Fill groups safely
 items.forEach((item) => {
  if (item.status === "reading" || item.status === "read") {
    grouped[item.status].push(item.book);
  }
});


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        My Books
      </h2>

      {Object.entries(grouped).map(([status, books]) => (
        <div key={status} className="mb-10">
          {/* Section title */}
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-semibold capitalize">
              {status.replace("_", " ")}
            </h3>

            <span className="text-sm text-gray-500">
              ({books.length})
            </span>
          </div>

          {/* Empty state */}
          {books.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No books here yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {book.title}
                  </h4>

                  <p className="text-sm text-gray-500 mb-3">
                    {book.author}
                  </p>

                  {/* Status badge
                  <span
                    className={`inline-block mb-4 px-2 py-1 rounded text-xs font-medium ${
                      status === "reading"
                        ? "bg-yellow-100 text-yellow-700"
                        : status === "read"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {status.replace("_", " ")}
                  </span> */}

                  <div>
                    <Link
                      to={`/books/${book.id}`}
                      className="text-indigo-600 text-sm font-medium hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBooks;
