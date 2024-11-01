import product from "./product.model";

type StockInDetail = {
  productId: number | null;
  product: product;

  quanlity: number;

  priceImport: number;
};

export default StockInDetail;
