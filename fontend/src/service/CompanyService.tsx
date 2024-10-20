import api from "../api/APIConfig";
import Company from "../model/company.model";

const BASE_URL = "/system/company";

const update = (update: Company) => {
  return api.put(`${BASE_URL}`, update);
};
const getCompany = () => {
  return api.get(`${BASE_URL}`);
};
const CompanyService = {
  update,
  getCompany,
};

export default CompanyService;
