import React, { useEffect } from "react";
import Slideshow from "../components/HomeComponents/Slideshow";
import Wave from "../components/HomeComponents/Wave";
import Menu from "../components/HomeComponents/Menu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ServiceContent from "../components/HomeComponents/ServiceContent";
import AboutContent from "../components/HomeComponents/AboutContent";
import ContactUsContent from "../components/HomeComponents/ContactUsContent";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function Home() {
  useEffect(() => {
    if (localStorage.getItem("visited") !== "1") {
      const addWebsiteLoadData = async () => {
        try {
          const websiteLoadDataRef = collection(db, "WebsiteLoadData");
          await addDoc(websiteLoadDataRef, {
            createdAt: new Date(),
          });
          localStorage.setItem("visited", 1);
        } catch (error) {
          console.log(error);
        }
      };
      addWebsiteLoadData();
    }

    if (!localStorage.getItem("mode")) {
      localStorage.setItem("mode", "dark-mode");
    }
  }, []);

  return (
    <>
      <section id="home" className="section">
        <div id="logo-image">
          <img src="/images/logo.png" />
        </div>
        <div id="india-animated-logo">
          <LazyLoadImage src="/images/indian-animated-flag.gif" effect={blur} />
        </div>
        <Wave />
        <Menu />
        <Slideshow />
      </section>

      <section id="services" className="section">
        <div id="service-heading">We Provide Below Services</div>
        <ServiceContent />
      </section>

      <section id="about" className="section">
        {/* <div id="about-heading">About Us</div> */}
        <AboutContent />
      </section>

      <section id="contact" className="section">
        <div id="contact-heading">Contact Us</div>
        <ContactUsContent />
      </section>
    </>
  );
}

export default Home;
