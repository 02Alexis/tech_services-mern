import { useNavigate } from "react-router-dom";
import { statusMap } from "../utils/serviceStatus";
import { motion } from "framer-motion";
import { statusBadge } from "../utils/statusBadge";
import { Eye } from "lucide-react";

const ServicesTable = ({ services }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        overflow-hidden
      "
    >
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <motion.table
          className="w-full text-left table-auto min-w-max"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
              <th className="p-4 text-left">Teléfono</th>
              <th className="p-4 text-left">Equipo</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-left">Acción</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="
                    text-center
                    py-10
                    text-slate-500
                  "
                >
                  No se encontraron servicios
                </td>
              </tr>
            ) : (
              services.map((service, index) => (
                <motion.tr
                  key={service._id}
                  className="hover:bg-slate-50"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.08,
                  }}
                >
                  <td className="p-4">{service.code}</td>
                  <td className="p-4">{service.customer?.name}</td>
                  <td className="p-4">{service.customer?.phone}</td>
                  <td className="p-4">{service.equipmentType?.name}</td>
                  <td className="p-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${statusBadge[service.status]}
                      `}
                    >
                      {statusMap[service.status]}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Intl.DateTimeFormat("es-CO", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(service.createdAt))}
                  </td>

                  <td className="p-4">
                    {" "}
                    <button
                      onClick={() => navigate(`/services/${service._id}`)}
                      className="
                      flex
                      items-center
                      gap-2
                      text-blue-600
                      hover:text-blue-700
                      font-medium
                      cursor-pointer
                    "
                    >
                      <Eye size={16} />
                      Ver
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

export default ServicesTable;
