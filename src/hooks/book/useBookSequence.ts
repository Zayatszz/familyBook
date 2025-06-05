// hooks/book/useBookSequence.ts

import { useMemo } from "react";

export type BookPageItem =
  | { type: "cover" }
  | { type: "person"; id: string }
  | { type: "tree"; rootId: string };

export function useBookSequence(
  generationMap: Record<number, string[]>,
  familyMap: Record<string, { id: string }[]>
): BookPageItem[] {
  return useMemo(() => {
    const result: BookPageItem[] = [];
    const visited = new Set<string>();

    // 1. Cover
    // result.push({ type: "cover" });

     const generations = Object.keys(generationMap)
      .map(Number)
      .sort((a, b) => a - b);

      console.log("generations: ", generations)
    // 2. Recursive generator
    // const addPersonTreeRecursively = (rootId: string) => {
    //   // 2.1 Add person page
    //   if (!visited.has(rootId) && rootId==gen1[0].id) {
    //     console.log("rootId: ", rootId)
    //     result.push({ type: "person", id: rootId });
    //     visited.add(rootId);
    //   }

    //   console.log("check fam map", familyMap[rootId])
    //   // 2.2 Add tree
    //   if ((familyMap[rootId] || []).length > 0) {
    //     console.log("iishee orohgui bnu")
    //     result.push({ type: "tree", rootId });

    //     for (const child of familyMap[rootId]) {
    //         result.push({ type: "person", id: child.id });
    //     //   addPersonTreeRecursively(child.id); // 👈 рекурсив дуудлага
    //     }
    //       for (const child of familyMap[rootId]) {
    //         if ((familyMap[child.id] || []).length > 0) {
    //             console.log("iishee orohgui bnu")
    //             result.push({ type: "tree", rootId });

    //             for (const childz of familyMap[child.id]) {
    //                 result.push({ type: "person", id: childz.id });
    //             //   addPersonTreeRecursively(child.id); // 👈 рекурсив дуудлага
    //             }
               
    //         }
    //         // result.push({ type: "person", id: child.id });
    //     //   addPersonTreeRecursively(child.id); // 👈 рекурсив дуудлага
    //     }
    //   }
    // };

    // // 3. Gen 1 бүх хүмүүсийг эхлүүлж өгнө
    const gen1 = generationMap[1] || [];
    // for (const id of gen1) {
    //   addPersonTreeRecursively(id.id);
    // }


    
    const addPersonTree = (id: string) => {

      if (!visited.has(id) && id==gen1[0]) {
        result.push({ type: "person", id: id.id });
        visited.add(id);
      }
      
  console.log("id: ", id)
      const children = familyMap[id.id] || [];
      console.log("children: ", children)
      if (children.length > 0) {
        result.push({ type: "tree", rootId: id });

        for (const child of children) {
          if (!visited.has(child.id)) {
            result.push({ type: "person", id: child.id });
            visited.add(child.id);
          }
        }
      }
    };


       for (const gen of generations) {
      const people = generationMap[gen];
      for (const personId of people) {
        console.log("personId: ", personId)
        addPersonTree(personId);
      }
    }

    return result;
  }, [generationMap, familyMap]);
}

