import { useEffect } from "react";

export const useAutoMediaSwitch = (
  mediaData: Record<number, any>,
  currentMediaIndex: Record<number, number>,
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<Record<number, number>>>
) => {
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    Object.keys(mediaData).forEach((key) => {
      const i = parseInt(key);
      const urls = mediaData[i]?.urls;
      if (!urls || urls.length === 0) return;

      const currentIndex = currentMediaIndex[i] ?? 0;
      const currentUrl = urls[currentIndex];

      const timeout = setTimeout(() => {
        setCurrentMediaIndex((prev) => ({
          ...prev,
          [i]: (currentIndex + 1) % urls.length,
        }));
      }, currentUrl.includes(".mp4") ? 8000 : 5000);

      timers.push(timeout);
    });

    return () => timers.forEach(clearTimeout);
  }, [mediaData, currentMediaIndex]);
};
