import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceById } from "../features/services/service.api";
import Spinner from "../components/Spinner";
import { fieldLabels } from "../config/fieldLabels";

const ServiceDetailPage = () => {
  const { id } = useParams();

  const [service, setService] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getServiceById(id);

        setService(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!service) {
    return <h2>No encontrado</h2>;
  }

  return (
    <div
      className="
      space-y-6
    "
    >
        {/* bloque 1 codigo de servicio */}
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
          {service.equipmentType.name}
        </p>
      </div>

      {/* bloque 2 cliente*/}
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
          font-semibold
          mb-4
        "
        >
          Cliente
        </h2>

        <p>{service.customer.name}</p>

        <p>{service.customer.phone}</p>
      </div>

      {/* bloque 3 información técnica*/}
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
            font-semibold
            mb-4
            "
        >
          Información Técnica
        </h2>

        <div
          className="
            grid
            md:grid-cols-2
            gap-4
            "
        >
          {Object.entries(service.formData).map(([key, value]) => (
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

      {/* bloque 4 historial*/}
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
            font-semibold
            mb-4
            "
        >
          Historial
        </h2>

        <div
          className="
            space-y-4
            "
        >
          {service.timeline.map((item) => (
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
                {item.status}
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
