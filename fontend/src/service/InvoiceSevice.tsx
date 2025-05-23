import api from "../api/APIConfig";


const BASE_URL = "/invoices";

const getBySearch = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};

const dowloadFile = (id: number) => {
  return api.get(`${BASE_URL}/dowload/${id}`, {
    responseType: "blob", // Set response type to 'blob' to handle binary data
  });
};
const seenFile = (id: number) => {
  return api.get(`${BASE_URL}/seen/${id}`, {
    responseType: "blob", // Set response type to 'blob' to handle binary data
  });
};
const  update = (id: number) => {
  return api.put(`${BASE_URL}/update/${id}`, {
    responseType: "blob", // Set response type to 'blob' to handle binary data
  });
}
const InvoiceService = {
  getBySearch,
  dowloadFile,
  seenFile,
  update,
};

export default InvoiceService;
