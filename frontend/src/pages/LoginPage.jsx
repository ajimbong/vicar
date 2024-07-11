// import React from "react";
import LoginForm from "../components/auth/LoginForm";
import styles from "./AuthPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.authPage}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
