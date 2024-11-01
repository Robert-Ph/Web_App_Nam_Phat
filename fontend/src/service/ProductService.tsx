import api from "../api/APIConfig";
import product from "../model/product.model";

const BASE_URL = "/products";
const update = (employee: product, id: number) => {
  return api.put(`${BASE_URL}/${id}`, employee);
};

const ProductService = {
  update,
};
export default ProductService;
