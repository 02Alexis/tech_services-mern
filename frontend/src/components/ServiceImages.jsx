import { PhotoProvider, PhotoView } from "react-photo-view";

const categories = {
  reception: "Recepción",
  diagnostic: "Diagnóstico",
  repair: "Reparación",
  delivery: "Entrega",
};

const ServiceImages = ({ images }) => {
  const grouped = images.reduce((acc, image) => {
    const category = image.category || "reception";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(image);

    return acc;
  }, {});

  return (
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
                <PhotoProvider>
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
                </PhotoProvider>

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
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceImages;
