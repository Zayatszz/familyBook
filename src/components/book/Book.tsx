// Refactored Book.tsx
import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import PersonPage from "./PersonPage";
import MediaPage from "./MediaPage";
import { usePersonIndex } from "@/hooks/book/usePersonIndex";
import { useAutoMediaSwitch } from "@/hooks/book/useAutoMediaSwitch";
import { useFetchPersonData } from "@/hooks/book/useFetchPersonData";
import { useAutoScroll } from "@/hooks/book/useAutoScroll";
import { useAudioControl } from "@/hooks/book/useAudioControl";
import { useFlipControls } from "@/hooks/book/useFlipControls";
import { useCalculateScrollDuration } from "@/hooks/book/useCalculateScrollDuration";
import CoverPage from "./CoverPage";

const Book: React.FC <{ initialIndex?: number }> = ({ initialIndex = 0 }) =>{
    const flipBookRef = useRef<any>(null);
    const [showCover, setShowCover] = useState(true);
    const [isFlippingCover, setIsFlippingCover] = useState(false);
    // const [flipIndex, setFlipIndex] = useState(0);
    //   const [personIndex, setPersonIndex] = useState<string[]>([]);
    const [personData, setPersonData] = useState<Record<number, any>>({});
    const [mediaData, setMediaData] = useState<Record<number, any[]>>({});
    const singleDescriptionRef = useRef<HTMLParagraphElement | null>(null);
    const [currentDurations, setCurrentDurations] = useState<Record<number, number>>({});
    const [currentMediaIndex, setCurrentMediaIndex] = useState<Record<number, number>>({});
    const audioRef = useRef<HTMLAudioElement>(null);
    const [flipIndex, setFlipIndex] = useState(initialIndex);

    //Хүмүүсийг харуулах жагсаалт ямар байх дарааллыг авна аа.
    const personIndex = usePersonIndex();


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

    // Тухайн хуудсан дахь хүний зураг бичлэг зэрэг бусад бүх мэдээлэл
    const fetchPersonData = useFetchPersonData(
        personIndex,
        personData,
        setPersonData,
        mediaData,
        setMediaData
    );

    // тайлбарын уртыг тооцож урсах хугацааг тооцоолж буй хэсэг
    useCalculateScrollDuration({
        flipIndex,
        personData,
        showCover,
        singleDescriptionRef,
        setCurrentDurations,
    });

    // keyboard-ий сумаа ашиглан хуудас эргүүлэх хэсэг
    useFlipControls(flipBookRef);


    //   Зураг бичлэгүүд автоор switch хийж буйг тохируулж байгаа хэсэг
    useAutoMediaSwitch(mediaData, currentMediaIndex, setCurrentMediaIndex);

    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Тухайн хуудасны тайлбар дуусах эсвэл default-аар тавьсан duration дуусахад автоор дараагийн хуудас руу орох, description урсаж буй хэсэг
    useAutoScroll({
        flipIndex,
        currentDurations,
        showCover,
        singleDescriptionRef,
        scrollRef,
        onAutoFlip: () => {
            const totalPages = personIndex.length * 2;
            if (flipBookRef.current && flipIndex < totalPages - 1) {
                flipBookRef.current.pageFlip().flipNext();
            }
        },
    });


    useAudioControl({
        audioRef,
        flipIndex,
        showCover,
        personCount: personIndex.length,
    });

    return (
        <>
            <audio ref={audioRef} src="/audio/taliinMongol.mp3" autoPlay loop hidden />
            {showCover ? (
                <CoverPage onClick={handleCoverClick} isFlipping={isFlippingCover} />
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
                            <PersonPage
                                index={i}
                                flipIndex={flipIndex}
                                personData={personData}
                                mediaData={mediaData}
                                currentMediaIndex={currentMediaIndex}
                                singleDescriptionRef={singleDescriptionRef}
                                scrollRef={scrollRef}
                            />

                        </div>,
                        <div className="page" key={`${id}-media`}>
                            <MediaPage
                                index={i}
                                mediaData={mediaData}
                                currentMediaIndex={currentMediaIndex}
                            />
                        </div>
                    ])}
                </HTMLFlipBook>
            )}
        </>
    );
};
export default Book;
