import mongoose from "mongoose";

const serviceOrderSchema =
  new mongoose.Schema(
    {
      code: {
        type: String,
        unique: true
      },

      customer: {
        name: {
          type: String,
          required: true
        },

        phone: String,

        alternativePhone: String,

        email: String,

        address: String,

        documentType: String,

        documentNumber: String
      },

      equipmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EquipmentType",
        required: true
      },

      status: {
        type: String,
        enum: [
          "entry",
          "process",
          "wait",
          "finalized"
        ],
        default: "entry"
      },

      formData: {
        type: Map,
        of: String
      },

      description: String,

      observations: [
        {
          text: String,
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      ],

      timeline: [
        {
          status: String,

          date: {
            type: Date,
            default: Date.now
          },

          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
        }
      ],

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      finalizedAt: Date
    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "ServiceOrder",
  serviceOrderSchema
);