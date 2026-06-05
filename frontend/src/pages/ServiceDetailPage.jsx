import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getServiceById,
  updateServiceStatus,
  createObservation,
  downloadPdf,
} from "../features/services/service.api";
import { statusLabels } from "../utils/statusLabels";
import { fieldLabels } from "../config/fieldLabels";
import useImages from "../features/uploads/useImages";
import UploadImageForm from "../components/UploadImageForm";
import Spinner from "../components/Spinner";
import ServiceImages from "../components/ServiceImages";

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [service, setService] = useState(null);
  const { images, reloadImages } = useImages(id);
  const [observation, setObservation] = useState("");
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

  const handleObservation = async () => {
    if (!observation.trim()) {
      return;
    }

    try {
      await createObservation(id, observation);

      toast.success("Observación agregada");

      setObservation("");

      await loadService();
    } catch {
      toast.error("Error al guardar");
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const pdfBlob = await downloadPdf(id);

      const url = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${service.code}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("PDF descargado");
    } catch {
      toast.error("Error al descargar PDF");
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

  console.log("Images:", service.images);

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
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          "
        >
          <div>
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

          <button
            onClick={handleDownloadPdf}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-2
              rounded-lg
              cursor-pointer
            "
          >
            Descargar PDF
          </button>
          <button
            onClick={() => navigate(`/services/${service._id}/edit`)}
            className="
              bg-amber-500
              hover:bg-amber-600
              text-white
              px-5
              py-2
              rounded-lg
              cursor-pointer
            "
          >
            Editar
          </button>
        </div>
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

      {/* observaciones */}
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
          Observaciones
        </h2>

        <div
          className="
            space-y-4
            mb-6
        "
        >
          {service.observations?.length > 0 ? (
            service.observations.map((item) => (
              <div
                key={item._id}
                className="
                border
                rounded-lg
                p-4
            "
              >
                <p>{item.text}</p>

                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-2
                "
                >
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p
              className="
            text-slate-500
            "
            >
              No hay observaciones
            </p>
          )}
        </div>

        <textarea
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          rows={4}
          placeholder="
            Escribe una observación...
        "
          className="
            w-full
            border
            rounded-lg
            p-3
        "
        />

        <button
          onClick={handleObservation}
          className="
            mt-4
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-blue-700
        "
        >
          Agregar Observación
        </button>
      </div>

      <div
        className="
          mt-8
        "
      >
        <UploadImageForm serviceId={id} onSuccess={reloadImages} />
      </div>

      <div
        className="
          mt-6
        "
      >
        <ServiceImages images={images} reloadImages={reloadImages} />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
