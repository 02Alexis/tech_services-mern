import api from "../../api/axios";

export const getEquipmentTypes =
  async () => {

    const response =
      await api.get(
        "/equipment-types"
      );

    return response.data;

  };