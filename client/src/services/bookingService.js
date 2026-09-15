import api from "./axios";

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyBookings = async () => {
  try {
    const response = await api.get("/bookings/my-bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmBooking = async (id) => {
  try {
    const response = await api.put(`/bookings/confirm/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkInBooking = async (id) => {
  try {
    const response = await api.put(`/bookings/checkin/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkOutBooking = async (id) => {
  try {
    const response = await api.put(`/bookings/checkout/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const cancelBooking = async (id) => {
  try {
    const response = await api.put(`/bookings/cancel/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
