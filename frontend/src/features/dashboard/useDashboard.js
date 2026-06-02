import { useEffect, useState } from "react";
import { getDashboard } from "./dashboard.api";

export default function useDashboard() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getDashboard();

        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    data,
    loading,
  };
}
