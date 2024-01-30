import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import { Exercise } from "./sub-components";
import { fetchFromAPI, postsToAPI } from "../utils/apiRequests";
import { Handshake } from "@mui/icons-material";

interface workoutDataType {
  [key: string]: string[];
}

const Workouts = () => {
  const [workoutData, setWorkoutData] = useState<workoutDataType>(
    {} as workoutDataType
  );
  const [changeSuccessful, setchangeSuccessful] = useState(false);
  const [add, setAdd] = useState("");
  const [remove, setRemove] = useState("");

  useEffect(() => {
    const endPoint = "exercise/get-workouts";
    fetchFromAPI(endPoint)
      .then((result) => {
        setWorkoutData(result);
      })
      .catch((err) => console.error(err));
  }, [changeSuccessful]);

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
  return (
    <div>
      {Object.keys(workoutData).map((workoutType, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography variant="h6">
              {workoutType.charAt(0).toUpperCase() + workoutType.slice(1)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {workoutData[workoutType].map((exercise, exerciseIndex) => (
              <Accordion key={exerciseIndex} elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}a-content-${exerciseIndex}`}
                  id={`panel${index}a-header-${exerciseIndex}`}
                >
                  <Typography variant="body1">{exercise}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Exercise
                    type={workoutType}
                    exercise={exercise}
                    handleDelete={(wt: string, exe: string) =>
                      handleDelete(wt, exe)
                    }
                  />
                </AccordionDetails>
              </Accordion>
            ))}
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
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Workouts;
