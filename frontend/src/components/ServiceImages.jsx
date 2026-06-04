import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { deleteImage } from "../features/uploads/upload.api";

const categories = {
  reception: "Recepción",
  diagnostic: "Diagnóstico",
  repair: "Reparación",
  delivery: "Entrega",
};

const ServiceImages = ({ images, reloadImages }) => {
  const grouped = images.reduce((acc, image) => {
    const category = image.category || "reception";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(image);

    return acc;
  }, {});

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar imagen?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteImage(id);

      toast.success("Imagen eliminada");

      reloadImages();
    } catch (error) {
      console.error(error);

      toast.error("Error al eliminar");
    }
  };

  return (
    <PhotoProvider>
      <div className="space-y-8">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              {categories[category]}
            </h3>

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-4
              "
            >
              {items.map((image) => (
                <div
                  key={image._id}
                  className="
                      border
                      rounded-lg
                      overflow-hidden
                    "
                >
                  <PhotoView src={image.url}>
                    <img
                      src={image.url}
                      alt=""
                      className="
                        h-48
                        w-full
                        object-cover
                        cursor-pointer
                        hover:scale-105
                        transition-transform
                      "
                    />
                  </PhotoView>

                  <div
                    className="
                        p-2
                      "
                  >
                    <p
                      className="
                          text-sm
                        "
                    >
                      {image.description}
                    </p>

                    <button
                      onClick={() => handleDelete(image._id)}
                      className="
                      mt-2
                      text-red-600
                      text-sm
                      hover:text-red-700
                      cursor-pointer
                    "
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default ServiceImages;
