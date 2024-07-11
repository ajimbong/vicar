// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>VicAR</div>
      <nav className={styles.nav}>
        <Link to="/#features">Features</Link>
        <Link to="/#about">About</Link>
        <Link to="/#contact">Contact</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className={styles.cta}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className={styles.cta}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
