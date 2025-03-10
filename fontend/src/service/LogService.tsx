import api from "../api/APIConfig";
// import Order from "../model/order.model";

const BASE_URL = "/logs";

const getAll = (page: number, size: number) => {
  return api.get(`${BASE_URL}?page=${page}&size=${size}`);
};

const LogService = {
  getAll,
};
export default LogService;
