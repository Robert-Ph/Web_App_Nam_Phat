import product from "./product.model";

type Inventory = {
  id: number | null;
  product: product;
  quanlity: number;
  lastDateIn: string;
};

export default Inventory;
