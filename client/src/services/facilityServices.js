import axios from "axios";

const API_URL = "/api/facilities";

// Get facility configuration
export const getFacilities = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get single facility configuration
export const getFacility = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

// Create facility configuration
export const createFacility = async (data) => {
  const response = await axios.post(API_URL, data, {
    withCredentials: true,
  });

  return response.data;
};

// Update facility configuration
export const updateFacility = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

// Delete facility configuration
export const deleteFacility = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });

  return response.data;
};
