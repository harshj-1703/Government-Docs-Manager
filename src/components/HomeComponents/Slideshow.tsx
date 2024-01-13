import React from 'react';
import Slider from 'react-slick';
import image1 from '../../assets/24.jpg';
import image2 from '../../assets/25.jpg';
import image3 from '../../assets/1.jpg';

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
    <div className="slideshow-container">
      <Slider {...settings}>
        <div>
          <img src={image1} alt="Image 1" />
        </div>
        <div>
          <img src={image2} alt="Image 2" />
        </div>
        <div>
          <img src={image3} alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Slideshow;
