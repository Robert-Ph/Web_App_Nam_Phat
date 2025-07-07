import api from "../../api/APIConfig";
import TypeCustomer from "../../model/automation/TypeCustomer.tsx";

const BASE_URL = "/automation/typecustomer";

const getBy = () => {
    return api.get(
        `${BASE_URL}`);
};

const create = (man: TypeCustomer) => {
    return api.post(`${BASE_URL}`,man);
}

const getById = (id: number) => {
    return api.get(`${BASE_URL}/${id}`);
};
const updateTypeCustomer = (mans: TypeCustomer) => {
    return api.put(`${BASE_URL}`, mans);
}
// const deletePaper = (paper1 : Paper) => {
//     return api.delete(`${BASE_URL}`, paper1);
// }

const TypeCustomerService = {
    getBy,
    create,
    getById,
    updateTypeCustomer,
    // deletePaper,
};

export default TypeCustomerService;