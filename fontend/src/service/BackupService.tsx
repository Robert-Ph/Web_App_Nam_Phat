import api from "../api/APIConfig";

const BASE_URL = "/backup";

const getHistory = () => {
  return api.get(`${BASE_URL}/history`);
};
const getLast = () => {
  return api.get(`${BASE_URL}/last`);
};

const dowloadFile = () => {
  return api.get(`${BASE_URL}`, {
    responseType: "blob", // Set response type to 'blob' to handle binary data
  });
};

const BackupService = {
  getHistory,
  dowloadFile,
  getLast,
};

export default BackupService;
