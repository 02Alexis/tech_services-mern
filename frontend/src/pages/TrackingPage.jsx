import { useState } from "react";
import { searchTracking } from "../features/tracking/tracking.api";

const TrackingPage = () => {
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
          onChange={(e) =>
            setCode(e.target.value)
          }
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

      {loading && (
        <p className="mt-4">
          Buscando...
        </p>
      )}

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
            <strong>Cliente:</strong>{" "}
            {service.customer?.name}
          </p>

          <p>
            <strong>Estado:</strong>{" "}
            {service.status}
          </p>

          <p>
            <strong>Equipo:</strong>{" "}
            {service.equipmentType?.name}
          </p>

          <p>
            <strong>Ingreso:</strong>{" "}
            {new Date(
              service.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  )
}

export default TrackingPage