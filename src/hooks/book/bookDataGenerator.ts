// bookDataGenerator.ts

export type PageData =
  | { type: "cover" }
  | { type: "person"; personId: string }
  | { type: "tree"; rootId: string };

type Person = {
  id: string;
  generation: number;
};

type FamilyMap = Record<string, Person[]>;
type GenerationMap = Record<number, string[]>;

export function buildBookSequence(
  genMap: GenerationMap,
  familyMap: FamilyMap
): PageData[] {
  const result: PageData[] = [{ type: "cover" }];

  const sortedGenKeys = Object.keys(genMap)
    .map(Number)
    .sort((a, b) => a - b);

  for (const gen of sortedGenKeys) {
    const personIds = genMap[gen];

    // Step 1: Show all genX people
    for (const id of personIds) {
      result.push({ type: "person", personId: id });
    }

    // Step 2: Show tree for this generation (optional - show one root)
    if (personIds.length > 0) {
      result.push({ type: "tree", rootId: personIds[0] });
    }

    // Step 3: For each person in this gen, show their children in order
    for (const id of personIds) {
      const children = familyMap[id] || [];
      if (children.length > 0) {
        result.push({ type: "tree", rootId: id });
        for (const child of children) {
          result.push({ type: "person", personId: child.id });
        }
      }
    }
  }

  return result;
}
