// import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Courses from "../components/dashboard/Courses";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="courses" element={<Courses />} />
        <Route path="my-courses" element={<h2>My Courses (Coming Soon)</h2>} />
        <Route path="profile" element={<h2>Profile (Coming Soon)</h2>} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardPage;
