const ServiceFilters = ({ search, setSearch, status, setStatus }) => {
  return (
    <div
      className="
        bg-white
        p-4
        rounded-xl
        border
        mb-5
      "
    >
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          border
          rounded-lg
          p-2
        "
      />

      <div
        className="
          flex
          gap-2
          mt-4
        "
      >
        <button onClick={() => setStatus("all")}>Todos</button>

        <button onClick={() => setStatus("entry")}>Ingreso</button>

        <button onClick={() => setStatus("process")}>Proceso</button>

        <button onClick={() => setStatus("wait")}>Espera</button>

        <button onClick={() => setStatus("finalized")}>Finalizado</button>
      </div>
    </div>
  );
};

export default ServiceFilters;
