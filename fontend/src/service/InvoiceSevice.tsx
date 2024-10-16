import api from "../api/APIConfig";
import Customer from "../model/customer.model";

const BASE_URL = "/invoices";

const getBySearch = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};

const dowloadFile = (id: Number) => {
  return api.get(`${BASE_URL}/dowload/${id}`, {
    responseType: "blob", // Set response type to 'blob' to handle binary data
  });
};
const InvoiceService = {
  getBySearch,
  dowloadFile,
};

export default InvoiceService;