// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Courses.module.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/courses", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log("Fetched courses:", response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setMessage("Error fetching courses. Please try again.");
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/${user.id}/enrollments`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log("Fetched enrollments:", response.data);
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setMessage("Error fetching enrollments. Please try again.");
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/students/enrollment",
        {
          student_id: user.id,
          course_id: courseId,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setMessage("Enrolled successfully");
      fetchEnrollments();
    } catch (error) {
      console.error("Error enrolling:", error);
      setMessage("Error enrolling in course. Please try again.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDisenroll = async (courseId) => {
    try {
      await axios.delete("http://localhost:8000/api/students/enrollment", {
        data: { student_id: user.id, course_id: courseId },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessage("Disenrolled successfully");
      fetchEnrollments();
    } catch (error) {
      console.error("Error disenrolling:", error);
      setMessage("Error disenrolling from course. Please try again.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  if (courses.length === 0) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className={styles.coursesContainer}>
      <h2>Available Courses</h2>
      {message && <div className={styles.message}>{message}</div>}
      <div className={styles.coursesList}>
        {courses.map((course) => (
          <div key={course.id} className={styles.courseItem}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {enrollments.includes(course.id) ? (
              <button
                onClick={() => handleDisenroll(course.id)}
                className={styles.disenrollButton}
              >
                Disenroll
              </button>
            ) : (
              <button
                onClick={() => handleEnroll(course.id)}
                className={styles.enrollButton}
              >
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
