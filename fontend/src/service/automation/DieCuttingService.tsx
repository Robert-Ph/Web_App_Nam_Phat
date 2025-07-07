import api from "../../api/APIConfig";
import DieCutting from "../../model/automation/DieCutting.tsx";


const BASE_URL = "/automation/diecutting";

const getBy = () => {
    return api.get(
        `${BASE_URL}`);
};

const create = (man: DieCutting) => {
    return api.post(`${BASE_URL}`,man);
}

const getById = (id: number) => {
    return api.get(`${BASE_URL}/${id}`);
};

const updateDieCutting = (mans: DieCutting) => {
    return api.put(`${BASE_URL}`, mans);
}
// const deletePaper = (paper1 : Paper) => {
//     return api.delete(`${BASE_URL}`, paper1);
// }

const DieCuttingService = {
    getBy,
    create,
    getById,
    updateDieCutting,
    // deletePaper,
};

export default DieCuttingService;