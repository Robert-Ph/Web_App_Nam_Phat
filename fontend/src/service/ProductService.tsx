import api from "../api/APIConfig";
import product from "../model/product.model";

const BASE_URL = "/products";
const update = (employee: product, id: number) => {
  return api.put(`${BASE_URL}/${id}`, employee);
};

const getById = (id: string) => {
  return api.get(`${BASE_URL}/${id}`);
};

const ProductService = {
  update,
  getById,
};
export default ProductService;
