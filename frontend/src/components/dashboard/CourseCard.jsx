/* eslint-disable react/prop-types */
// src/components/CourseCard.js
//import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

const CourseCard = ({ course, enrolled, onEnroll, onDisenroll }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Code: {course.code}
        </Typography>
      </CardContent>
      <CardActions>
        {enrolled ? (
          <Button size="small" color="secondary" onClick={onDisenroll}>
            Disenroll
          </Button>
        ) : (
          <Button size="small" color="primary" onClick={onEnroll}>
            Enroll
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
