import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Skeleton = () => <div className="skeleton"></div>;

const Slideshow = () => {
  const imageArray = [
    "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/VanDhan.jpg",
    "https://www.mygov.in/sites/all/themes/mygov/images/pmfby/pmfby-banner.jpg",
    "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/ujjwala-yojana-inner.jpg",
    "https://static.theprint.in/wp-content/uploads/2018/08/Modi-Ujjawala.jpg",
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
