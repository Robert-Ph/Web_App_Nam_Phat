type account = {
  id: number | null;
  employeeId: number;
  username: string;
  permission: string;
  dateCreate: string | null;
  status: boolean;
  password: string | null;
};
export default account;
