import api from "../api/APIConfig";

const BASE_URL = "/accounts";

const getByFilter = (page: number, size: number, filter: string) => {
  return api.get(
    `${BASE_URL}/search?page=${page}&size=${size}&filter=${filter}`
  );
};

const AccountService = {
  getByFilter,
};

export default AccountService;
