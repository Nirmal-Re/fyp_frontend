import { Box, TextField, Button, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
// import { CloseIcon, DoneIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";

import { Mood } from "./sub-components";
import { fetchFromAPI, postsToAPI } from "../utils/fetchFromAPI";

//Log type declaration
interface Log {
  uid: number;
  uploadDateAndTime: Date;
  moods: boolean[];
  [key: string]: number | Date | boolean | string | boolean[];
}

const Journal = () => {
  const [log, setLog] = useState({} as Log);
  const [habit, setHabit] = useState("");
  const [habbitAddedSucessfully, setHabbitAddedSucessfully] = useState(false);

  useEffect(() => {
    fetchFromAPI("logs/get-daily-log")
      .then((result) => {
        setLog(result);
        console.log(result);
      })
      .catch((err) => console.error(err));
  }, [habbitAddedSucessfully]);

  const handleAddHabit = () => {
    const endPoint = "logs/add-new-habits";
    const body = { newHabits: habit };
    console.log(body);
    postsToAPI(endPoint, body)
      .then((result) => {
        setHabbitAddedSucessfully(!habbitAddedSucessfully);
        setHabit("");
        console.log(result);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="habitsPage">
      {/* <CardMedia
        component="img"
        alt="Banner"
        width="100%"
        image="/images/banner.png"
        sx={{
          maxWidth: "100%", // Make sure it doesn't exceed the container width
          height: "140px", // Fix the height as you have it
          objectFit: "cover",
          objectPosition: "none",
        }}
      /> */}
      <Box
        className="moods"
        display="flex"
        width="100%"
        justifyContent="space-evenly"
        flexWrap="wrap"
        sx={{
          pt: 1,
          pb: 1,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {log.moods?.map((val, i) => {
          const currentHour = new Date(log.uploadDateAndTime).getHours();
          const hourString = (currentHour + i).toString().padEnd(5, ":00");
          const moodAndHour = { mood: val, hour: hourString };
          return <Mood props={moodAndHour} key={i} />;
        })}
      </Box>
      {Object.entries(log).map(([key, value]) => {
        if (
          key === "uploadDateAndTime" ||
          key === "moods" ||
          key === "_id" ||
          key === "uid"
        )
          return null;
        return (
          <Box
            display="flex"
            flexDirection="row"
            maxWidth={400}
            alignItems={"center"}
            margin="auto"
            marginTop={1}
            borderRadius={5}
            padding={1}
            border={"2px solid black"}
            justifyContent={"space-between"}
            boxShadow={"-5px 5px 10px #ccc"}
            sx={{ ":hover": { boxShadow: "-10px 10px 10px #ccc" } }}
          >
            <Typography variant="h5" sx={{ padding: 2 }}>
              {key}
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={handleAddHabit}
              sx={{ height: 40 }}
            >
              {value ? <DoneIcon /> : <CloseIcon />}
            </Button>
          </Box>
        );
      })}

      <Box
        display="flex"
        maxWidth={400}
        alignItems={"center"}
        margin="auto"
        marginTop={1}
        borderRadius={5}
        justifyContent={"space-between"}
        border={"2px solid black"}
        padding={2}
        boxShadow={"-5px 5px 10px #ccc"}
        sx={{ ":hover": { boxShadow: "-10px 10px 10px #ccc" } }}
      >
        <TextField
          id="outlined-basic"
          label="Habit"
          variant="outlined"
          placeholder="Habit"
          value={habit}
          // size="medium"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHabit(e.target.value)
          }
          sx={{
            height: 40,
            "& .MuiOutlinedInput-root": {
              height: "100%",
              padding: "0px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
          }}
        />
        <Button
          variant="outlined"
          size="large"
          onClick={handleAddHabit}
          sx={{ height: 40 }}
        >
          Add
        </Button>
      </Box>
    </div>
  );
};

export default Journal;
