import { motion } from "framer-motion";

const ServiceFilters = ({ search, setSearch, status, setStatus }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        bg-white
        p-4
        rounded-xl
        border
        mb-5
      "
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border mt-1 border-gray-700/70 outline-none rounded p-2"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setStatus("all")}>Todos</button>

        <button onClick={() => setStatus("entry")}>Ingreso</button>

        <button onClick={() => setStatus("process")}>Proceso</button>

        <button onClick={() => setStatus("wait")}>Espera</button>

        <button onClick={() => setStatus("finalized")}>Finalizado</button>
      </div>
    </motion.div>
  );
};

export default ServiceFilters;
