// ProjectList.js
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import {  Typography, Button, Modal, Box, Grid } from "@mui/material";
import CreateProjectForm from "./CreateProjectForm";
import ProjectCard from "./ProjectCard"; // 引入 ProjectCard

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const openForm = () => {
    setIsProjectFormOpen(true);
  };
  const closeForm = () => {
    setIsProjectFormOpen(false);
  };

  useEffect(() => {
    const projectsRef = ref(database, "projects");
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProjects(projectArray);
      }
    });
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">所有規劃</Typography>
        <Button variant="contained" color="primary" onClick={openForm}>
          +
        </Button>
      </div>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} key={project.id}>
            <ProjectCard project={project} /> 
          </Grid>
        ))}
      </Grid>

      <Modal open={isProjectFormOpen} onClose={closeForm} TransitionComponent={null}>
        <Box
          sx={{
            position: "absolute",
            ...(screenWidth > 768
              ? {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  bgcolor: "background.paper",
                  p: 4,
                  border: "1px solid #ccc",
                }
              : {
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  bgcolor: "background.paper",
                  p: 4,
                  borderTop: "1px solid #ccc",
                }),
          }}
        >
          <CreateProjectForm onClose={closeForm} />
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectList;