import api from "../api/APIConfig";
import { Customer } from "../model/customer.model";

const BASE_URL = "/customer";

const getCustomerByPhone = async (phone: string) => {
  try {
    const response = await api.get(`${BASE_URL}/search?phone=${phone}`);
    return response.data.data as Customer[];
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Xử lý lỗi tại đây nếu cần thiết
  }
};
const getByFilter = (page: number, size: number, filter: string) => {
  return api.get(`${BASE_URL}/list?page=${page}&size=${size}&filter=${filter}`);
};
const create = (customer: Customer) => {
  return api.post(`${BASE_URL}`, customer);
};
const getById = (id: number | undefined | string) => {
  return api.get(`${BASE_URL}/${id}`);
};
const getByIdListOrder = (id: number | undefined | string) => {
  return api.get(`${BASE_URL}/history/${id}`);
};
const update=(id: number, customer: Customer) => {
  return api.put(`${BASE_URL}/${id}`, customer);
}

const block = (id: number) => {
  return api.put(`${BASE_URL}/block/${id}`);
}

const unblock = (id: number) => {
  return api.put(`${BASE_URL}/unblock/${id}`);
}
const CustomerService = {
  getCustomerByPhone,
  getByFilter,
  create,
  getById,
  getByIdListOrder,
  update,
  block,
  unblock,
};

export default CustomerService;
