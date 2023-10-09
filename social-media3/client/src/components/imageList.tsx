import * as React from "react";
import { CSSProperties } from "react";

interface ImageListProps {
  images?: string[];
}

export default function PostImageList({ images }: ImageListProps) {
  if (!images || images.length === 0) {
    return <></>;
  }

  const baseStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const gridStyles: CSSProperties = {
    padding: "10px",
    display: "grid",
    gap: "2px",
    gridTemplateColumns: images.length === 1 ? "1fr" : "repeat(2, 1fr)",
    gridTemplateRows: images.length <= 2 ? "1fr" : "repeat(2, 1fr)",
  };

  return (
    <div style={gridStyles}>
      {images.map((imgSrc, index) => {
        const style: CSSProperties = { ...baseStyle };

        if (images.length === 3 && index === 0) {
          style.gridColumn = "1 / 2";
          style.gridRow = "1 / span 2";
        }

        return <img key={index} src={imgSrc} style={style} />;
      })}
    </div>
  );
}
