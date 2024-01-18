import React from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AboutContent() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <LazyLoadComponent>
        <motion.div
          initial="hidden"
          ref={ref}
          animate={controls}
          variants={fadeInUpVariant}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div id="main-about">
            <div id="box-photo-content">
              <div>
                <LazyLoadImage
                  id="hj-image"
                  src="/images/bhai.jpeg"
                  effect="blur"
                />
              </div>
            </div>
            <div id="about-main-text">
              <h2 data-text="Developed By">Developed By</h2>
              <h1>Harsh Jolapara</h1>
            </div>
          </div>
        </motion.div>
      </LazyLoadComponent>
    </>
  );
}

export default AboutContent;
