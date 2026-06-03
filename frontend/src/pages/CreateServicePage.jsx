import useEquipmentTypes from "../features/equipment-types/useEquipmentTypes";
import { useState } from "react";

const CreateServicePage = () => {
  const types = useEquipmentTypes();

  const [selectedType, setSelectedType] = useState("");

  const selectedEquipment = types.find((type) => type.slug === selectedType);

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

      <div
        className="
          bg-white
          p-6
          rounded-xl
          border
        "
      >
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
                <input
                  key={field}
                  placeholder={field}
                  className="
                border
                rounded-lg
                p-2
              "
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateServicePage;
