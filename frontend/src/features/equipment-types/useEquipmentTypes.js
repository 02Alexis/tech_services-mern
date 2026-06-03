import { useEffect, useState } from "react";
import { getEquipmentTypes } from "./equipmentType.api";

export default function useEquipmentTypes() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getEquipmentTypes();

      setTypes(data);
    };

    load();
  }, []);

  return types;
}
