import React from "react";
import Slideshow from "../components/HomeComponents/Slideshow";
import Wave from "../components/HomeComponents/Wave";
import Menu from "../components/HomeComponents/Menu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ServiceContent from "../components/HomeComponents/ServiceContent";

function Home() {
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
        <ServiceContent/>
      </section>

      <section id="about" className="section">
        <h2>About Section</h2>
        <p>This is the content for the About section.</p>
      </section>

      <section id="contact" className="section">
        <h2>Contact Section</h2>
        <p>This is the content for the Contact section.</p>
      </section>
    </>
  );
}

export default Home;
