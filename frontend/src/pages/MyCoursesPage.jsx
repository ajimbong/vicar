/* eslint-disable no-unused-vars */
// src/components/MyCoursesPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Breadcrumbs,
} from "@mui/material";

const MyCoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/students/${userId}/courses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link to="/">Home</Link> */}
        {/* <Typography color="text.primary">Home</Typography> */}
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>
      <List>
        {enrolledCourses.map((course) => (
          <ListItem
            button
            component={Link}
            to={`/dashboard/my-courses/${course.id}`}
            key={course.id}
          >
            <ListItemText primary={course.title} secondary={course.code} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyCoursesPage;
