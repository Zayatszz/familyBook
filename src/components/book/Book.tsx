// Refactored Book.tsx
import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import PersonPage from "./PersonPage";
import MediaPage from "./MediaPage";
import { usePersonIndex } from "@/hooks/book/usePersonIndex";
import { useAutoMediaSwitch } from "@/hooks/book/useAutoMediaSwitch";
import { useFetchPersonData } from "@/hooks/book/useFetchPersonData";
import { useFetchPersonDataT } from "@/hooks/book/useFetchPersonDataT";
import { useAutoScroll } from "@/hooks/book/useAutoScroll";
import { useAudioControl } from "@/hooks/book/useAudioControl";
import { useFlipControls } from "@/hooks/book/useFlipControls";
import { useCalculateScrollDuration } from "@/hooks/book/useCalculateScrollDuration";
import CoverPage from "./CoverPage";
import { usePersonsGroupedByGeneration } from "@/hooks/book/usePersonsGroupedByGeneration";
import { useBookSequence } from "@/hooks/book/useBookSequence";
import RecursiveCircleTree from "../RecursiveCircleTree";

const Book: React.FC<{ initialIndex?: number }> = ({ initialIndex = 0 }) => {
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
    const [activeTree, setActiveTree] = useState<string | null>(null);


    const { groupedByGeneration, personMap, isLoading } = usePersonsGroupedByGeneration();

    const familyMap: Record<string, any[]> = {};
    Object.values(personMap).forEach((p) => {
        p.parentRelations?.forEach((rel) => {
            if (!familyMap[rel.parentId]) familyMap[rel.parentId] = [];
            familyMap[rel.parentId].push(p);
        });
    });

    Object.keys(familyMap).forEach((parentId) => {
        familyMap[parentId].sort((a, b) => (a.orderInFamily ?? Number.MAX_SAFE_INTEGER) - (b.orderInFamily ?? Number.MAX_SAFE_INTEGER));
    });
 
    const bookSequence = useBookSequence(groupedByGeneration, familyMap);

    console.log("familyMap in book: ", familyMap)
    console.log("groupedByGeneration in book: ", groupedByGeneration)
    console.log("bookSequence in book: ", bookSequence)

    const handleCoverClick = () => {
        if (bookSequence.length === 0) return;
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

    const [singlePageMode, setSinglePageMode] = useState(false);
    const handlePageFlip = (e: any) => {

        const newIndex = e.data;

        setFlipIndex(newIndex);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", newIndex)
        const personLogicalIndex = Math.floor(newIndex / 2);
        console.log("personLogicalIndexaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", personLogicalIndex)
        // fetchPersonData(personLogicalIndex);
        const currentEntry = bookSequence[personLogicalIndex];
        if (currentEntry?.type === "tree") {
            console.log("treeshdeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            setSinglePageMode(true);
        } else {
            console.log("hunshdeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", currentEntry)
            setSinglePageMode(false);
        }

        if (currentEntry?.type === "person") {
            fetchPersonData(personLogicalIndex);
        }
    };
    useEffect(() => {
        const personLogicalIndex = Math.floor(flipIndex / 2);
        const currentEntry = bookSequence[personLogicalIndex];

        if (currentEntry?.type === "tree") {
            // tree төрлийн хуудсанд автоматаар modal нээх
            setActiveTree(currentEntry.rootId.id);
        } else {
            setActiveTree(null);
        }
    }, [flipIndex]);


    // const handlePageFlip = (e: any) => {
    //     const newIndex = e.data;
    //     setFlipIndex(newIndex);
    //     const personLogicalIndex = Math.floor(newIndex / 2);
    //     fetchPersonData(personLogicalIndex);
    // };

    // Тухайн хуудсан дахь хүний зураг бичлэг зэрэг бусад бүх мэдээлэл
    const fetchPersonData = useFetchPersonDataT(
        bookSequence,
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
        setActiveTree,
        flipIndex,
        currentDurations,
        showCover,
        singleDescriptionRef,
        scrollRef,
        onAutoFlip: () => {
            const totalPages = bookSequence.length * 2;
            if (flipBookRef.current && flipIndex < totalPages - 1) {
                flipBookRef.current.pageFlip().flipNext();
            }
        },
    });


    useAudioControl({
        audioRef,
        flipIndex,
        showCover,
        personCount: bookSequence.length,
    });

    const handleCloseTreeModal = () => {
        setActiveTree(null);

        // Дараагийн хуудас руу flip хийх
        const totalPages = bookSequence.length * 2;
        if (flipBookRef.current && flipIndex < totalPages - 1) {
            flipBookRef.current.pageFlip().flipNext();
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/audio/taliinMongol.mp3" autoPlay loop hidden />
            {showCover ? (
                <CoverPage onClick={handleCoverClick} isFlipping={isFlippingCover} />
            ) : (
                <HTMLFlipBook
                    ref={flipBookRef}
                    onFlip={handlePageFlip}
                    width={singlePageMode ? 1536 : 768}
                    height={700}
                    size="fixed"
                    showCover={false}
                    drawShadow
                    mobileScrollSupport={false}
                    className="flipbook-custom"
                    //   minWidth={singlePageMode ? 768 : 768}
                    //   maxWidth={singlePageMode ? 768 : 1536}
                    minHeight={700}
                    maxHeight={700}
                    maxShadowOpacity={0.5}
                    style={{
                        transition: "width 0.4s ease",
                    }}
                >

                    {bookSequence.map((entry, i) => {
                        if (entry.type === "person") {
                            return [
                                <div className="page" key={`desc-${entry.id}`}>
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
                                <div className="page" key={`media-${entry.id}`}>
                                    <MediaPage
                                        index={i}
                                        mediaData={mediaData}
                                        currentMediaIndex={currentMediaIndex}
                                    />
                                </div>,
                            ];
                        } else if (entry.type === "tree") {
                            return [
                                <div className="page" key={`tree-${entry.rootId.id}-1`}>
                                    {/* <RecursiveCircleTree
    rootId={entry.rootId.id}
    personMap={personMap}
    familyMap={familyMap}
  /> */}
                                </div>,
                                <div className="page" key={`tree-${entry.rootId.id}-2`}>
                                    {/* <RecursiveCircleTree
    rootId={entry.rootId.id}
    personMap={personMap}
    familyMap={familyMap}
    focusOnlyChildren
  /> */}
                                </div>


                            ];
                        } else {
                            return null;
                        }
                    })}

                </HTMLFlipBook>
            )}
            {activeTree && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div
                        className="relative w-[1000px] max-w-[80%] h-[80%]  rounded-2xl  p-6 animate-fadein overflow-auto custom-scroll"
                    >
                        <button
                            onClick={handleCloseTreeModal}
                            className="absolute top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Хаах
                        </button>


                        <RecursiveCircleTree
                            rootId={activeTree}
                            personMap={personMap}
                            familyMap={familyMap}
                        />
                    </div>
                </div>
            )}



        </>
    );


};
export default Book;



