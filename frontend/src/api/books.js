import api from "./axios";

export const fetchBooks = async () => {
  const response = await api.get("books/");
  return response.data;
};
