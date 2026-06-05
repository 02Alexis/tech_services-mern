import cloudinary from "../../config/cloudinary.js";
import ServiceImage from "./serviceImage.model.js";
import { createNotification } from "../notifications/notification.service.js";

export const uploadImage = async (
  file,
  serviceOrder,
  userId,
  description,
  category,
) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "tech-services",
        },

        (error, result) => {
          if (error) reject(error);

          resolve(result);
        },
      )
      .end(file.buffer);
  });

  const image = await ServiceImage.create({
    serviceOrder,

    url: result.secure_url,

    publicId: result.public_id,

    description,

    category,

    uploadedBy: userId,
  });

  await createNotification(
    "Nueva imagen",
    `${image.serviceOrder} tiene una nueva imagen`,
    "image",
    image.serviceOrder,
  );

  return image;
};

export const getImages = async (serviceOrder) => {
  return await ServiceImage.find({
    serviceOrder,
  });
};

export const deleteImage = async (imageId) => {
  const image = await ServiceImage.findById(imageId);

  if (!image) {
    throw new Error("Imagen no encontrada");
  }

  await cloudinary.uploader.destroy(image.publicId);

  await image.deleteOne();

  return {
    message: "Imagen eliminada",
  };
};
