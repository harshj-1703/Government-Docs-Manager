import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

function Header() {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (linkName:any) => {
    scrollTo(linkName);
  };
  
  const scrollTo = (elementId:any) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveLink(elementId);
    }
  };  

  const handleScroll = () => {
    const scrollY = window.scrollY;
  
    const servicesElement = document.getElementById("services");
    const aboutElement = document.getElementById("about");
    const contactElement = document.getElementById("contact");
  
    const servicesOffset = servicesElement!.offsetTop - 70 || 0;
    const aboutOffset = aboutElement!.offsetTop - 70 || 0;
    const contactOffset = contactElement!.offsetTop - 70 || 0;
  
    if (scrollY >= servicesOffset && scrollY < aboutOffset) {
      setActiveLink("services");
    } else if (scrollY >= aboutOffset && scrollY < contactOffset) {
      setActiveLink("about");
    } else if (scrollY >= contactOffset) {
      setActiveLink("contact");
    } else {
      setActiveLink("home");
    }
  };  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="navigation">
        <ul>
          <li className={`list ${activeLink === "home" ? "active" : ""}`}>
            <a href="#home" onClick={() => handleLinkClick("home")}>
              <span className="icon">
                <IonIcon
                  name={activeLink === "home" ? "home" : "home-outline"}
                />
              </span>
              <span className="text">Home</span>
            </a>
          </li>
          <li className={`list ${activeLink === "services" ? "active" : ""}`}>
            <a href="#services" onClick={() => handleLinkClick("services")}>
              <span className="icon">
                <IonIcon
                  name={
                    activeLink === "services"
                      ? "briefcase"
                      : "briefcase-outline"
                  }
                />
              </span>
              <span className="text">Services</span>
            </a>
          </li>
          <li className={`list ${activeLink === "about" ? "active" : ""}`}>
            <a href="#about" onClick={() => handleLinkClick("about")}>
              <span className="icon">
                <IonIcon
                  name={
                    activeLink === "about"
                      ? "information-circle"
                      : "information-circle-outline"
                  }
                />
              </span>
              <span className="text">About</span>
            </a>
          </li>
          <li className={`list ${activeLink === "contact" ? "active" : ""}`}>
            <a href="#contact" onClick={() => handleLinkClick("contact")}>
              <span className="icon">
                <IonIcon
                  name={activeLink === "contact" ? "call" : "call-outline"}
                />
              </span>
              <span className="text">Contact</span>
            </a>
          </li>
          <div className="indicator"></div>
        </ul>
      </div>
    </>
  );
}

export default Header;
