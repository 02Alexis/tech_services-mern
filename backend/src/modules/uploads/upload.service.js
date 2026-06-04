import cloudinary from "../../config/cloudinary.js";
import ServiceImage from "./serviceImage.model.js";

export const uploadImage = async (file, serviceOrder, userId, description, category) => {
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

  return await ServiceImage.create({
    serviceOrder,

    url: result.secure_url,

    publicId: result.public_id,

    description,

    category,

    uploadedBy: userId,
  });
};

export const getImages = async (serviceOrder) => {
  return await ServiceImage.find({
    serviceOrder,
  });
};
