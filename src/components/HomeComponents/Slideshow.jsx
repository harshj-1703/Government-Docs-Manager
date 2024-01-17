import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Skeleton = () => <div className="skeleton"></div>;

const Slideshow = () => {
  const imageArray = [
    "https://scgj.azadikaamritmahotsav.in/wp-content/uploads/2021/09/Web-Banner-Hindi_1600X500.jpg",
    "https://t4.ftcdn.net/jpg/04/45/41/71/360_F_445417168_ySehXZbCO65QjGgjSdoYXfJO8ME8tSkk.jpg",
    "https://img.freepik.com/free-vector/abstract-wavy-indian-flag-banner_1055-7052.jpg",
    "https://www.shutterstock.com/image-vector/stain-brush-stroke-flag-india-260nw-1922760536.jpg",
  ];

  return (
    <div className="slideshow-container">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        stopOnHover={true}
        showThumbs={false}
        interval={2500}
        dynamicHeight={false}
        width="100%"
      >
        {imageArray.map((image, index) => (
          <div key={index} className="carousel-item">
            <LazyLoadImage
              src={image}
              alt={`Slide ${index + 1}`}
              wrapperClassName="image-wrapper"
              className="carousel-image"
              placeholder={<Skeleton />}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slideshow;
