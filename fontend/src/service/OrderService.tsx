import api from "../api/APIConfig";
import Order from "../model/order.model";

const BASE_URL = "/orders";

const create = (order: Order) => {
  return api.post(`${BASE_URL}`, order);
};

const getAll = (page: number, size: number) => {
  return api.get(`${BASE_URL}?page=${page}&size=${size}`);
};
const OrderService = {
  create,
  getAll,
};

export default OrderService;
