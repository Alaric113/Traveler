// Schedule.js
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const Schedule = ({ projectId }) => {
  const [value, setValue] = useState(0);
  const [dates, setDates] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const projectRef = ref(database, `projects/${projectId}`);
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.startDate && data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const dateList = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
          dateList.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setDates(dateList);
      }
    });
  }, [projectId]);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider", p:0,m:0}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile 
          aria-label="schedule tabs"
        >
          {dates.map((date) => (
            <Tab
              key={date.toISOString()}
              label={`${date.getMonth() + 1}/${date.getDate()} (${
                date.getDay() === 0
                  ? "日"
                  : date.getDay() === 1
                  ? "一"
                  : date.getDay() === 2
                  ? "二"
                  : date.getDay() === 3
                  ? "三"
                  : date.getDay() === 4
                  ? "四"
                  : date.getDay() === 5
                  ? "五"
                  : "六"
              })`}
            />
          ))}
        </Tabs>
      </Box>
      {dates.map((date, index) => (
        <TabPanel key={date.toISOString()} value={value} index={index}>
          <Typography>
            {date.getMonth() + 1}/{date.getDate()} ({
              date.getDay() === 0
                ? "日"
                : date.getDay() === 1
                ? "一"
                : date.getDay() === 2
                ? "二"
                : date.getDay() === 3
                ? "三"
                : date.getDay() === 4
                ? "四"
                : date.getDay() === 5
                ? "五"
                : "六"
            }) 的行程內容
          </Typography>
        </TabPanel>
      ))}
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`schedule-tabpanel-${index}`}
      aria-labelledby={`schedule-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Schedule;