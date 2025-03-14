import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Wishlist from "../components/Wishlist";
import Schedule from "../components/Schedule";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const projectRef = ref(database, `projects/${projectId}`);
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      setProject(data);
    });
  }, [projectId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100%", maxHeight:"calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
      <h2>{project.name}</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" ,p:0}}>
        <Tabs value={value} onChange={handleChange} aria-label="project tabs">
          <Tab label="願望清單" />
          <Tab label="預算" />
          <Tab label="行程" />
          <Tab label="其他" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Wishlist projectId={projectId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>預算內容</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Schedule projectId={projectId} style={{padding:"0"}}/> 
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>其他內容</Typography>
      </TabPanel>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 ,pr:1,height:"100%"}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default ProjectDetail;