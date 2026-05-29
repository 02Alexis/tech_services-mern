import ServiceOrder from "./service.model.js";

export const createService =
  async (data) => {

    return await ServiceOrder.create(
      data
    );

  };

export const getServices =
  async () => {

    return await ServiceOrder
      .find()
      .populate(
        "equipmentType",
        "name slug"
      )
      .populate(
        "createdBy",
        "name email"
      );

  };

export const getServiceById =
  async (id) => {

    return await ServiceOrder
      .findById(id)
      .populate(
        "equipmentType"
      )
      .populate(
        "createdBy",
        "name email"
      );

  };

export const updateService =
  async (id, data) => {

    return await ServiceOrder
      .findByIdAndUpdate(
        id,
        data,
        {
          new: true
        }
      );

  };

export const deleteService =
  async (id) => {

    return await ServiceOrder
      .findByIdAndDelete(id);

  };