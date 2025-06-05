import { useEffect, MutableRefObject } from "react";

export const useAutoScroll = ({
  setActiveTree,
  flipIndex,
  currentDurations,
  showCover,
  singleDescriptionRef,
  scrollRef,
  onAutoFlip,
}: {
  setActiveTree: string | null,
  flipIndex: number;
  currentDurations: Record<number, number>;
  showCover: boolean;
  singleDescriptionRef: MutableRefObject<HTMLDivElement | null>;
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  onAutoFlip: () => void;
}) => {
  useEffect(() => {
    const personLogicalIndex = Math.floor(flipIndex / 2);
    const duration = currentDurations[personLogicalIndex];
    if (!scrollRef.current || showCover || !duration) return;

    const container = singleDescriptionRef.current;
    const content = scrollRef.current;

    if (!container || !content) return;

    const distance = content.scrollHeight - container.clientHeight;
    const durationMs = duration * 1000;

    let startTime: number | null = null;
    let animationFrameId: number;
    let triggered = false;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / durationMs, 1);
      container.scrollTop = distance * progress;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else if (!triggered) {
        triggered = true;
          setActiveTree(null);
        setTimeout(() => onAutoFlip(), 3000);
      }
    };

    container.scrollTop = 0;
    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [flipIndex, currentDurations, showCover]);
};
