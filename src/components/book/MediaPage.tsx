import React from "react";

type MediaPageProps = {
  index: number;
  mediaData: Record<number, any>;
  currentMediaIndex: Record<number, number>;
};

const MediaPage: React.FC<MediaPageProps> = ({ index, mediaData, currentMediaIndex }) => {
  const urls = mediaData[index]?.urls;
  const currentIndex = currentMediaIndex[index] ?? 0;
  const currentUrl = urls?.[currentIndex];

  return (
      <div className="page-content media-wrapper">
        {urls?.length ? (
          currentUrl.includes(".mp4") ? (
            <video
              className="media-frame"
              src={currentUrl}
              autoPlay
              muted
              controls
            />
          ) : (
            <div className="media-container">
              <img
                className="media-blur-bg"
                src={currentUrl}
                alt="background blur"
              />
              <img
                className="media-frame"
                src={currentUrl}
                alt="person"
              />
            </div>
          )
        ) : (
          <div>Loading media...</div>
        )}
      </div>
  );
};

export default MediaPage;
