import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadBook = async () => {
    try {
      // Load book
      const response = await api.get(`books/${id}/`);
      setBook(response.data);

      // Load user's reading status
      const statusRes = await api.get("my-books/");
      const existing = statusRes.data.find(
        (item) => item.book.id === response.data.id
      );

      if (existing) {
        setStatus(existing.status);
      } else {
        setStatus(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  loadBook();
}, [id]);

  const updateStatus = async (newStatus) => {
  try {
    setSaving(true);

    const res = await api.post("reading-status/", {
      book: book.id,
      status: newStatus,
    });

    setStatus(res.data.status);
  } catch (err) {
    console.error(
      "Failed to update status",
      err.response?.data || err
    );
  } finally {
    setSaving(false);
  }
};



  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <p>Loading book...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
        >
          ← Back
        </button>
      </div>



      <div className="mt-6 bg-white rounded-xl border shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {book.title}
        </h1>

        <p className="text-lg text-gray-600 mb-4">
          {book.author}
        </p>

        {book.description && (
          <p className="text-gray-700 mb-6">
            {book.description}
          </p>
        )}
        <div className="flex gap-3 mt-6 py-2">
  {["reading", "read", "not_read"].map((s) => {
    const isActive = status === s;

    return (
      <button
        key={s}
        onClick={() => updateStatus(s)}
        disabled={saving}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          isActive
            ? s === "read"
              ? "bg-green-600 text-white"
              : s === "reading"
              ? "bg-yellow-500 text-white"
              : "bg-gray-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {s.replace("_", " ")}
      </button>
    );
  })}
</div>



        {book.pdf && (
          <a
            href={book.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Read PDF
          </a>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
