import Customer from "./customer.model.tsx";
import Order from "./order.model.tsx";
import Debt from "./debt.model.tsx";

export type DashboardModel = {
    customers: Customer[];
    orders: Order[];
    debts: Debt[];
}
export default DashboardModel;