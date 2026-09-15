import api from "./axios";

// Get all payments
export const getAllPayments = async () => {
  try {
    const response = await api.get("/payments");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update payment status
export const updatePaymentStatus = async (paymentId, status) => {
  try {
    const response = await api.patch(`/payments/status/${paymentId}`, {
      status,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get payment receipt
export const getReceipt = async (paymentId) => {
  try {
    const response = await api.get(`/payments/receipt/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create payment
export const createPayment = async (bookingId, paymentMethod) => {
  try {
    const response = await api.post("/payments", {
      bookingId,
      paymentMethod,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
