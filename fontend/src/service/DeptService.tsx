import api from "../api/APIConfig";


const BASE_URL = "/debt";

// const getCustomerByPhone = async (phone: string) => {
//     try {
//         const response = await api.get(`${BASE_URL}/search?phone=${phone}`);
//         return response.data.data as Dept[];
//     } catch (error) {
//         console.error("Error fetching customers:", error);
//         throw error; // Xử lý lỗi tại đây nếu cần thiết
//     }
// };
// const getByFilter = (page: number, size: number, filter: string) => {
//     return api.get(
//         `${BASE_URL}/list?page=${page}&size=${size}&filter=${filter}`
//     );
// };
// const create = (dept: Dept) => {
//     return api.post(`${BASE_URL}`, dept);
// };
const getById = (id: number | undefined | string) => {
    return api.get(`${BASE_URL}/detail/${id}`);
};
const getByIdList = () => {
    return api.get(
        `${BASE_URL}`);
};
const DeptService = {
    // getCustomerByPhone,
    // getByFilter,
    // create,
    getById,
    getByIdList,
    // getCustomerByPhone,
};

export default DeptService;
