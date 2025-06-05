import { useEffect, useState } from "react";

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  generation: number;
  orderInFamily?: number; // ✨ энэ талбар орсон эсэхээ баталгаажуул
  imageUrl?: string;
  nameUrl?: string;
};

export const usePersonsGroupedByGeneration = () => {
  const [grouped, setGrouped] = useState<Record<number, Person[]>>({});
  const [personMap, setPersonMap] = useState<Record<string, Person>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPersons = async () => {
      const res = await fetch("/api/persons");
      const data: Person[] = await res.json();

      const groupedMap: Record<number, Person[]> = {};
      const map: Record<string, Person> = {};

      data.forEach((person) => {
        const gen = person.generation ?? 0;
        if (!groupedMap[gen]) groupedMap[gen] = [];
        groupedMap[gen].push(person);
        map[person.id] = person;
      });

      // ✨ БҮХ generation-г orderInFamily-аар сортлоно
      Object.keys(groupedMap).forEach((genStr) => {
        const gen = parseInt(genStr, 10);
        groupedMap[gen].sort(
          (a, b) => (a.orderInFamily ?? Number.MAX_SAFE_INTEGER) - (b.orderInFamily ?? Number.MAX_SAFE_INTEGER)
        );
      });
      console.log("grouped map in by Gennssssssssss: ", groupedMap)
 console.log(" map in by Gennssssssssss: ", map)

      setGrouped(groupedMap);
      setPersonMap(map);
      setIsLoading(false);
    };

    fetchPersons();
  }, []);

  return { groupedByGeneration: grouped, personMap, isLoading };
};
