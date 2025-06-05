export const fetchPersonIndex = async (): Promise<string[]> => {
  const res = await fetch("/api/personIndex");
  return res.json();
};

export const fetchPersonById = async (id: string): Promise<any> => {
  const res = await fetch(`/api/persons/${id}`);
  return res.json();
};

export const fetchMediaByPersonId = async (id: string): Promise<any> => {
  const res = await fetch(`/api/uploaded?personId=${id}`);
  return res.json();
};
