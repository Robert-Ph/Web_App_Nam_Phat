import product from "./product.model";
type StockOut = {
  id?: number | null;
  productId?: number | null;
  product?: product;
  quantity: number;
  dateCreate?: string;
  reson: string;
};
export default StockOut;
