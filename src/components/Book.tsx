// Book.tsx
import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import ImageSlider from "./ImageSlider";

type Pokemon = {
  id: string;
  name: string;
  types: string[];
  description: string;
};

const Book: React.FC = () => {
  // const flipBookRef = useRef<any>(null);
const flipBookRef = useRef<any>(null);
  const [showCover, setShowCover] = useState(true);
  const [shouldFlipFirstPage, setShouldFlipFirstPage] = useState(false); // ✨ шинэ state
const [isFlippingCover, setIsFlippingCover] = useState(false);

  // ✨ cover дарахад
const handleCoverClick = () => {
  setIsFlippingCover(true); // flip анимэйшн эхлүүлнэ
//  setShowCover(false); 
  setTimeout(() => {
    setShowCover(false); // flip дуусмагц ном харуулна
    // setShouldFlipFirstPage(true); // дараагийн хуудас руу flip хийнэ
  }, 600); // анимэйшний хугацаатай ижил байх ёстой
};


  // ✨ showCover=false болсон үед flip хийх
  useEffect(() => {
    if (!showCover && shouldFlipFirstPage && flipBookRef.current) {
      setTimeout(() => {
        flipBookRef.current.pageFlip().flipNext();
        setShouldFlipFirstPage(false); // дахин битгий flip хийгээрэй
      }, 300); // ном render болох хугацаа
    }
  }, [showCover, shouldFlipFirstPage]);
  // const [showCover, setShowCover] = useState(true);

  const pokemonData: Pokemon[] = [
     {
      id: "006",
      name: "Цэвээнжав Заяа",
      types: ["Fire", "Flying"],
       description:
        "****!!!!!!!!!!!!!!!!!!!t messagi changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society End*****************************************)))))))))))))",
    
      },
    {
      id: "006",
      name: "Charizard",
      types: ["Fire", "Flying"],
       description:
        "****!!!!!!!!!!!!!!!!!!!t messagi changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society End*****************************************)))))))))))))",
    
      },
    {
      id: "025",
      name: "Pikachu",
      types: ["Electric"],
      description:
        "When Pikachu meet, they touch tails to exchange electricity as a greeting.",
    },
    {
      id: "125",
      name: "Electabuzz",
      types: ["Electric"],
      description:
        "Often kept at power plants to regulate electricity. Competes with others to attract lightning during storms.",
    },
    {
      id: "185",
      name: "Sudowoodo",
      types: ["Rock"],
      description:
        "Despite looking like a tree, its body is more like rock. Hates water and hides when it rains.",
    },
    {
      id: "448",
      name: "Lucario",
      types: ["Fighting", "Steel"],
      description:
        "****!!!!!!!!!!!!!!!!!!!t messagi changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile phones, tablet computers, smartwatches, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection The term originally referred to messages sent using the Short Message Service (SMS) on mobile devices. It has grown beyond alphanumeric text to include multimedia messages using the Multimedia Messaging Service (MMS) and Rich Communication Services (RCS), which can contain digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons), and on various instant messaging apps. Text messaging has been an extremely popular medium of communication since the turn of the century and has also influenced changes in society End*****************************************)))))))))))))",
    
      },
    {
      id: "658",
      name: "Greninja",
      types: ["Water", "Dark"],
      description:
        "Creates throwing stars from compressed water that can slice through metal when thrown at high speed.",
    },
    {
      id: "491",
      name: "Darkrai",
      types: ["Dark"],
      description:
        "A legendary Pokémon that appears on moonless nights, putting people to sleep and giving them nightmares.",
    },
  ];

  const descriptionRef = useRef<HTMLParagraphElement>(null);
const [shouldAnimate, setShouldAnimate] = useState(false);

useEffect(() => {
  const el = descriptionRef.current;
  if (el && el.scrollHeight > el.clientHeight) {
    setShouldAnimate(true); // текст багтахгүй бол animate
  }
}, []);

  const imageUrls = [
    `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png`,
     `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png`,
     `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/125.png`,
     `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/185.png`,
  ];
    const mediaItems = [
    { type: "image", url: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png" },
    { type: "image", url: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png" },
    { type: "video", url: "/video/food.mp4" },
    { type: "image", url: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/125.png" },
    { type: "image", url: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/185.png" },
  ];
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    useEffect(() => {
    const currentItem = mediaItems[currentMediaIndex];
    let timeout: any;

    if (currentItem.type === "video") {
      const video = document.createElement("video");
      video.src = currentItem.url;
      video.onloadedmetadata = () => {
        timeout = setTimeout(() => {
          setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
        }, video.duration * 1000);
      };
    } else {
      timeout = setTimeout(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [currentMediaIndex]);

const [currentImageIndex, setCurrentImageIndex] = useState(0);


useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  }, 5000); // 2 секунд тутамд зураг солигдоно

  return () => clearInterval(interval); // цэвэрлэх
}, []);
const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
const [animationDurations, setAnimationDurations] = useState<number[]>([]);

const [flipIndex, setFlipIndex] = useState(0);

const handlePageFlip = (e: any) => {
  setFlipIndex(e.data); // одоогийн хуудасны индекс
};

const singleDescriptionRef = useRef<HTMLParagraphElement | null>(null);
const [currentDuration, setCurrentDuration] = useState(0);

useEffect(() => {
  const timeout = setTimeout(() => {
    requestAnimationFrame(() => {
      const el = singleDescriptionRef.current;
      if (!el) return;

      const containerHeight = el.clientHeight;
      const contentHeight = el.scrollHeight;
      const distance = contentHeight - containerHeight;
      const speed = 40;
      const duration = distance > 0 ? Math.max(distance / speed, 2) : 0;

      console.log(
  `📄 Active page: ${flipIndex}, height=${containerHeight}, scroll=${contentHeight}, duration=${duration}s\n📝 Description: ${el.innerText}`
);

      setCurrentDuration(duration);
    });
  }, 300);

  return () => clearTimeout(timeout);
}, [flipIndex, showCover]);

// audio section:
 const audioRef = useRef<HTMLAudioElement>(null);
 useEffect(() => {
  if (!audioRef.current) return;

  const totalPages = pokemonData.length * 2; // 2 хуудсаар задарч байгааг харгалз
  if (flipIndex >= totalPages - 1) {
    audioRef.current.pause(); // Сүүлийн хуудас дээр зогсооно
  } else {
    audioRef.current.play().catch(() => {}); // Хэрэв тоглоогүй байвал үргэлжлүүлнэ
  }
}, [flipIndex, showCover]);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!flipBookRef.current) return;

    const pageFlip = flipBookRef.current.pageFlip();

    if (e.key === "ArrowRight") {
      pageFlip.flipNext();
    } else if (e.key === "ArrowLeft") {
      pageFlip.flipPrev();
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  return (
     <>
      {/* <audio ref={audioRef} src="/audio/piano.mp3" autoPlay hidden /> */}
      <audio ref={audioRef} src="/audio/piano.mp3" autoPlay loop hidden />

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
          drawShadow={true}
          showCover={false}
          size="fixed"
          mobileScrollSupport={false}
          className="flipbook-custom"
        >
          {pokemonData.map((pokemon, index) => [
            <div className="page" key={`${pokemon.id}-desc`}>
              <div className="page-content">
                <div className="text-side single-page">
                  <h2 className="pokemon-name">{pokemon.name} -{pokemon.id}</h2>
                  <p className="pokemon-number">#{pokemon.id} -{index}-{flipIndex}</p>
                  <div>
                    {pokemon.types.map((type) => (
                      <span key={type} className={`pokemon-type type-${type.toLowerCase()}`}>{type}</span>
                    ))}
                  </div>
                  <p
                    ref={(el) => {
                      if (index === flipIndex/2) {
                        singleDescriptionRef.current = el;
                      }
                    }}
                    className={`pokemon-description ${index === flipIndex/2 && currentDuration ? "animated-scroll" : ""}`}
                  >
                    <span style={{ animationDuration: `${currentDuration}s` }}>{pokemon.description}</span>
                  </p>
                </div>
                <div className="page-number">Хуудас {index * 2 + 1}</div>
              </div>
            </div>,
            <div className="page" key={`${pokemon.id}-image`}>
              <div className="page-content">
                <div className="">
                  {/* <ImageSlider /> */}
                  {mediaItems[currentMediaIndex].type === "video" ? (
                    <video src={mediaItems[currentMediaIndex].url} autoPlay muted controls style={{ width: "100%", height: "100%" }} />
                  ) : (
                    <img src={mediaItems[currentMediaIndex].url} alt="media"  style={{
        transition: "opacity 0.5s ease",
        maxHeight: "100%",
        maxWidth: "100%",
        objectFit: "contain",
      }} />
                  )}
                </div>
                <div className="page-number">Хуудас {index * 2 + 2}</div>
              </div>
            </div>
          ])}
        </HTMLFlipBook>
      )}
    </>
  );
};

export default Book;
