import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SocialMediaContent from "./SocialMediaContent";

const SkeletonMap = () => <div className="skeleton-map"></div>;
const SkeletonMobile = () => <div className="skeleton-mobile"></div>;

function ContactUsContent() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mapLoaded, setmapLoaded] = useState(false);

  return (
    <>
      <div id="main-contact-div">
        <div id="phone-div">
          {!imageLoaded && <SkeletonMobile />}
          <LazyLoadImage
            src="/images/mobile.png"
            id="mobile-photo"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
          />
          <div id="phone-app-details">
            <LazyLoadImage
              src="/images/logo.png"
              height={180}
              width={180}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
            <div style={{ opacity: imageLoaded ? 1 : 0, fontSize: 20 }}>
              Download Our Mobile App
            </div>
            <SocialMediaContent />
          </div>
        </div>
        <div id="map-div">
          {!mapLoaded && <SkeletonMap />}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27690275.73144865!2d69.94214582110659!3d22.2517147898332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e1!3m2!1sen!2sin!4v1705685108613!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy={"no-referrer-when-downgrade"}
            onLoad={() => setmapLoaded(true)}
            style={{ opacity: mapLoaded ? 1 : 0, border: "0" }}
          ></iframe>
          <div id="map-div-text" style={{ opacity: mapLoaded ? 1 : 0 }}>
            Our Main Branch Location
          </div>
        </div>
        <div id="contact-div">
          <div>
            <i className="material-icons">phone</i>
            <a href="tel:+918128203856">+91 81282 03856</a>
          </div>
          <div>
            <i className="material-icons">email</i>
            <a href="mailto:harshj6680@gmail.com">harshj6680@gmail.com</a>
          </div>
          <div>
            <LazyLoadImage
              src="/images/indian-animated-flag.gif"
              effect={blur}
              height={100}
              width={140}
            />
          </div>
          <div id="made-in-india">Made In Bharat</div>
        </div>
      </div>
    </>
  );
}

export default ContactUsContent;
