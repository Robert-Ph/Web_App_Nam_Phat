import api from "../api/APIConfig";
import account from "../model/account.model";

const BASE_URL = "/accounts";

const getByFilter = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};

const update = (account: account) => {
  return api.put(`${BASE_URL}/${account.id}`, account);
};

const create = (account: account) => {
  return api.post(`${BASE_URL}`, account);
};

const AccountService = {
  getByFilter,
  update,
  create,
};

export default AccountService;
