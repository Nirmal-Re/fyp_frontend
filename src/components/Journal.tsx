import { CardMedia, Box } from "@mui/material";
import { useState, useEffect } from "react";

import { Mood } from "./sub-components";

import { fetchFromAPI } from "../utils/fetchFromAPI";

const Journal = () => {
  const [log, setLog] = useState({});
  useEffect(() => {
    fetchFromAPI("logs/get-daily-log")
      .then((result) => {
        setLog(result);
        console.log(result);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="habitsPage">
      <CardMedia
        component="img"
        alt="Banner"
        height="140"
        image="/images/banner.png"
      />
      <Box
        className="moods"
        display="flex"
        width="100%"
        sx={{ bgcolor: "background.paper", p: 2 }}
      >
        <Mood />
      </Box>
      <div className="habits"></div>
    </div>
  );
};

export default Journal;
