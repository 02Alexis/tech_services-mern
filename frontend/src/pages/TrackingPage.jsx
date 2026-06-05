import { useState } from "react";
import { searchTracking } from "../features/tracking/tracking.api";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const statusLabels = {
  entry: "Ingresado",
  process: "En Proceso",
  wait: "En Espera",
  finalized: "Finalizado",
};

const statusColors = {
  entry: "border-blue-500",
  process: "border-yellow-500",
  wait: "border-orange-500",
  finalized: "border-green-500",
};
const categoryLabels = {
  reception: "Recepción",
  diagnostic: "Diagnóstico",
  repair: "Reparación",
  delivery: "Entrega",
};

const TrackingPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [code, setCode] = useState("");

  const [service, setService] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await searchTracking(code);

      setService(data);
    } catch {
      setError("Orden no encontrada");

      setService(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        max-w-4xl
        mx-auto
        p-8
      "
    >
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Seguimiento de Servicio
      </h1>

      <div className="flex gap-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="SRV-2026-000001"
          className="
            flex-1
            border
            rounded-lg
            p-3
          "
        />

        <button
          onClick={handleSearch}
          className="
            bg-blue-600
            text-white
            px-6
            rounded-lg
          "
        >
          Buscar
        </button>
      </div>

      {loading && <p className="mt-4">Buscando...</p>}

      {error && (
        <p
          className="
            mt-4
            text-red-600
          "
        >
          {error}
        </p>
      )}

      {service && (
        <div
          className="
            mt-8
            border
            rounded-xl
            p-6
          "
        >
          <h2
            className="
              text-xl
              font-bold
              mb-4
            "
          >
            {service.code}
          </h2>

          <p>
            <strong>Cliente:</strong> {service.customer?.name}
          </p>

          <p>
            <strong>Estado:</strong> {statusLabels[service.status]}
          </p>

          <p>
            <strong>Equipo:</strong> {service.equipmentType?.name}
          </p>

          <p>
            <strong>Ingreso:</strong>{" "}
            {new Date(service.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-8">
            <h3
              className="
                text-xl
                font-bold
                mb-4
                "
            >
              Historial
            </h3>

            <div className="space-y-4">
              {service.timeline?.map((item) => (
                <div
                  key={item._id}
                  className={`
                    flex
                    items-center
                    gap-4
                    border-l-4
                    ${statusColors[item.status]}
                    pl-4
                    py-2
                    `}
                >
                  <div>
                    <p className="font-semibold">{statusLabels[item.status]}</p>
                    <p className="text-sm text-slate-500">
                      Por: {item.user?.name}
                    </p>

                    <p
                      className="
                        text-sm
                        text-slate-500
                        "
                    >
                      {new Date(item.date).toLocaleString("es-CO")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Fotos del Servicio</h3>

          <PhotoProvider>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                className="
                  border
                  rounded-lg
                  overflow-hidden
                  cursor-pointer
                "
              >
                {service.images.map((image) => (
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
                        alt={image.description}
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

                    <div className="p-3">
                      <p className="text-sm font-medium">
                        {categoryLabels[image.category]}
                      </p>

                      <p className="text-xs text-slate-500">
                        {image.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PhotoProvider>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
