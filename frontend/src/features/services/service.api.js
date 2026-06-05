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

export const updateServiceStatus = async (id, status) => {
  const response = await api.patch(`/services/${id}/status`, {
    status,
  });

  return response.data;
};

export const createObservation = async (id, text) => {
  const response = await api.post(`/services/${id}/observations`, {
    text,
  });

  return response.data;
};

export const downloadPdf = async (id) => {
  const response = await api.get(`/services/${id}/pdf`, {
    responseType: "blob",
  });

  return response.data;
};

export const updateService = async (id, data) => {
  const response = await api.put(`/services/${id}`, data);

  return response.data;
};

export const searchServices = async (page = 1, search = "", status = "") => {
  const response = await api.get("/services/search", {
    params: {
      page,
      limit: 10,
      search,
      status: status === "all" ? "" : status,
    },
  });

  return response.data;
};
