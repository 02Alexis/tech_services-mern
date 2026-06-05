import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useServices from "../features/services/useServices";
import ServicesTable from "../components/ServicesTable";
import ServiceFilters from "../components/ServiceFilters";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

export default function ServicesPage() {
  const navigate = useNavigate();
  const { services, loading, search, setSearch, status, setStatus, page, setPage, pagination } =
    useServices();

  if (loading && services.length === 0) {
  return <Spinner />;
}

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xl font-bold mb-2"
        >
          Servicios
        </motion.h2>

        <button
          onClick={() => navigate("/services/new")}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            cursor-pointer
            hover:bg-blue-700
            transition-colors
          "
        >
          Nueva Orden
        </button>
      </div>
      <ServiceFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <p
        className="
          text-sm
          text-slate-500
          mb-4
        "
      >
        {services.length} resultado(s)
      </p>
      <ServicesTable services={services} />
      <Pagination page={page} setPage={setPage} pagination={pagination} />
    </motion.div>
  );
}
