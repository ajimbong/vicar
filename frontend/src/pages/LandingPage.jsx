// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../components/common/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import CallToAction from "../components/landing/CallToAction";
import Footer from "../components/common/Footer";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <Header />
      <main>
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
