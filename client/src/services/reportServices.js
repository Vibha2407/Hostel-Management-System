import axios from "axios";

const API_URL = "/api/admin/reports";

export const getReports = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });

  return response.data;
};
