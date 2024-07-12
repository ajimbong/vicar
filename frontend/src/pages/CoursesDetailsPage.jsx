/* eslint-disable no-unused-vars */
// src/components/CourseDetailsPage.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";

const CourseDetailsPage = () => {
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCourseDetails();
    fetchLectures();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/courses/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourse(response.data);
      localStorage.setItem("course", JSON.stringify({ id: response.data.id, title: response.data.title }))
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const fetchLectures = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/courses/${id}/lectures`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data)
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link to="/">MyCourses</Link> */}
        <Link to="/dashboard/my-courses">My Courses</Link>
        <Typography color="text.primary">{course.title}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {course.description}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Lectures
      </Typography>
      {lectures.map((lecture) => (
        <Accordion key={lecture.id} disabled={lecture.locked}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {lecture.title} {lecture.locked && <LockIcon />}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {lecture.assets &&
                lecture.assets.map((asset) => (
                  <ListItem
                    button
                    component={Link}
                    to={`/dashboard/my-courses/asset/${asset.id}`}
                    key={asset.id}
                  >
                    <ListItemText primary={asset.URL} />
                  </ListItem>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CourseDetailsPage;
