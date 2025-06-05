import { useCallback } from "react";

export const useFetchPersonDataT = (
  bookSequence: string[],
  personData: Record<number, any>,
  setPersonData: any,
  mediaData: Record<number, any>,
  setMediaData: any
) => {
  const fetchPersonData = useCallback(async (index: number) => {
    if (personData[index]) return;
    const personId = bookSequence[index].id;
    console.log("personIdaaaaaaaaaaaaaaaaaaaaaaa: ",bookSequence )
    if (!personId) return;

    const [personRes, mediaRes] = await Promise.all([
      fetch(`/api/persons/${personId}`),
      fetch(`/api/uploaded?personId=${personId}`),
    ]);

    const person = await personRes.json();
    const media = await mediaRes.json();

    setPersonData((prev: any) => ({ ...prev, [index]: person }));
    setMediaData((prev: any) => ({ ...prev, [index]: media }));
  }, [bookSequence, personData, mediaData]);

  return fetchPersonData;
};
