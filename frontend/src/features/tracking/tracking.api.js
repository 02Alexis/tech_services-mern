import api from "../../api/axios";

export const searchTracking = async (code) => {
  const response = await api.get(`/services/tracking/${code}`);

  return response.data;
};
