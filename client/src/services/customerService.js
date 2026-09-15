import api from "./axios";

// 1. Get All Customers / Users List
export const getAllCustomers = async () => {
  try {
    const response = await api.get("/customer/all"); // Adjust endpoint URL if your backend route differs (e.g. /admin/customers or /users)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Toggle Customer Status (Activate / Deactivate)
export const toggleCustomerStatus = async (userId, isActive) => {
  try {
    const response = await api.patch(`/customer/${userId}/status`, {
      isActive,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 3. Update Profile (Existing Function)
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/customer/profile", profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
