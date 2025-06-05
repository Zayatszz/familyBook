import React from "react";

type PersonPageProps = {
  id: string;
  index: number;
  flipIndex: number;
  personData: Record<number, any>;
  mediaData: Record<number, any>;
  currentMediaIndex: Record<number, number>;
  singleDescriptionRef: React.MutableRefObject<HTMLDivElement | null>;
  scrollRef: React.RefObject<HTMLDivElement>;
};

const PersonPage: React.FC<PersonPageProps> = ({
  index,
  flipIndex,
  personData,
  mediaData,
  currentMediaIndex,
  singleDescriptionRef,
  scrollRef,
}) => {
  const displayName =
  personData[index]?.nickname ||
  `${personData[index]?.lastName || ""} ${personData[index]?.firstName || ""}`;

  return (
    <>
        <div className="page-content">
          <div className="text-side single-page">
            <div className="side-image-wrapper">
              {mediaData[index]?.nameUrl && (
                <img
                  src={mediaData[index].nameUrl}
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
            <div className="text-content">
              <h2 className="pokemon-name">
                {displayName}
              </h2>
              <div
                ref={(el) => {
                  if (index === Math.floor(flipIndex / 2)) singleDescriptionRef.current = el;
                }}
                className="pokemon-description"
              >
                <div ref={index === Math.floor(flipIndex / 2) ? scrollRef : null}>
                  {personData[index]?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default PersonPage;
