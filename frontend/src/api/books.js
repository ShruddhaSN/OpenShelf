import api from "./axios";

export const fetchBooks = async () => {
  const response = await api.get("books/");
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await api.get(`books/${id}/`);
  return response.data;
};

export const updateReadingStatus = async (bookId, status) => {
  const response = await api.post("reading-status/", {
    book: bookId,
    status: status,
  });
  return response.data;
};
