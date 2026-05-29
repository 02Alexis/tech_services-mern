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

// metodos updatestatus

export const updateStatus =
  async (
    serviceId,
    status,
    userId
  ) => {

    const service =
      await ServiceOrder.findById(
        serviceId
      );

    if (!service) {
      throw new Error(
        "Servicio no encontrado"
      );
    }

    service.status = status;

    service.timeline.push({
      status,
      user: userId
    });

    if (
      status === "finalized"
    ) {
      service.finalizedAt =
        new Date();
    }

    await service.save();

    return service;

  };

// 
export const addObservation =
  async (
    serviceId,
    text
  ) => {

    const service =
      await ServiceOrder.findById(
        serviceId
      );

    service.observations.push({
      text
    });

    await service.save();

    return service;

  };