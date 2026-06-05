import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: String,

    message: String,

    type: {
      type: String,
      enum: ["service", "status", "image", "observation"],
    },

    read: {
      type: Boolean,
      default: false,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceOrder",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Notification", notificationSchema);
