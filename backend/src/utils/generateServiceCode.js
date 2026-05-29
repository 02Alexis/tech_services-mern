import ServiceOrder from "../modules/services/service.model.js";

export const generateServiceCode =
  async () => {

    const total =
      await ServiceOrder.countDocuments();

    const year =
      new Date().getFullYear();

    const sequence =
      String(total + 1)
        .padStart(5, "0");

    return `SRV-${year}-${sequence}`;

  };