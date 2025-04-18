export type Customer = {
  id: number | null;
  fullName: string;
  phone: string;
  email: string | null;
  address: string;
  typeCustomer: string;
  active: boolean;
};
export default Customer;
