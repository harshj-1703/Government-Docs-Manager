import React from "react";
import Slider from "react-slick";
import wave from "../../assets/wave.svg";

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="wave">
        <img src={wave} />
      </div>
      <div className="slideshow-container">
        <Slider {...settings}>
          <div>
            <img src="/images/1.jpg" alt="Image 1" />
          </div>
          <div>
            <img src="/images/24.jpg" alt="Image 2" />
          </div>
          <div>
            <img src="/images/25.jpg" alt="Image 3" />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Slideshow;
