import React, { useEffect, useState } from "react";

const imageUrls = [
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png`,
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png`,
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/125.png`,
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/185.png`,
];

const ImageSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    }, 2000); // 2 секунд тутамд солигдоно

    return () => clearInterval(interval); // цэвэрлэнэ
  }, []);

  return (
    <img
      src={imageUrls[currentImageIndex]}
      alt={`Slide ${currentImageIndex}`}
      style={{
        transition: "opacity 0.5s ease",
        maxHeight: "100%",
        maxWidth: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default ImageSlider;
