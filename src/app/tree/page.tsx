"use client"
import CircleTree from "@/components/CircleTree";
import Book from "@/components/Book";
import { useState } from "react";
import MultiCircleTree from "@/components/MultiCircleTree";

export default function HomePage() {
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  const root = {
    id: "temuujin",
    name: "Тэмүүжин",
    imageUrl: "/images/temuujin.jpg",
  };

  const children = [
    { id: "zuchi", name: "Зүчи", imageUrl: "/images/zuchi.jpg" },
    { id: "tsagadai", name: "Цагадай", imageUrl: "/images/tsagadai.jpg" },
    { id: "ogedei", name: "Өгэдэй", imageUrl: "/images/ogedei.jpg" },
    { id: "tului", name: "Тулуй", imageUrl: "/images/tului.jpg" },
  ];

  
  return (
    <>
      {selectedPersonId ? (
        <Book
        //   startPersonId={selectedPersonId}
        //   onEnd={() => setSelectedPersonId(null)}
        />
      ) : (
        // <CircleTree
        //   centerPerson={root}
        //   children={children}
        //   onSelectPerson={(id) => setSelectedPersonId(id)}
        // />
        <MultiCircleTree
  centerPerson={{ id: "temuujin", name: "Тэмүүжин", imageUrl: "/images/temuujin.jpg" }}
  children={[
    { id: "zuchi", name: "Зүчи", imageUrl: "/images/zuchi.jpg" },
    { id: "tsagadai", name: "Цагадай", imageUrl: "/images/tsagadai.jpg" },
    { id: "ogedei", name: "Өгэдэй", imageUrl: "/images/ogedei.jpg" },
    { id: "tului", name: "Тулуй", imageUrl: "/images/tului.jpg" },
  ]}
  grandChildrenMap={{
    tului: [
      { id: "munkh", name: "Мөнх хаан", imageUrl: "/images/munkh.jpg" },
      { id: "hubilai", name: "Хубилай", imageUrl: "/images/hubilai.jpg" },
    ],
  }}
/>

      )}
    </>
  );
}
