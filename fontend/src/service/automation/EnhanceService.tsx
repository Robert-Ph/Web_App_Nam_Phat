import api from "../../api/APIConfig";
import Enhance from "../../model/automation/Enhance.tsx";

const BASE_URL = "/automation/enhance";

const getBy = () => {
    return api.get(
        `${BASE_URL}`);
};

const create = (man: Enhance) => {
    return api.post(`${BASE_URL}`,man);
}

const getById = (id: number) => {
    return api.get(`${BASE_URL}/${id}`);
};
const updateEnhance = (mans: Enhance) => {
    return api.put(`${BASE_URL}`, mans);
}
// const deletePaper = (paper1 : Paper) => {
//     return api.delete(`${BASE_URL}`, paper1);
// }

const EnhanceService = {
    getBy,
    create,
    getById,
    updateEnhance,
    // deletePaper,
};

export default EnhanceService;