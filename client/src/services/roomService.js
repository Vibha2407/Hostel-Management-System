import api from "./axios";

export const getAllRooms = async () => {
  try {
    const response = await api.get("/rooms");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const filterRooms = async (filters) => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "All") {
        params.append(key, value);
      }
    });

    const response = await api.get(`/rooms/filter?${params.toString()}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getRoomById = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await api.post("/rooms", roomData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const createRoom = async (roomData) => {
//   try {
//     const response = await api.post("/rooms", roomData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const updateRoom = async (id, roomData) => {
  const response = await api.put(`/rooms/${id}`, roomData);
  return response.data;
};

export const deleteRoom = async (id) => {
  try {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
