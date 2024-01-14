import React from "react";
import Slideshow from "../components/HomeComponents/Slideshow";

function Home() {
  return (
    <>
      <section id="home" className="section">
        <div id="logo-image">
          <img src="/images/logo.png" />
        </div>
        {/* <h2>Home Section</h2>
        <p>This is the content for the Home section.</p> */}
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
