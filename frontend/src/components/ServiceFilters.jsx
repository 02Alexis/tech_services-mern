import { motion } from "framer-motion";
import { Search } from "lucide-react";

const ServiceFilters = ({ search, setSearch, status, setStatus }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        bg-white
        border
        rounded-xl
        p-4
        mb-6
      "
    >
      <div
        className="
          grid
          md:grid-cols-2
          gap-4
        "
      >
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-3
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="
              Código, cliente o teléfono...
            "
            className="
              w-full
              border
              rounded-lg
              pl-10
              pr-4
              py-2
              outline-none
            "
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
            border
            rounded-lg
            px-4
            py-2
            outline-none
          "
        >
          <option value="">
            Todos los estados
          </option>

          <option value="entry">
            Ingreso
          </option>

          <option value="process">
            Proceso
          </option>

          <option value="wait">
            Espera
          </option>

          <option value="finalized">
            Finalizado
          </option>
        </select>
      </div>
    </motion.div>
  );
};

export default ServiceFilters;
