import api from "./axios";

export const login = async (username, password) => {
  const response = await api.post("token/", {
    username,
    password,
  });
  return response.data;
};
