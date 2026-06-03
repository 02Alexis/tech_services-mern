import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getServiceById,
  updateServiceStatus,
} from "../features/services/service.api";
import { fieldLabels } from "../config/fieldLabels";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { statusLabels } from "../utils/statusLabels";

const ServiceDetailPage = () => {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadService = async () => {
    try {
      const data = await getServiceById(id);

      setService(data);
    } catch (error) {
      console.error(error);

      toast.error("Error al cargar servicio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadService();
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      await updateServiceStatus(id, status);

      toast.success("Estado actualizado");

      await loadService();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error al actualizar estado",
      );
    }
  };

  const nextStatus = {
    entry: "process",
    process: "wait",
    wait: "finalized",
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-red-500">Servicio no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="
          bg-white
          border
          rounded-xl
          p-6
        "
      >
        <h1
          className="
            text-2xl
            font-bold
          "
        >
          {service.code}
        </h1>

        <p
          className="
            text-slate-500
            mt-2
          "
        >
          {service.equipmentType?.name}
        </p>
      </div>

      {/* Cliente */}
      <div
        className="
          bg-white
          border
          rounded-xl
          p-6
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            mb-4
          "
        >
          Cliente
        </h2>

        <div
          className="
            grid
            md:grid-cols-2
            gap-4
          "
        >
          <div>
            <p className="text-slate-500 text-sm">Nombre</p>

            <p className="font-medium">{service.customer?.name}</p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Teléfono</p>

            <p className="font-medium">{service.customer?.phone}</p>
          </div>
        </div>
      </div>

      {/* Estado */}
      <div
        className="
          bg-white
          border
          rounded-xl
          p-6
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            mb-4
          "
        >
          Estado Actual
        </h2>

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
            md:items-center
            md:justify-between
          "
        >
          <span
            className="
              inline-flex
              w-fit
              px-4
              py-2
              rounded-full
              bg-blue-100
              text-blue-700
              font-medium
            "
          >
            {statusLabels[service.status] || service.status}
          </span>

          {nextStatus[service.status] && (
            <button
              onClick={() => handleStatusChange(nextStatus[service.status])}
              className="
                cursor-pointer
                bg-green-600
                hover:bg-green-700
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Pasar a {statusLabels[nextStatus[service.status]]}
            </button>
          )}
        </div>
      </div>

      {/* Información técnica */}
      <div
        className="
          bg-white
          border
          rounded-xl
          p-6
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            mb-4
          "
        >
          Información Técnica
        </h2>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >
          {Object.entries(service.formData || {}).map(([key, value]) => (
            <div key={key}>
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                {fieldLabels[key] || key}
              </p>

              <p
                className="
                  font-medium
                "
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div
        className="
          bg-white
          border
          rounded-xl
          p-6
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            mb-6
          "
        >
          Historial
        </h2>

        <div className="space-y-4">
          {service.timeline?.map((item) => (
            <div
              key={item._id}
              className="
                  border-l-4
                  border-blue-500
                  pl-4
                "
            >
              <p
                className="
                    font-medium
                  "
              >
                {statusLabels[item.status] || item.status}
              </p>

              <p
                className="
                    text-sm
                    text-slate-500
                  "
              >
                {new Date(item.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
