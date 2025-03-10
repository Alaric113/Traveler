import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { Tabs, Tab, Box, Typography, Grid } from "@mui/material";
import Trip from "./Trip";

const Schedule = ({ projectId }) => {
  const [value, setValue] = useState(0);
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const projectRef = ref(database, `projects/${projectId}`);
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.startDate && data.endDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        setStartDate(start);
        setEndDate(end);

        const dateList = [];
        let currentDate = start;

        while (currentDate <= end) {
          dateList.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setDates(dateList);
      }
    });
  }, [projectId]);

  return (
    <div style={{ height: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="schedule tabs"
        >
          {dates.map((date, index) => {
            const dayNumber = dates.indexOf(date) + 1;
            return (
              <Tab
                key={date.toISOString()}
                label={
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                      })
                    </Typography>
                    <Typography variant="caption">第 {dayNumber} 天</Typography>
                  </Box>
                }
              />
            );
          })}
        </Tabs>
      </Box>
      {dates.map((date, index) => (
        <TabPanel key={date.toISOString()} value={value} index={index}>
          <Grid container spacing={2} mt={1} style={{ height: "100%", flex: 1 }}> {/* 修改 Grid container 樣式 */}
            <Grid item xs={12}>
              <Trip projectId={projectId} date={date} />
            </Grid>
          </Grid>
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
        <Box sx={{ p: 0 }}> {/* 修改 Box 樣式 */}
          {children}
        </Box>
      )}
    </div>
  );
}

export default Schedule;