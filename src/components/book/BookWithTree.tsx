"use client";
import React, { useEffect, useState } from "react";
import Book from "@/components/book/Book";
import RecursiveCircleTree from "@/components/RecursiveCircleTree";
// import { personMap, familyMap } from "@/data/family";

export default function BookWithTree() {
  const [stage, setStage] = useState<"tree" | "book">("book");

  const personMap = {
  // Төв хүн
  sukhee: { id: "sukhee", name: "Сүхээ", imageUrl: "/images/sukhee.jpg" },

  // 1-р үе
  doljmaa: { id: "doljmaa", name: "Должмаа", imageUrl: "/images/doljmaa.jpg" },
  oidov: { id: "oidov", name: "Ойдов", imageUrl: "/images/oidov.jpg" },
  charvaa: { id: "charvaa", name: "Чарваа", imageUrl: "/images/charvaa.jpg" },

  // Чарваагийн хүүхдүүд
  igee: { id: "igee", name: "Игээ", imageUrl: "/images/igee.jpg" },
  gungaa: { id: "gungaa", name: "Гунгаа", imageUrl: "/images/gungaa.jpg" },
  togtoh: { id: "togtoh", name: "Тогтох", imageUrl: "/images/togtoh.jpg" },
  jargal: { id: "jargal", name: "Жаргал", imageUrl: "/images/jargal.jpg" },
  tuyaa: { id: "tuyaa", name: "Туяа", imageUrl: "/images/tuyaa.jpg" },
  tsevvenjav: { id: "tsevvenjav", name: "Цэвээнжав", imageUrl: "/images/tsevvenjav.jpg" },
  lkhamaa: { id: "lkhamaa", name: "Лхамаа", imageUrl: "/images/lkhamaa.jpg" },
  tsevvegjav: { id: "tsevvegjav", name: "Цэвэгжав", imageUrl: "/images/tsevvegjav.jpg" },

  // Ойдовын хүүхдүүд
  densmaa: { id: "densmaa", name: "Дэнсмаа", imageUrl: "/images/densmaa.jpg" },
  tsevvenravdan: { id: "tsevvenravdan", name: "Цэвээнравдан", imageUrl: "/images/tsevvenravdan.jpg" },
  oidov_batjargal: { id: "oidov_batjargal", name: "Батжаргал", imageUrl: "/images/oidov_batjargal.jpg" },
  enkhtuya: { id: "enkhtuya", name: "Энхтуяа", imageUrl: "/images/enkhtuya.jpg" },
  batsuur: { id: "batsuur", name: "Батсуурь", imageUrl: "/images/batsuur.jpg" },
  baatarjav: { id: "baatarjav", name: "Баатаржав", imageUrl: "/images/baatarjav.jpg" },
  tsetsegmaa: { id: "tsetsegmaa", name: "Цэцэгмаа", imageUrl: "/images/tsetsegmaa.jpg" },
  tugsjargal: { id: "tugsjargal", name: "Төгсжаргал", imageUrl: "/images/tugsjargal.jpg" },
  tsermaa: { id: "tsermaa", name: "Цэрмаа", imageUrl: "/images/tsermaa.jpg" },
  otgon: { id: "otgon", name: "Отгон", imageUrl: "/images/otgon.jpg" },
  bayanmunkh: { id: "bayanmunkh", name: "Баянмөнх", imageUrl: "/images/bayanmunkh.jpg" },
  dolgormaa: { id: "dolgormaa", name: "Долгормаа", imageUrl: "/images/dolgormaa.jpg" },

  // Должмаагийн хүүхдүүд
  yanjmaa: { id: "yanjmaa", name: "Янжмаа", imageUrl: "/images/yanjmaa.jpg" },
  buyantur: { id: "buyantur", name: "Буянтөр", imageUrl: "/images/buyantur.jpg" },
  oyun: { id: "oyun", name: "Оюун", imageUrl: "/images/oyun.jpg" },
  doljmaa_batjargal: { id: "doljmaa_batjargal", name: "Батжаргал", imageUrl: "/images/doljmaa_batjargal.jpg" },
  khurelbaatar: { id: "khurelbaatar", name: "Хүрэлбаатар", imageUrl: "/images/khurelbaatar.jpg" },
  doljmaa_togtoh: { id: "doljmaa_togtoh", name: "Тогтох", imageUrl: "/images/doljmaa_togtoh.jpg" },
  battulga: { id: "battulga", name: "Баттулга", imageUrl: "/images/battulga.jpg" },
  tsevven: { id: "tsevven", name: "Цэвээн", imageUrl: "/images/tsevven.jpg" },
  otgonbayar: { id: "otgonbayar", name: "Отгонбаяр", imageUrl: "/images/otgonbayar.jpg" },

    khulan: { id: "khulan", name: "Хулан", imageUrl: "/images/khulan.jpg" },
  zaya: { id: "zaya", name: "Заяа", imageUrl: "/images/zaya.jpg" },
  temuulen: { id: "temuulen", name: "Тэмүүлэн", imageUrl: "/images/temuulen.jpg" },

};

const familyMap = {
  sukhee: [
    personMap.doljmaa,
    personMap.oidov,
    personMap.charvaa,
  ],
  charvaa: [
    personMap.igee,
    personMap.gungaa,
    personMap.togtoh,
    personMap.jargal,
    personMap.tuyaa,
    personMap.tsevvenjav,
    personMap.lkhamaa,
    personMap.tsevvegjav,
  ],
  oidov: [
    personMap.densmaa,
    personMap.tsevvenravdan,
    personMap.oidov_batjargal,
    personMap.enkhtuya,
    personMap.batsuur,
    personMap.baatarjav,
    personMap.tsetsegmaa,
    personMap.tugsjargal,
    personMap.tsermaa,
    personMap.otgon,
    personMap.bayanmunkh,
    personMap.dolgormaa,
  ],
  doljmaa: [
    personMap.yanjmaa,
    personMap.buyantur,
    personMap.oyun,
    personMap.doljmaa_batjargal,
    personMap.khurelbaatar,
    personMap.doljmaa_togtoh,
    personMap.battulga,
    personMap.tsevven,
    personMap.otgonbayar,
  ],
    tsevvenjav: [
    personMap.khulan,
    personMap.zaya,
    personMap.temuulen,
  ],

};

  // 5 сек дараа ном руу шилжих
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStage("book");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {stage === "tree" ? (
        <div className="w-full h-screen flex items-center justify-center bg-white">
          <RecursiveCircleTree
            rootId="sukhee"
            personMap={personMap}
            familyMap={familyMap}
          />
        </div>
      ) : (
        <Book initialIndex={0} />
      )}
    </>
  );
}
