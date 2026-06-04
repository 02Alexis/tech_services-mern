const ServiceImages = ({ images }) => {
  if (!images.length) {
    return <p>No hay imágenes</p>;
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
      "
    >
      {images.map((image) => (
        <div
          key={image._id}
          className="
            border
            rounded-lg
            overflow-hidden
          "
        >
          <img
            src={image.url}
            alt=""
            className="
              w-full
              h-48
              object-cover
            "
          />

          <div className="p-2">
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
  );
};

export default ServiceImages;
