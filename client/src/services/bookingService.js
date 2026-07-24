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
