// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        // console.log("fetching user oo")
        try {
          const response = await axios.get(
            `http://localhost:8000/api/students/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser({ ...response.data, token });
          // console.log("fetch completed oo")
          // console.log(response.data)
        } catch (error) {
          console.error("Error fetching student data:", error);
        //   localStorage.removeItem("token");
        //   localStorage.removeItem("userId");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      const {
        token,
        id,
        first_name,
        last_name,
        email: userEmail,
        matricule,
      } = response.data;
      const userData = {
        id,
        first_name,
        last_name,
        email: userEmail,
        matricule,
        token,
      };
      setUser(userData);
      // console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
