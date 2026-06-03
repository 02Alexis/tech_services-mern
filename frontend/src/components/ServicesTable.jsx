import { useNavigate } from "react-router-dom";
import { statusMap } from "../utils/serviceStatus";
import { motion } from "framer-motion";

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

              <th className="p-4 text-left">Estado</th>

              <th className="p-4 text-left">Fecha</th>

              <th className="p-4 text-left">Acción</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <motion.tr
                key={service._id}
                className="hover:bg-slate-50"
                initial="hidden"
                animate="visible"
              >
                <td className="p-4">{service.code}</td>

                <td className="p-4">{service.customer?.name}</td>

                <td className="p-4">{statusMap[service.status]}</td>

                <td className="p-4">
                  {new Date(service.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {" "}
                  <button
                    onClick={() => navigate(`/services/${service._id}`)}
                    className="
                    cursor-pointer
                      text-blue-600
                      hover:text-blue-700
                      transition-colors
                    "
                  >
                    Ver
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

export default ServicesTable;
