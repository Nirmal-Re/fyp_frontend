import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";

import { postsToAPI } from "../utils/apiRequests";
import { JournalGraph, WorkoutGraph, DateRangePicker } from "./sub-components";
const Dashboard = () => {
  const lastSevenDays = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    return [formatDate(sevenDaysAgo), formatDate(today)];
  };
  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const [dateRange, setDateRange] = useState(lastSevenDays()); // [start, end
  const [exerciseData, setExerciseData] = useState({});
  const [journalData, setJournalData] = useState({});

  useEffect(() => {
    const journalEndPoint = "dashboard/get-user-report-data";
    const [start, end] = dateRange;
    postsToAPI(journalEndPoint, { start, end })
      .then((result) => {
        console.log(result);
        setJournalData(result);
      })
      .catch((err) => console.error(err));

    const exerciseEndPoint = "dashboard/get-workout-historic-data";
    postsToAPI(exerciseEndPoint, { start, end })
      .then((result) => {
        console.log(result);
        setExerciseData(result);
      })
      .catch((err) => console.error(err));
  }, [dateRange]);

  const onDateChange = (date: string[]) => {
    console.log(date);
    setDateRange(date);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: "80%",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <DateRangePicker
        onDateChange={(passedDates) => onDateChange(passedDates)}
      />
      <JournalGraph props={{ journalData }} />
      <WorkoutGraph props={{ exerciseData }} />
    </Box>
  );
};

export default Dashboard;
