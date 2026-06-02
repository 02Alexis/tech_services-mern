import { statusMap } from "../utils/serviceStatus";

const ServicesTable = ({ services }) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        overflow-hidden
      "
    >
      <table
        className="
          w-full
        "
      >
        <thead>
          <tr
            className="
              bg-slate-50
              border-b
            "
          >
            <th className="p-4 text-left">Código</th>

            <th className="p-4 text-left">Cliente</th>

            <th className="p-4 text-left">Estado</th>

            <th className="p-4 text-left">Fecha</th>

            <th className="p-4 text-left">Acción</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr
              key={service._id}
              className="
                  border-b
                "
            >
              <td className="p-4">{service.code}</td>

              <td className="p-4">{service.customer?.name}</td>

              <td className="p-4">{statusMap[service.status]}</td>

              <td className="p-4">
                {new Date(service.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4">Ver</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;
