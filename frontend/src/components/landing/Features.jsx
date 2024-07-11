/* eslint-disable react/prop-types */
// import React from "react";
import styles from "./Features.module.css";

const Feature = ({ title, description, icon }) => (
  <div className={styles.feature}>
    <div className={styles.icon}>{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className={styles.features}>
      <h2>Why Choose VicAR?</h2>
      <div className={styles.grid}>
        <Feature
          title="Immersive Learning"
          description="Explore intricate 3D models that bring complex concepts to life."
          icon="🕶️"
        />
        <Feature
          title="Interactive Experience"
          description="Manipulate and interact with 3D objects for hands-on learning."
          icon="🖐️"
        />
        <Feature
          title="Comprehensive Courses"
          description="Access a wide range of courses across various disciplines."
          icon="📚"
        />
        <Feature
          title="Expert Lecturers"
          description="Learn from industry professionals and experienced educators."
          icon="👨‍🏫"
        />
        <Feature
          title="Progress Tracking"
          description="Monitor your learning journey with detailed progress reports."
          icon="📊"
        />
        <Feature
          title="Collaborative Learning"
          description="Engage with peers and instructors in virtual environments."
          icon="🤝"
        />
      </div>
    </section>
  );
};

export default Features;
