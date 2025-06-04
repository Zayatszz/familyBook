// Refactored Book.tsx
import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

const Book: React.FC = () => {
  const flipBookRef = useRef<any>(null);
  const [showCover, setShowCover] = useState(true);
  const [isFlippingCover, setIsFlippingCover] = useState(false);
  const [flipIndex, setFlipIndex] = useState(0);
  const [personIndex, setPersonIndex] = useState<string[]>([]);
  const [personData, setPersonData] = useState<Record<number, any>>({});
  const [mediaData, setMediaData] = useState<Record<number, any[]>>({});
  const singleDescriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchIndex = async () => {
      console.log("iishee orjinuda")
      const res = await fetch("/api/personIndex");
      const data = await res.json();
      setPersonIndex(data);
      console.log("check index data: ", data)
    };
    fetchIndex();
  }, []);

 const handleCoverClick = () => {
  setFlipIndex(0);
  const personLogicalIndex = Math.floor(0);
  fetchPersonData(personLogicalIndex);
  setIsFlippingCover(true);

  setTimeout(() => {
    setShowCover(false);

    // ✅ FlipBook бүрэн mount болсны дараа 200ms хүлээгээд scroll trigger хийе
    setTimeout(() => {
      if (flipBookRef.current) {
        flipBookRef.current.pageFlip().flip(0); // trigger flip event
      }
    }, 200);
  }, 2000); // энэ нь cover flip анимэйшний хугацаа
};


  const handlePageFlip = (e: any) => {
    const newIndex = e.data;
    setFlipIndex(newIndex);
    const personLogicalIndex = Math.floor(newIndex / 2);
    fetchPersonData(personLogicalIndex);
  };

  const fetchPersonData = async (index: number) => {
    console.log("check index: ", index)
    if (personData[index]) return;
    const personId = personIndex[index];
    console.log("check personId: ", personId)
    if (!personId) return;

    const res = await fetch(`/api/persons/${personId}`);
    const person = await res.json();
    console.log("check person: ", person)

    const mediaRes = await fetch(`/api/uploaded?personId=${personId}`);
    const media = await mediaRes.json();
    console.log("media: ", media)

    setPersonData((prev) => ({ ...prev, [index]: person }));
    setMediaData((prev) => ({ ...prev, [index]: media }));
  };

  

useEffect(() => {
  const personLogicalIndex = Math.floor(flipIndex / 2);
  const person = personData[personLogicalIndex];

  if (!person || showCover) return;

  const timeout = setTimeout(() => {
    console.log("iiishee oryoo");
    requestAnimationFrame(() => {
      const el = singleDescriptionRef.current;
      if (!el) return;

      const containerHeight = el.clientHeight;
      const contentHeight = el.scrollHeight;
      const distance = contentHeight - containerHeight;
      const speed = 10; // илүү удаан гүйлгэх
      const duration = distance > 0 ? Math.max(distance / speed, 5) : 0;
      console.log("duration:", duration);
      setCurrentDuration(duration);
    });
  }, 300);

  return () => clearTimeout(timeout);
}, [flipIndex, personData, showCover]);


  useEffect(() => {
    if (!audioRef.current) return;
    const totalPages = personIndex.length * 2;
    if (flipIndex >= totalPages - 1) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [flipIndex, showCover]);

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

  const [currentMediaIndex, setCurrentMediaIndex] = useState<Record<number, number>>({});

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
    }, currentUrl.includes(".mp4") ? 8000 : 5000); // бичлэг удаан тоглоно

    timers.push(timeout);
  });

  return () => timers.forEach(clearTimeout);
}, [mediaData, currentMediaIndex]);

const autoScrollTriggeredRef = useRef(false);

const scrollRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  if (!scrollRef.current || showCover) return;

  const container = singleDescriptionRef.current;
  const content = scrollRef.current;

  if (!container || !content) return;

  const distance = content.scrollHeight - container.clientHeight;
  const durationMs = currentDuration * 1000;

  let startTime: number | null = null;
  let animationFrameId: number;

  autoScrollTriggeredRef.current = false; // ✅ always reset on new page

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed / durationMs, 1);
    container.scrollTop = distance * progress;

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else if (!autoScrollTriggeredRef.current) {
      autoScrollTriggeredRef.current = true;

      // ✅ 3 сек хүлээгээд дараагийн хуудсанд flip хийнэ (зөвхөн нэг удаа)
      setTimeout(() => {
        const totalPages = personIndex.length * 2;
        if (flipBookRef.current && flipIndex < totalPages - 1) {
          flipBookRef.current.pageFlip().flipNext();
        }
      }, 3000);
    }
  };

  container.scrollTop = 0;
  animationFrameId = requestAnimationFrame(step);

  return () => cancelAnimationFrame(animationFrameId);
}, [flipIndex, currentDuration, showCover]);
useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = 0.4; // 0.0 (чимээгүй) - 1.0 (хамгийн чанга)
  }
}, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/taliinMongol.mp3" autoPlay loop hidden />
      {showCover ? (
        <div className="cover-wrapper" onClick={handleCoverClick}>
          <div
            className={`page-content cover ${isFlippingCover ? "flip-out" : ""}`}
            style={{
              backgroundImage: "url('/nuur.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "900px",
              height: "600px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          />
        </div>
      ) : (
        <HTMLFlipBook
          ref={flipBookRef}
          onFlip={handlePageFlip}
          width={768}
          height={700}
          maxShadowOpacity={0.5}
          drawShadow
          showCover={false}
          size="fixed"
          mobileScrollSupport={false}
          className="flipbook-custom"
        >
          {personIndex.map((id, i) => [
            <div className="page" key={`${id}-desc`}>
              <div className="page-content">
                
                <div className="text-side single-page">
                   <div className="side-image-wrapper">
                  {/* <img
                     src={mediaData[i].urls[currentMediaIndex[i] ?? 0]}
                    alt="side"
                    className="side-image"
                  /> */}
                  {mediaData[i]?.nameUrl && (
                  <img
                    src={mediaData[i].nameUrl}
                    alt="Монгол бичгийн нэр"
                    className="side-image"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}

                </div>
                <div  className="text-content">
                    <h2 className="pokemon-name">Хошууд овогт Сүхээгийн {personData[i]?.lastName}гийн {personData[i]?.firstName} </h2>
                    <div
                      ref={(el) => {
                        if (i === Math.floor(flipIndex / 2)) singleDescriptionRef.current = el;
                      }}
                      className="pokemon-description"
                    >
                      <div ref={i === Math.floor(flipIndex / 2) ? scrollRef : null}>
                        {personData[i]?.description}
                      </div>
                    </div>

                </div>
      
                


                </div>
              </div>
            </div>,
            

<div className="page" key={`${id}-media`}>
  <div className="page-content media-wrapper">
    {mediaData[i]?.urls?.length ? (
      mediaData[i].urls[currentMediaIndex[i] ?? 0].includes(".mp4") ? (
        <video
          className="media-frame"
          src={mediaData[i].urls[currentMediaIndex[i] ?? 0]}
          autoPlay
          muted
          controls
        />
      ) : (
        <div className="media-container">
          <img
            className="media-blur-bg"
            src={mediaData[i].urls[currentMediaIndex[i] ?? 0]}
            alt="background blur"
          />
          <img
            className="media-frame"
            src={mediaData[i].urls[currentMediaIndex[i] ?? 0]}
            alt="person"
          />
        </div>
      )
    ) : (
      <div>Loading media...</div>
    )}
  </div>
</div>


          ])}
        </HTMLFlipBook>
      )}
    </>
  );
};

export default Book;
