import { getImages, uploadImage, deleteImage } from "./upload.service.js";

export const upload = async (req, res) => {
  try {
    const image = await uploadImage(
      req.file,

      req.body.serviceOrder,

      req.user.id,

      req.body.description,

      req.body.category,
    );

    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getByService = async (req, res) => {
  try {
    const images = await getImages(req.params.serviceId);

    res.json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await deleteImage(req.params.id);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
