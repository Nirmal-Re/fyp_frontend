import React, { useState, useEffect, useCallback } from "react";

import { postsToAPI } from "../utils/apiRequests";
import { JournalGraph } from "./sub-components";

const Dashboard = () => {
  const [exerciseData, setExerciseData] = useState({});
  const [journalData, setJournalData] = useState({});

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };
  const lastSevenDays = useCallback(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    return [formatDate(sevenDaysAgo), formatDate(today)];
  }, []);

  useEffect(() => {
    const journalEndPoint = "dashboard/get-user-report-data";
    const [start, end] = lastSevenDays();
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
  }, [lastSevenDays]);

  return (
    <>
      <JournalGraph props={{ journalData }} />
    </>
  );
};

export default Dashboard;
