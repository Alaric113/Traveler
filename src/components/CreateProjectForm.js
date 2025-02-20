import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ref, set } from "firebase/database";
import { database } from "../firebase";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(advancedFormat);

const CreateProjectForm = ({onClose}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      name: projectName,
      description: projectDescription,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    const projectRef = ref(database, `projects/${Date.now()}`);
    set(projectRef, projectData)
      .then(() => {
        alert("Project created successfully!");
      })
      .catch((error) => {
        console.error("Error creating project: ", error);
      });
      onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">新增規劃</Typography>
      <TextField
        label="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
      </LocalizationProvider>
        
      <Button type="submit" variant="contained" color="primary" >
        Create Project
      </Button>
    </form>
  );
};

export default CreateProjectForm;