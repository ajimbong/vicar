/* eslint-disable no-unused-vars */
// src/components/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: "auto",
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchEnrollments();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/students/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const userId = localStorage.getItem("userId");
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

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <LargeAvatar
              src={`https://avatars.dicebear.com/api/initials/${profile.first_name[0]}${profile.last_name[0]}.svg`}
            />
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }}>
              {profile.first_name} {profile.last_name}
            </Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              <InfoChip icon={<EmailIcon />} label={profile.email} />
              <InfoChip icon={<BadgeIcon />} label={profile.matricule} />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Enrolled Courses
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {enrollments.map((enrollment) => (
                <ListItem key={enrollment.id}>
                  <ListItemText
                    primary={enrollment.course.title}
                    secondary={enrollment.course.code}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default ProfilePage;
