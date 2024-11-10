import OrderItem from "./orderItem.model";
import Customer from "./customer.model";

type Order = {
  id: number | null;
  pay: boolean | null;
  totalPrice: number | null;
  status: string | null;
  dateCreate: string | null;
  dateShip: string | null;
  nameCustomer: string | null | Customer;
  vat: number;
  typeOrder: string;
  address: string;
  phone: string;
  orderItems: OrderItem[];
  comments:string;
  discount: number;
};

export default Order;
