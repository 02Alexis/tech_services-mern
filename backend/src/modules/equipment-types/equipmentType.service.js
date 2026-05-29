import EquipmentType from "./equipmentType.model.js";

export const createEquipmentType =
  async (data) => {

    return await EquipmentType.create(
      data
    );

  };

export const getEquipmentTypes =
  async () => {

    return await EquipmentType.find();

  };

export const getEquipmentTypeById =
  async (id) => {

    return await EquipmentType.findById(
      id
    );

  };

export const updateEquipmentType =
  async (id, data) => {

    return await EquipmentType.findByIdAndUpdate(
      id,
      data,
      {
        new: true
      }
    );

  };

export const deleteEquipmentType =
  async (id) => {

    return await EquipmentType.findByIdAndDelete(
      id
    );

  };