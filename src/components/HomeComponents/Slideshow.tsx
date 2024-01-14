import React, { useState } from "react";
import Slider from "react-slick";
import wave from "../../assets/wave.svg";

const Slideshow = () => {
  const [isLoaded] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <>
      <div className="wave">
        <img src={wave} />
      </div>
      <div className="slideshow-container" style={{backgroundColor:"red"}}>
        <Slider {...settings}>
          <div>
            {isLoaded ? (
              <img src="/images/1.jpg" alt="Image 1" />
            ) : (
              <div className="skeleton-image"></div>
            )}
          </div>
          <div>
            {isLoaded ? (
              <img src="/images/1.jpg" alt="Image 1" />
            ) : (
              <div className="skeleton-image"></div>
            )}
          </div>
          <div>
            {isLoaded ? (
              <img src="/images/1.jpg" alt="Image 1" />
            ) : (
              <div className="skeleton-image"></div>
            )}
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Slideshow;
