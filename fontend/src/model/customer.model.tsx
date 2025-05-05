export type Customer = {
  id: number | null;
  fullName: string;
  phone: string;
  email: string | null;
  tax: string | null;
  address: string | null;
  typeCustomer: string;
  active: boolean;
};
export default Customer;
