import OrderItem from "./orderItem.model";
import Customer from "./customer.model";

type Order = {
  id: number | null;
  pay: boolean | null;
  totalPrice: number | null;
  status: string | null;
  dateCreate: string | null;
  dateShip: string | null;
  datePayment: string | null;
  nameCustomer: string | null | Customer;
  vat: number;
  reduce: number | null;
  typeOrder: string;
  address: string;
  phone: string;
  cusomerNameNew: string | null;
  newCustomer: boolean | null;
  orderItems: OrderItem[];
};

export default Order;
