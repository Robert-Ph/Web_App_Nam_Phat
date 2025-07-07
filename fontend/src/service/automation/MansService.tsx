import api from "../../api/APIConfig";
import Mans from "../../model/automation/Mans.tsx";


const BASE_URL = "/automation/mans";

const getBy = () => {
    return api.get(
        `${BASE_URL}`);
};

const create = (man: Mans) => {
    return api.post(`${BASE_URL}`,man);
}

const getById = (id: number) => {
    return api.get(`${BASE_URL}/${id}`);
};
const updateMans = (mans: Mans) => {
    return api.put(`${BASE_URL}`, mans);
}
// const deletePaper = (paper1 : Paper) => {
//     return api.delete(`${BASE_URL}`, paper1);
// }

const MansService = {
    getBy,
    create,
    getById,
    updateMans,
    // deletePaper,
};

export default MansService;