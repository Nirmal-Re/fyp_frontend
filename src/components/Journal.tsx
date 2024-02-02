import { Box, TextField, Button, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
// import { CloseIcon, DoneIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { fetchFromAPI, postsToAPI } from "../utils/apiRequests";
import React from "react";

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
  const [changeSuccessful, setchangeSuccessful] = useState(false);

  useEffect(() => {
    fetchFromAPI("logs/get-daily-log")
      .then((result) => {
        setLog(result);
        console.log(result);
      })
      .catch((err) => console.error(err));
  }, [changeSuccessful]);

  const handleLogChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.value;
    log[key] = !log[key];
    const endPoint = "logs/add-daily-log";
    postsToAPI(endPoint, log)
      .then((result) => {
        setchangeSuccessful(!changeSuccessful);
      })
      .catch((err) => console.error(err));
  };

  const handleMoodChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.value) as number;
    log.moods[index] = !log.moods[index];
    const endPoint = "logs/add-daily-log";
    postsToAPI(endPoint, log)
      .then((result) => {
        setchangeSuccessful(!changeSuccessful);
      })
      .catch((err) => console.error(err));
  };

  const handleAddHabit = () => {
    const endPoint = "logs/add-new-habits";
    const body = { newHabits: habit };
    postsToAPI(endPoint, body)
      .then((result) => {
        setchangeSuccessful(!changeSuccessful);
        setHabit("");
        console.log(result);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="habitsPage">
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
          const logGeneratedHour = new Date(log.uploadDateAndTime).getHours();
          const hourString = (logGeneratedHour + i)
            .toString()
            .padEnd(5, ":000");
          return (
            <Button
              variant="outlined"
              value={i}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (
                  hourString >
                  new Date().getHours().toString().padEnd(5, ":000")
                ) {
                  alert(
                    "You can only change the mood for the past or current."
                  );
                } else {
                  handleMoodChange(e);
                }
              }}
            >
              {val === null
                ? `${hourString} 😐`
                : val
                ? `${hourString} 😀`
                : `${hourString} 😔`}
            </Button>
          );
          // return <Mood props={moodAndHour} key={i} />;
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
              value={key}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleLogChange(e)
              }
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
