import StockInDetail from "./stockInDetail.model";

type StockIn = {
  id: number;

  dateCreate: string;

  supplier: string;

  totalPrice: number;

  imageInvoice: string;
  listStockInDetails: StockInDetail[] | null | [];
};

export default StockIn;
