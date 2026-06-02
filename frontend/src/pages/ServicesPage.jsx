import useServices from "../features/services/useServices";
import ServicesTable from "../components/ServicesTable";
import ServiceFilters from "../components/ServiceFilters";

export default function ServicesPage() {
  const { services, loading, search, setSearch, status, setStatus } =
    useServices();

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div>
      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >
        <h1
          className="
            text-2xl
            font-bold
          "
        >
          Servicios
        </h1>

        <button
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
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
      <ServicesTable services={services} />
    </div>
  );
}
