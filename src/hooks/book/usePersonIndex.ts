import { useEffect, useState } from "react";

export const usePersonIndex = () => {
  const [personIndex, setPersonIndex] = useState<string[]>([]);

  useEffect(() => {
    const fetchIndex = async () => {
      const res = await fetch("/api/personIndex");
      const data = await res.json();
      setPersonIndex(data);
    };
    fetchIndex();
  }, []);

  return personIndex;
};
