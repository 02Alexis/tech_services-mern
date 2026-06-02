import api from "../../api/axios";

export const getDashboard = async () => {
  const response =
    await api.get(
      "/services/dashboard"
    );

  return response.data;
};