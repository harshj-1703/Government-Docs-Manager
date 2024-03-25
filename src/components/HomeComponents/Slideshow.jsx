import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const Skeleton = () => <div className="skeleton"></div>;

function RenderSmoothImage({ src }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper">
      {!imageLoaded && <Skeleton />}
      <LazyLoadImage
        src={src}
        wrapperClassName="image-wrapper"
        className="carousel-image"
        style={{ opacity: imageLoaded ? 1 : 0 }}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

const Slideshow = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const postersRef = collection(db, "Posters");
        const latestPosters = query(
          postersRef,
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(latestPosters);
        const tempPosters = [];
        if (!querySnapshot.empty) {
          const posterData = querySnapshot.docs[0].data();
          for (let i = 1; i <= 4; i++) {
            tempPosters.push(posterData[`urlP${i}Photo`]);
          }
          setPosters(tempPosters);
        } else {
          console.log("No documents found");
        }
        for (i of posters) {
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosters();
  }, []);

  return (
    <div className="slideshow-container">
      {posters.length > 0 ? (
        <Carousel
          infiniteLoop={true}
          autoPlay={true}
          stopOnHover={true}
          showThumbs={false}
          interval={2500}
          dynamicHeight={false}
          width="100%"
        >
          {posters.map((image, index) => (
            <div key={index} className="carousel-item">
              <RenderSmoothImage src={image} />
            </div>
          ))}
        </Carousel>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Slideshow;
