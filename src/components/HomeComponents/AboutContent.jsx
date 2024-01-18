import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function AboutContent() {
  return (
    <>
      <div id="main-about">
        <div id="box-photo-content">
          <div>
            <LazyLoadImage
              id="hj-image"
              src="/images/bhai.jpeg"
              effect="blur"
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
