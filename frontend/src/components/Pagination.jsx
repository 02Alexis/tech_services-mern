const Pagination = ({ page, setPage, pagination }) => {
  if (!pagination) {
    return null;
  }

  return (
    <div
      className="
        flex
        justify-center
        items-center
        gap-4
        mt-6
      "
    >
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="
          px-4
          py-2
          border
          rounded-lg
          disabled:opacity-50
        "
      >
        Anterior
      </button>

      <span>
        Página {page} de {pagination.totalPages}
      </span>

      <button
        disabled={page === pagination.totalPages}
        onClick={() => setPage(page + 1)}
        className="
          px-4
          py-2
          border
          rounded-lg
          disabled:opacity-50
        "
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
