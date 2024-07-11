// import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import styles from "./AuthPage.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.authPage}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
