/* eslint-disable no-unused-vars */
// import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
// import Courses from "../components/dashboard/Courses";
import ProtectedLayout from "../components/common/ProtectedRoute";
import CoursesPage from "./CoursesPage";
import MyCoursesPage from "./MyCoursesPage";
import CourseDetailsPage from "./CoursesDetailsPage";
import AssetViewerPage from "./AssetViewerPage";
import ProfilePage from "./ProfilePage";

const DashboardPage = () => {
  return (
    <ProtectedLayout>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<CoursesPage />} />
          <Route path="profile" element={<ProfilePage/>} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="my-courses">
            <Route index element={<MyCoursesPage />} />
            <Route path=":id" element={<CourseDetailsPage />} />
            <Route path="asset/:id" element={<AssetViewerPage />} />
          </Route>
        </Route>
      </Routes>
    </ProtectedLayout>
  );
};

export default DashboardPage;
