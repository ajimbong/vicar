/* eslint-disable no-unused-vars */
// src/components/CoursesPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography, Button, Snackbar } from "@mui/material";
import CourseCard from "../components/dashboard/CourseCard";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchEnrollments = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/students/${userId}/enrollments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      await axios.post(
        "http://localhost:8000/api/students/enrollment",
        { student_id: userId, course_id: courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEnrollments();
      setSnackbar({ open: true, message: "Enrolled successfully!" });
    } catch (error) {
      console.error("Error enrolling:", error);
      setSnackbar({
        open: true,
        message: "Error enrolling. Please try again.",
      });
    }
  };

  const handleDisenroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      await axios.delete("http://localhost:8000/api/students/enrollment", {
        data: { student_id: userId, course_id: courseId },
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEnrollments();
      setSnackbar({ open: true, message: "Disenrolled successfully!" });
    } catch (error) {
      console.error("Error disenrolling:", error);
      setSnackbar({
        open: true,
        message: "Error disenrolling. Please try again.",
      });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard
              course={course}
              enrolled={enrollments.some((e) => e.course_id === course.id)}
              onEnroll={() => handleEnroll(course.id)}
              onDisenroll={() => handleDisenroll(course.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default CoursesPage;
