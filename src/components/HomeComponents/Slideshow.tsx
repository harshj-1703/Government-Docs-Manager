import React, { useState } from "react";
import Slider from "react-slick";
import wave from "../../assets/wave.svg";

const Slideshow = () => {
  const imageUrls = [
    "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/VanDhan.jpg",
    "https://www.mygov.in/sites/all/themes/mygov/images/pmfby/pmfby-banner.jpg",
    "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/ujjwala-yojana-inner.jpg",
    "https://static.theprint.in/wp-content/uploads/2018/08/Modi-Ujjawala.jpg",
  ];

  const [isLoaded, setIsLoaded] = useState(
    new Array(imageUrls.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    const updatedIsLoaded = [...isLoaded];
    updatedIsLoaded[index] = true;
    setIsLoaded(updatedIsLoaded);

    console.log("Image loaded, state:", updatedIsLoaded);
  };

  return (
    <>
      <div className="wave">
        <img src={wave} alt="Wave" />
      </div>
      <div className="slideshow-container" style={{ backgroundColor: "red" }}>
        <Slider dots infinite autoplay autoplaySpeed={2500}>
          {imageUrls.map((url, index) => (
            <div key={index}>
              {isLoaded[index] ? (
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  onLoad={() => handleImageLoad(index)}
                />
              ) : (
                <div>
                  <div className="skeleton-image"></div>
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    onLoad={() => handleImageLoad(index)}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Slideshow;
