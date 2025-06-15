import api from "../../api/APIConfig";
import Paper from "../../model/automation/paper.tsx";

const BASE_URL = "/automation";

const getBy = () => {
    return api.get(
        `${BASE_URL}`);
};

const create = (paper : Paper) => {
    return api.post(`${BASE_URL}`, paper);
}

const getById = (id: number) => {
    return api.get(`${BASE_URL}/${id}`);
};
// const deletePaper = (paper1 : Paper) => {
//     return api.delete(`${BASE_URL}`, paper1);
// }

const PaperService = {
    getBy,
    create,
    getById
    // deletePaper,
};

export default PaperService;