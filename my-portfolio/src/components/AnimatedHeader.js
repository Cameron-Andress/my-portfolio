import React from "react";
import { motion } from "framer-motion";
import "./AnimatedHeader.css"; // For custom styles

const AnimatedHeader = () => {
  return (
    <div className="header-container">
      <motion.div
        className="road"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      ></motion.div>
      <div className="sky">
        <motion.img
          src="/path-to-your-galaxy-image.jpg"
          alt="Galaxy"
          className="galaxy"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default AnimatedHeader;
