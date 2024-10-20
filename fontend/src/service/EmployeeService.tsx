import api from "../api/APIConfig";
import { Employee } from "../model/employee.model";

const BASE_URL = "/employees";

const getByFilter = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};
const create = (emplyee: Employee) => {
  return api.post(`${BASE_URL}`, emplyee);
};

const getById = (id: number | undefined | string) => {
  return api.get(`${BASE_URL}/${id}`);
};

const EmployeeService = {
  getByFilter,
  create,
  getById,
};

export default EmployeeService;
