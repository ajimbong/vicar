/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AuthForm.module.css";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
    const {login} = useContext(AuthContext)
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/auth/login",
    //     formData
    //   );
    //   localStorage.setItem("token", response.data.token);
    //   navigate("/dashboard");
    // } catch (err) {
    //   setError("Login failed. Please check your credentials.");
      // }
      const {email, password} = formData
    // console.log(email, password)
    login(email, password)
    navigate("/dashboard");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
