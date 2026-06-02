import api from "../../api/axios";

export const getServices =
  async () => {

    const response =
      await api.get("/services");

    return response.data;

  };