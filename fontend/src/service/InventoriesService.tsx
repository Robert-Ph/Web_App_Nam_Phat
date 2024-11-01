import api from "../api/APIConfig";

const BASE_URL = "/inventory";
const getBySearch = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};
const getById = (id: number | undefined | string) => {
  return api.get(`${BASE_URL}/${id}`);
};
const InventoryService = {
  getBySearch,
  getById,
};

export default InventoryService;
