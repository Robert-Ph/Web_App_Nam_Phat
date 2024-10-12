import api from "../api/APIConfig";
import Customer from "../model/customer.model";

const BASE_URL = "/customer";

const getCustomerByPhone = async (phone: string) => {
  try {
    const response = await api.get(`${BASE_URL}/search?phone=${phone}`);
    return response.data.data as Customer[];
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Xử lý lỗi tại đây nếu cần thiết
  }
};

const CustomerService = {
  getCustomerByPhone,
};

export default CustomerService;
