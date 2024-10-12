import OrderItem from "./orderItem.model";

type Order = {
  id: number | null;
  isPay: boolean | null;
  totalPrice: number | null;
  status: string | null;
  dateCreate: string | null;
  dateShip: string | null;
  nameCustomer: string | null;
  vat: number;
  typeOrder: string;
  address: string;
  phone: string;
  orderItems: OrderItem[];
};

export default Order;
