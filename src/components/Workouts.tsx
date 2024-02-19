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

import { Exercise, SimpleSelect } from "./sub-components";
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
  const [typeOfPage, setTypeOfPage] = useState("upload");
  const [ids, setIds] = useState([]);

  console.log({ workoutType });

  useEffect(() => {
    const endPoint = "exercise/get-workouts";
    fetchFromAPI(endPoint)
      .then((result) => {
        setWorkoutData(result[workoutType]);
        setTypeOfPage("upload");
      })
      .catch((err) => console.error(err));

    fetchFromAPI(`exercise/get-workout-ids/${workoutType}`)
      .then((result) => {
        setIds(result);
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

  const handleChoice = (value: string) => {
    console.log({ value });

    fetchFromAPI(`exercise/get-workout-by-id/${value}`)
      .then((result) => {
        const newFullWorkout = { update: result };
        setFullWorkout(newFullWorkout);
        setTypeOfPage("update");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <SimpleSelect data={ids} handleChoice={handleChoice} />
      <>
        {typeOfPage === "update" ? (
          <>
            <Accordion
              key={workoutType}
              expanded={true}
              sx={{ border: "1px solid black", backgroundColor: "inherit" }}
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
                {fullWorkout.update.data.map((exercise, exerciseIndex) => (
                  <Accordion key={exerciseIndex} elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panela-content-${exerciseIndex}`}
                      id={`panela-header-${exerciseIndex}`}
                    >
                      <Typography variant="body1">{exercise.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Exercise
                        type={workoutType}
                        exercise={exercise.name}
                        setsForExercise={exercise.sets}
                        handleDelete={() =>
                          handleDelete(workoutType, exercise.name)
                        }
                        handleSave={(arg) => handleSave(arg)}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Box sx={{ padding: 2 }}>
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
            </Accordion>{" "}
          </>
        ) : (
          <>
            <Accordion
              key={workoutType}
              expanded={true}
              sx={{ border: "1px solid black", backgroundColor: "inherit" }}
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
                        setsForExercise={[]}
                        handleDelete={() => handleDelete(workoutType, exercise)}
                        handleSave={(arg) => handleSave(arg)}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Box sx={{ padding: 2 }}>
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
            </Accordion>{" "}
          </>
        )}
      </>
    </>
  );
};

export default Workouts;
