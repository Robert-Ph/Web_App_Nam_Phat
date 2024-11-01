import api from "../api/APIConfig";
const BASE_URL = "/imports";
const getBySearch = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};
const getById = (id: string) => {
  return api.get(`${BASE_URL}/${id}`);
};

const StockInService = {
  getBySearch,
  getById,
};
export default StockInService;
