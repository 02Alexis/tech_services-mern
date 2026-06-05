import ServiceOrder from "./service.model.js";
import { createNotification } from "../notifications/notification.service.js";

export const createService = async (data) => {
  return await ServiceOrder.create(data);
};

export const getServices = async () => {
  return await ServiceOrder.find({
    isDeleted: false,
  })
    .populate("equipmentType", "name slug")
    .populate("createdBy", "name email");
};

export const getServiceById = async (id) => {
  return await ServiceOrder.findById(id)
    .populate("equipmentType")
    .populate("createdBy", "name email");
};

export const updateService = async (id, data) => {
  return await ServiceOrder.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteService = async (id, userId) => {
  return await ServiceOrder.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      updatedBy: userId,
    },
    {
      returnDocument: "after"
    },
  );
};

// metodos updatestatus

export const updateStatus = async (serviceId, status, userId) => {
  const service = await ServiceOrder.findById(serviceId);

  if (!service) {
    throw new Error("Servicio no encontrado");
  }

  service.status = status;

  service.timeline.push({
    status,
    user: userId,
  });

  if (status === "finalized") {
    service.finalizedAt = new Date();
  }

  await service.save();

  await createNotification(
    "Estado actualizado",
    `${service.code} pasó a ${status}`,
    "status",
    service._id,
  );

  return service;
};

//
export const addObservation = async (serviceId, text) => {
  const service = await ServiceOrder.findById(serviceId);

  service.observations.push({
    text,
  });

  await service.save();

  await createNotification(
    "Nueva observación",
    `${service.code} tiene una nueva observación`,
    "observation",
    service._id,
  );

  return service;
};

// dashboard
export const getDashboardStats = async () => {
  const totalServices = await ServiceOrder.countDocuments();

  const entry = await ServiceOrder.countDocuments({
    status: "entry",
  });

  const process = await ServiceOrder.countDocuments({
    status: "process",
  });

  const wait = await ServiceOrder.countDocuments({
    status: "wait",
  });

  const finalized = await ServiceOrder.countDocuments({
    status: "finalized",
  });

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayEntries = await ServiceOrder.countDocuments({
    createdAt: {
      $gte: today,
    },
  });

  const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const monthEntries = await ServiceOrder.countDocuments({
    createdAt: {
      $gte: firstDayMonth,
    },
  });

  return {
    totalServices,
    entry,
    process,
    wait,
    finalized,
    todayEntries,
    monthEntries,
  };
};

// busquedas avanzadas
export const searchServices = async (
  page = 1,
  limit = 10,
  search = "",
  status = "",
) => {
  const query = {
    isDeleted: false,
  };

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      {
        code: {
          $regex: search,
          $options: "i",
        },
      },

      {
        "customer.name": {
          $regex: search,
          $options: "i",
        },
      },

      {
        "customer.phone": {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const total = await ServiceOrder.countDocuments(query);

  const data = await ServiceOrder.find(query)
    .populate("equipmentType", "name")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data,

    pagination: {
      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    },
  };
};

// historial completo
export const getTimeline = async (serviceId) => {
  console.log("Buscando servicio:", serviceId);

  const result = await ServiceOrder.findById(serviceId)
    .populate("timeline.user", "name")
    .select("code timeline");

  console.log("Resultado:", result);

  return result;
};
