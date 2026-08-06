import api from "./axios";

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/customer/profile", profileData);

    return response.data;
  } catch (error) {
    throw error;
  }
};
