import { useState } from "react";
import useEquipmentTypes from "../features/equipment-types/useEquipmentTypes";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createService } from "../features/services/service.api";
import FormInput from "../components/FormInput";
import { fieldLabels } from "../config/fieldLabels";

const CreateServicePage = () => {
  const types = useEquipmentTypes();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedType, setSelectedType] = useState("");
  const selectedEquipment = types.find((type) => type.slug === selectedType);

  const onSubmit = async (data) => {
    try {
      const formData = {};

      selectedEquipment?.sections?.forEach((section) => {
        section.fields.forEach((field) => {
          formData[field] = data[field];
        });
      });

      const payload = {
        customer: {
          name: data.customerName,

          phone: data.customerPhone,
        },

        equipmentType: selectedEquipment._id,

        description: data.description,

        formData,
      };

      await createService(payload);

      toast.success("Orden creada");

      reset();

      setSelectedType("");
    } catch {
      toast.error("Error al crear orden");
    }
  };

  return (
    <div>
      <h1
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Nueva Orden
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          bg-white
          p-6
          rounded-xl
          border
        "
      >
        <div
          className="
            grid
            md:grid-cols-2
            gap-4
            mb-6
          "
        >
          <FormInput
            label="Cliente"
            name="customerName"
            register={register}
            required
            errors={errors}
          />

          <FormInput
            label="Teléfono"
            name="customerPhone"
            register={register}
            required
            errors={errors}
          />
        </div>
        <div>
          <label>Tipo Equipo</label>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="
              w-full
              border
              rounded-lg
              p-2
              mt-2
            "
          >
            <option value="">Seleccionar</option>

            {types.map((type) => (
              <option key={type._id} value={type.slug}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEquipment?.sections?.map((section) => (
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
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >
              {section.fields.map((field) => (
                <FormInput
                  key={field}
                  label={fieldLabels[field] || field}
                  name={field}
                  register={register}
                  errors={errors}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="
            mt-8
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-blue-700
          "
        >
          Guardar Orden
        </button>
      </form>
    </div>
  );
};

export default CreateServicePage;
