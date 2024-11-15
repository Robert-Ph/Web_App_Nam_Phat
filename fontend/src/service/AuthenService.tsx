import api from "../api/APIConfig";

export const login = async (username: string, password: string) => {
  const response = await api.post("/authen/login", { username, password });
  return response.data;
};

export const logout = async (token: string | undefined) => {
  const response = await api.post("/authen/logout", { token });
  return response.data;
};
