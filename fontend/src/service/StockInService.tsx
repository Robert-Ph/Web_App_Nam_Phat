import api from "../api/APIConfig";
import StockIn from "../model/stockin.model";

const BASE_URL = "/imports";
const getBySearch = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};
const getById = (id: string) => {
  return api.get(`${BASE_URL}/${id}`);
};
const sendStockInRequest = async (stockIn: StockIn, file: File) => {
  const data = new FormData();

  data.append("file", file);

  // Append JSON data
  data.append(
    "request",
    JSON.stringify({
      id: stockIn.id,
      dateCreate: stockIn.dateCreate,
      supplier: stockIn.supplier,
      totalPrice: stockIn.totalPrice,
      listStockInDetails: stockIn.listStockInDetails,
    })
  );

  return await api.post(BASE_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data", // cần thiết để axios gửi FormData
    },
  });
};

const StockInService = {
  getBySearch,
  getById,
  sendStockInRequest,
};
export default StockInService;
