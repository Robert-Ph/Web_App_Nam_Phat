import api from "../api/APIConfig";
import StockOut from "../model/stockOut.model";
const BASE_URL = "/exports";

const getBySearch = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};

const create = (stockOut: StockOut) => {
  return api.post(`${BASE_URL}`, stockOut);
};

const StockOutService = {
  getBySearch,
  create,
};

export default StockOutService;
