type OrderItem = {
  id: number | null;
  nameProduct: string;
  typeProduct: string;
  unitProduct: string;
  heightProudct: number;
  widthProduct: number;
  depthProduct: number;
  quanlityProduct: number;
  typePaper: string;
  qualityPaper: number;
  unitPaper: string;
  heightPaper: number;
  widthPaper: number;
  laminnation: string;
  cradle: boolean;
  cut: boolean;
  pricePerOne: number;
  mode: string;
};

export default OrderItem;
