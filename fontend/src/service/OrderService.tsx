import api from "../api/APIConfig";
import Order from "../model/order.model";

const BASE_URL = "/orders";

const create = (order: Order) => {
  return api.post(`${BASE_URL}`, order);
};

const getAll = (page: number, size: number) => {
  return api.get(`${BASE_URL}?page=${page}&size=${size}`);
};

const getBySearchAndFilter = (
  page: number,
  size: number,
  filter: string,
  type: string
) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&type=${type}&filter=${filter}`
  );
};

const getById = (id: string) => {
  return api.get(`${BASE_URL}/${id}`);
};

const update = (id: number, update: Order) => {
  return api.put(`${BASE_URL}/${id}`, update);
};

export const updateIspay = (id: number | null) => {
  return api.put(`${BASE_URL}/ispay/${id}`);
};
export const updateStatusFis = (id: number | null) => {
  return api.put(`${BASE_URL}/status-fis/${id}`);
};
export const updateStatusCan = (id: number | null) => {
  return api.put(`${BASE_URL}/status-can/${id}`);
};
export const updateStatusDevi = (id: number | null) => {
  return api.put(`${BASE_URL}/status-devi/${id}`);
};
const OrderService = {
  create,
  getAll,
  getBySearchAndFilter,
  getById,
  update,
  updateIspay,
  updateStatusFis,
  updateStatusCan,
  updateStatusDevi,
};

export default OrderService;
