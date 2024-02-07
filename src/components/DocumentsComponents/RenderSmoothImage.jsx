import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function RenderSmoothImage({ src, Skeleton }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper-grid">
      {!imageLoaded && <Skeleton />}
      <LazyLoadImage
        src={src}
        style={{ opacity: imageLoaded ? 1 : 0 }}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

export default RenderSmoothImage;
