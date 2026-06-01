import api from "../../api/axios";

export const loginRequest = async (
  data
) => {
  const response =
    await api.post(
      "/auth/login",
      data
    );

  return response.data;
};