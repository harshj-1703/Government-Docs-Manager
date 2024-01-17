import React from "react";
import Slideshow from "../components/HomeComponents/Slideshow";
import Wave from "../components/HomeComponents/Wave";
import Menu from "../components/HomeComponents/Menu";

function Home() {
  return (
    <>
      <section id="home" className="section">
        <div id="logo-image">
          <img src="/images/logo.png" />
        </div>
        <div id="india-animated-logo">
          <img src="/images/indian-animated-flag.gif" />
        </div>
        <Wave />
        <Menu />
        <Slideshow />
      </section>

      <section id="services" className="section">
        <h2>Services Section</h2>
        <p>This is the content for the Services section.</p>
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
