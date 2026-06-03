import api from "../../api/axios";

export const getServices = async () => {
  const response = await api.get("/services");

  return response.data;
};

export const createService = async (payload) => {
  const response = await api.post("/services", payload);

  return response.data;
};

export const getServiceById = async (id) => {
  const response = await api.get(`/services/${id}`);

  return response.data;
};
