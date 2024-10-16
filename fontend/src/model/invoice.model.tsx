type Invoices = {
  id: number;
  orderId: number;
  dateCreate: string | null;
  priceNeedPay: number;
  nameCustomer: string;
};

export default Invoices;
