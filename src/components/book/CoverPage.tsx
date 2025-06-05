import React from "react";

type CoverPageProps = {
  onClick: () => void;
  isFlipping: boolean;
};

const CoverPage: React.FC<CoverPageProps> = ({ onClick, isFlipping }) => {
  return (
    <div className="cover-wrapper" onClick={onClick}>
      <div
        className={`page-content cover ${isFlipping ? "flip-out" : ""}`}
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
  );
};

export default CoverPage;
