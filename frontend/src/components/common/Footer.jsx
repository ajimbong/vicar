// import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <h3>VicAR</h3>
          <p>Revolutionizing education through immersive 3D experiences.</p>
        </div>
        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Connect</h4>
          <ul className={styles.social}>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 VicAR. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
