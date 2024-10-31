import api from "../api/APIConfig";

const BASE_URL = "/dashboard";

// const getTotalCustomer = async () => {
//     try {
//         const response = await api.get<number>(`${BASE_URL}/totalcustomer`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching total customers:", error);
//         throw error;
//     }
// };
//
// const getTotalOrder = async () => {
//     try {
//         const response = await api.get<number>(`${BASE_URL}/totalpriceorder`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching total orders:", error);
//         throw error;
//     }
// };
//
// const getTotalDebt = async () => {
//     try {
//         const response = await api.get<number>(`${BASE_URL}/totalpricedebt`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching total debt:", error);
//         throw error;
//     }
// };
const getDashboard = () => {
    return api.get(
        `${BASE_URL}`);
};
const DashboardService = {
    getDashboard,
    // getTotalCustomer,
    // getTotalOrder,
    // getTotalDebt,
};

export default DashboardService;
