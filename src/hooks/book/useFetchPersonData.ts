import { useCallback } from "react";

export const useFetchPersonData = (
  personIndex: string[],
  personData: Record<number, any>,
  setPersonData: any,
  mediaData: Record<number, any>,
  setMediaData: any
) => {
  const fetchPersonData = useCallback(async (index: number) => {
    if (personData[index]) return;
    const personId = personIndex[index];
    if (!personId) return;

    const [personRes, mediaRes] = await Promise.all([
      fetch(`/api/persons/${personId}`),
      fetch(`/api/uploaded?personId=${personId}`),
    ]);

    const person = await personRes.json();
    const media = await mediaRes.json();

    setPersonData((prev: any) => ({ ...prev, [index]: person }));
    setMediaData((prev: any) => ({ ...prev, [index]: media }));
  }, [personIndex, personData, mediaData]);

  return fetchPersonData;
};
