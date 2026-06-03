import { useEffect, useState } from "react";
import { getServices } from "./service.api";

export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getServices();

        setServices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredServices = services.filter((service) => {
    const searchText = search.toLowerCase();

    const customerMatch = service.customer?.name
      ?.toLowerCase()
      .includes(searchText);

    const codeMatch = service.code?.toLowerCase().includes(searchText);

    const phoneMatch = service.customer?.phone
      ?.toLowerCase()
      .includes(searchText);

    const statusMatch = !status || status === "all" ? true : service.status === status;

    return (customerMatch || codeMatch || phoneMatch) && statusMatch;
  });

  return {
    services: filteredServices,

    loading,

    search,
    setSearch,

    status,
    setStatus,
  };
}
