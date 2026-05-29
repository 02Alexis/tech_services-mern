import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    fields: [
      {
        type: String,
        required: true
      }
    ]
  },
  {
    _id: false
  }
);

const equipmentTypeSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true
      },

      slug: {
        type: String,
        required: true,
        unique: true
      },

      sections: [sectionSchema]
    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "EquipmentType",
  equipmentTypeSchema
);