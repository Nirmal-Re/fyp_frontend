import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";

import { Exercise } from "./sub-components";
import { fetchFromAPI, postsToAPI } from "../utils/apiRequests";

interface exerciseDataType {
  name: string;
  sets: { reps: number; weight: number }[] | { reps: number; time: number }[];
}

const Workouts = () => {
  const location = useLocation();
  const workoutType = location.state?.type;
  const [workoutData, setWorkoutData] = useState<string[]>([]);
  const [changeSuccessful, setchangeSuccessful] = useState(false);
  const [add, setAdd] = useState("");
  const [remove, setRemove] = useState("");
  const [fullWorkout, setFullWorkout] = useState({
    update: { type: workoutType, data: [] as exerciseDataType[] },
  });

  console.log({ workoutType });

  useEffect(() => {
    const endPoint = "exercise/get-workouts";
    fetchFromAPI(endPoint)
      .then((result) => {
        setWorkoutData(result[workoutType]);
      })
      .catch((err) => console.error(err));
  }, [workoutType, changeSuccessful]);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.value;
    const endPoint = "exercise/update-workouts";
    const update = [{ type, add: [add], remove: [remove] }];
    console.log({ update });
    postsToAPI(endPoint, { update })
      .then((result) => {
        setAdd("");
        setRemove("");
        setchangeSuccessful(!changeSuccessful);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (type: string, exercise: string) => {
    const endPoint = "exercise/update-workouts";
    const update = [{ type, add: [], remove: [exercise] }];
    console.log({ update });
    postsToAPI(endPoint, { update })
      .then((result) => {
        setchangeSuccessful(!changeSuccessful);
      })
      .catch((err) => console.error(err));
  };

  const handleSave = ({ name, sets }: exerciseDataType) => {
    fullWorkout.update.data.push({ name, sets });
  };

  const handleUpload = () => {
    const endPoint = "exercise/add-workout-data";
    fullWorkout.update.type = workoutType;
    postsToAPI(endPoint, fullWorkout)
      .then((result) => {
        setFullWorkout({ update: { type: workoutType, data: [] } });
        alert("Successfully uploaded workout data");
      })
      .catch((err) => {
        alert(
          "Error uploading workout data. Save the data an try uploading again"
        );
        console.error(err);
      });
  };
  return (
    <>
      <Accordion
        key={workoutType}
        expanded={true}
        sx={{ border: "1px solid black" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${workoutType}a-content`}
          id={`panel${workoutType}a-header`}
        >
          <Typography variant="h6">
            {workoutType.charAt(0).toUpperCase() + workoutType.slice(1)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {workoutData.map((exercise, exerciseIndex) => (
            <Accordion key={exerciseIndex} elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panela-content-${exerciseIndex}`}
                id={`panela-header-${exerciseIndex}`}
              >
                <Typography variant="body1">{exercise}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Exercise
                  type={workoutType}
                  exercise={exercise}
                  handleDelete={() => handleDelete(workoutType, exercise)}
                  handleSave={(arg) => handleSave(arg)}
                />
              </AccordionDetails>
            </Accordion>
          ))}
          <Box>
            <div>
              <TextField
                id="outlined-basic"
                label="Exercise"
                variant="outlined"
                placeholder="Exercise"
                value={add}
                // size="medium"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdd(e.target.value)
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
                value={workoutType}
                size="large"
                onClick={handleUpdate}
                sx={{ height: 40 }}
              >
                Add
              </Button>
            </div>
            <Button
              variant="contained"
              sx={{ marginTop: "10px" }}
              onClick={handleUpload}
            >
              UPLOAD
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Workouts;
