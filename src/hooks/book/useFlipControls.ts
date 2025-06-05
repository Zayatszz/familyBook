import { useEffect } from "react";

export const useFlipControls = (
  flipBookRef: React.RefObject<any>
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!flipBookRef.current) return;
      const pageFlip = flipBookRef.current.pageFlip();

      if (e.key === "ArrowRight") pageFlip.flipNext();
      else if (e.key === "ArrowLeft") pageFlip.flipPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
};
