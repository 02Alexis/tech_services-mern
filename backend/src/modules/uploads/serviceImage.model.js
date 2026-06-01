import mongoose from "mongoose";

const serviceImageSchema =
  new mongoose.Schema(
    {
      serviceOrder: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "ServiceOrder",

        required: true
      },

      url: {
        type: String,
        required: true
      },

      publicId: {
        type: String,
        required: true
      },

      description: {
        type: String,
        default: ""
      },

      uploadedBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User"
      }
    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "ServiceImage",
  serviceImageSchema
);