import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { fieldLabels } from "../config/fieldLabels";
import {
  getServiceById,
  updateService,
} from "../features/services/service.api";

const EditServicePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const [service, setService] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getServiceById(id);

      setService(data);

      const initialValues = {
        customerName: data.customer?.name,

        customerPhone: data.customer?.phone,

        description: data.description,
      };

      Object.entries(data.formData || {}).forEach(([key, value]) => {
        initialValues[key] = value;
      });

      reset(initialValues);
    };

    load();
  }, [id, reset]);

  const onSubmit = async (formData) => {
    try {
      const dynamicFields = {};

      service.equipmentType.sections.forEach((section) => {
        section.fields.forEach((field) => {
          dynamicFields[field] = formData[field];
        });
      });

      await updateService(id, {
        customer: {
          name: formData.customerName,

          phone: formData.customerPhone,
        },

        description: formData.description,

        formData: dynamicFields,
      });

      toast.success("Orden actualizada");

      navigate(`/services/${id}`);
    } catch {
      toast.error("Error al actualizar");
    }
  };

  if (!service) {
    return <p>Cargando...</p>;
  }

  return (
    <div
      className="
        max-w-3xl
        mx-auto
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Editar Orden
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          bg-white
          border
          rounded-xl
          p-6
          space-y-4
        "
      >
        <div>
          <label>Cliente</label>

          <input
            {...register("customerName")}
            className="
              w-full
              border
              rounded-lg
              p-2
            "
          />
        </div>

        <div>
          <label>Teléfono</label>

          <input
            {...register("customerPhone")}
            className="
              w-full
              border
              rounded-lg
              p-2
            "
          />
        </div>

        <div>
          <label>Descripción</label>

          <textarea
            {...register("description")}
            rows={5}
            className="
              w-full
              border
              rounded-lg
              p-2
            "
          />
        </div>

        {service.equipmentType?.sections?.map((section) => (
          <div key={section.title} className="mt-6">
            <h3
              className="
          text-lg
          font-semibold
          mb-4
        "
            >
              {section.title}
            </h3>

            <div
              className="
          grid
          md:grid-cols-2
          gap-4
        "
            >
              {section.fields.map((field) => (
                <div key={field}>
                  <label>{fieldLabels[field] || field}</label>

                  <input
                    {...register(field)}
                    className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditServicePage;
