import { useEffect, useState } from "react";
import { getServices, searchServices } from "./service.api";

export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    loadServices();
  }, [page, debouncedSearch, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const loadServices = async () => {
    try {
      setLoading(true);

      const response = await searchServices(page, debouncedSearch, status);

      setServices(response.data);

      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    services,

    loading,

    search,
    setSearch,

    status,
    setStatus,

    page,
    setPage,

    pagination,
  };
}
