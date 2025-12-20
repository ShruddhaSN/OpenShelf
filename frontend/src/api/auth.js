import api from "./axios";

export const login = async (username, password) => {
  const response = await api.post("token/", {
    username,
    password,
  });
  return response.data;
};

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("No refresh token");

  const response = await api.post("token/refresh/", {
    refresh,
  });

  return response.data.access;
};
