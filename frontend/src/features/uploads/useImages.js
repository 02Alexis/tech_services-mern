import { useEffect, useState } from "react";

import { getImages } from "./upload.api";

export default function useImages(serviceId) {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    const data = await getImages(serviceId);

    setImages(data);
  };

  useEffect(() => {
    if (serviceId) {
      loadImages();
    }
  }, [serviceId]);

  return {
    images,
    reloadImages: loadImages,
  };
}
