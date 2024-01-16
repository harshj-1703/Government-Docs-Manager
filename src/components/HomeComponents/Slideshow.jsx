import React, { useState } from "react";
import Slider from "react-slick";
import wave from "../../assets/wave.svg";

const Slideshow = () => {
  const imageUrls = [
    "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/VanDhan.jpg",
    "https://www.mygov.in/sites/all/themes/mygov/images/pmfby/pmfby-banner.jpg",
    "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/ujjwala-yojana-inner.jpg",
    "https://static.theprint.in/wp-content/uploads/2018/08/Modi-Ujjawala.jpg",
    // "https://random.imagecdn.app/500/150",
    // "https://picsum.photos/200/300",
    // "https://aws.random.cat/meowhttps://dog.ceo/api/breeds/image/random",
    // "https://source.unsplash.com/random/800x600",
    // "https://loremflickr.com/640/480/city",
    // "https://loremflickr.com/640/480/food",
    // "https://loremflickr.com/640/480/sports",
  ];
  
  

  const [isLoaded, setIsLoaded] = useState(
    new Array(imageUrls.length).fill(false)
  );

  const handleImageLoad = (index) => {
    const updatedIsLoaded = [...isLoaded];
    updatedIsLoaded[index] = true;
    setIsLoaded(updatedIsLoaded);

    // console.log("Image loaded, state:", updatedIsLoaded);
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
