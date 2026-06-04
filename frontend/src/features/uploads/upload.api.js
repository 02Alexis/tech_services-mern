import api from "../../api/axios";

export const uploadImage = async (formData) => {
  const response = await api.post("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getImages = async (serviceId) => {
  const response = await api.get(`/uploads/${serviceId}`);

  return response.data;
};
