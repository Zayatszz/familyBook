import { useEffect } from "react";

export const useAudioControl = ({
  audioRef,
  flipIndex,
  showCover,
  personCount,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  flipIndex: number;
  showCover: boolean;
  personCount: number;
}) => {
  useEffect(() => {
    if (!audioRef.current) return;
    const totalPages = personCount * 2;

    if (flipIndex >= totalPages - 1) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [flipIndex, showCover, personCount]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);
};
