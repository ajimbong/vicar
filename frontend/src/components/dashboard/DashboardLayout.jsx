// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log("Dash", user)

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Hello, {user.first_name} { user.last_name}</h1>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </header>
      <div className={styles.content}>
        <nav className={styles.sidebar}>
          <Link to="/dashboard/courses">Courses</Link>
          <Link to="/dashboard/my-courses">My Courses</Link>
          <Link to="/dashboard/profile">Profile</Link>
        </nav>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
