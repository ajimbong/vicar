/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/AssetViewerPage.jsx
import React, { useState, useEffect, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, PerspectiveCamera, useGLTF, Environment, Stage } from "@react-three/drei";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Model = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} />;
};
// const Model = ({ url }) => {
//   const { scene, nodes, materials } = useGLTF(url);
//   console.log("GLTF loaded:", { scene, nodes, materials });
//   // eslint-disable-next-line react/no-unknown-property
//   return <primitive object={scene} />;
// };

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} castShadow />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#bbbbff"
        intensity={0.5}
      />
    </>
  );
};

const Floor = () => {
  return (
    <Grid
      renderOrder={-1}
      position={[0, -0.5, 0]}
      args={[10.5, 10.5]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#6f6f6f"
      sectionSize={3}
      sectionThickness={1}
      sectionColor="#9d4b4b"
      fadeDistance={30}
      fadeStrength={1}
      followCamera={false}
      infiniteGrid={true}
    />
  );
};


const AssetViewerPage = () => {
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const course = JSON.parse(localStorage.getItem("course"));

  useEffect(() => {
    fetchAsset();
  }, [id]);

  const fetchAsset = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/assets/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAsset(response.data);
    } catch (error) {
      console.error("Error fetching asset:", error);
      setError("Failed to fetch asset data");
    }
  };
  if (error) return <Typography color="error">{error}</Typography>;
  if (!asset) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link to="/">MyCourses</Link> */}
        <Link to="/dashboard/my-courses">My Courses</Link>
        <Link to={`/dashboard/my-courses/${course.id}`}>{course.title}</Link>
        <Typography color="text.primary">{asset.URL.slice(-17)}</Typography>
      </Breadcrumbs>
    
      <Box sx={{ width: "100%", height: "500px", backgroundColor: "#f0f0f0" }}>
        <Canvas shadows gl={{ alpha: false }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 3, 5]} fov={50} />
          <color attach="background" args={["#f0f0f0"]} />
          <Lights />
          <Suspense fallback={null}>
            <Model url={asset.URL} />
          </Suspense>
          <Floor />
          <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </Box>
    </Box>
  );
};

export default AssetViewerPage;
