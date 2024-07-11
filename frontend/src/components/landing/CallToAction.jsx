/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./CallToAction.module.css";

const CallToAction = () => {
  return (
    <section className={styles.cta}>
      <h2>Ready to Revolutionize Your Learning?</h2>
      <p>Join VicAR today and experience education like never before!</p>
      <button className={styles.ctaButton}>Sign Up Now</button>
    </section>
  );
};

export default CallToAction;
