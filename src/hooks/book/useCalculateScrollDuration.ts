import { useEffect } from "react";

export const useCalculateScrollDuration = ({
  flipIndex,
  personData,
  showCover,
  singleDescriptionRef,
  setCurrentDurations,
}: {
  flipIndex: number;
  personData: Record<number, any>;
  showCover: boolean;
  singleDescriptionRef: React.RefObject<HTMLDivElement>;
  setCurrentDurations: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}) => {
  useEffect(() => {
    const personLogicalIndex = Math.floor(flipIndex / 2);
    const person = personData[personLogicalIndex];
    if (!person || showCover) return;

    const timeout = setTimeout(() => {
      requestAnimationFrame(() => {
        const el = singleDescriptionRef.current;
        if (!el) return;

        const containerHeight = el.clientHeight;
        const contentHeight = el.scrollHeight;
        const distance = contentHeight - containerHeight;
        const speed = 10;

        let duration = distance > 0 ? Math.max(distance / speed, 5) : 0;
        duration = Math.max(duration, 20); // Хамгийн багадаа 20 секунд

        setCurrentDurations((prev) => ({
          ...prev,
          [personLogicalIndex]: duration,
        }));
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [flipIndex, personData, showCover]);
};
