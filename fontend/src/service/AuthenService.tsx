import api from "../api/APIConfig";

export const login = async (username: string, password: string) => {
  const response = await api.post("/authen/login", { username, password });
  return response.data;
};
