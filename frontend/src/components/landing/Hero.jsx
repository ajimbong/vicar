// import React from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Experience Learning in a Whole New Dimension</h1>
        <p>
          Dive into immersive 3D models and bring your studies to life with
          VicAR
        </p>
        <Link to="/register" className={styles.cta}>
          Get Started
        </Link>
      </div>
      <div className={styles.imageContainer}>
        {/* Replace with actual image */}
        <div className={styles.placeholderImage}>
          3D Model Placeholder
          <br />
          (600x400px)
        </div>
      </div>
    </section>
  );
};

export default Hero;
