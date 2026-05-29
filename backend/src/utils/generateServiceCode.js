import Counter from "../modules/services/counter.model.js";

export const generateServiceCode =
  async () => {

    const counter =
      await Counter.findOneAndUpdate(
        {
          name: "service_order"
        },
        {
          $inc: {
            sequence: 1
          }
        },
        {
          new: true,
          upsert: true
        }
      );

    const year =
      new Date().getFullYear();

    return `SRV-${year}-${String(
      counter.sequence
    ).padStart(6, "0")}`;
  };