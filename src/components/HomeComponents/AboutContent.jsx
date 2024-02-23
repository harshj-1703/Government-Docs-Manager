import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function AboutContent() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div id="main-about">
        <div id="box-photo-content">
          <div>
            <LazyLoadImage
              id="hj-image"
              src="/images/bhai.jpeg"
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
        <div id="about-main-text">
          <h2 data-text="Developed By">Developed By</h2>
          <h1>Harsh Jolapara</h1>
        </div>
      </div>
    </>
  );
}

export default AboutContent;
