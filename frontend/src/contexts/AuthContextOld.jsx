// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Here you would typically verify the token with your backend
      // For now, we'll just set a dummy user
      setUser({ name: "John Doe", token });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// try {
//   const response = await axios.post("http://localhost:8000/api/auth/login", {
//     email,
//     password,
//   });
//   const {
//     token,
//     id,
//     first_name,
//     last_name,
//     email: userEmail,
//     matricule,
//   } = response.data;
//   const userData = {
//     id,
//     first_name,
//     last_name,
//     email: userEmail,
//     matricule,
//     token,
//   };
//   setUser(userData);
//   console.log(userData, 1);
//   localStorage.setItem("token", token);
//   localStorage.setItem("userId", id);
// } catch (error) {
//   console.error("Login error:", error);
//   throw error;
// }
