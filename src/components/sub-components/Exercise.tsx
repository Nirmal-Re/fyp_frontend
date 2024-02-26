import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface propsType {
  exercise: string;
  exerciseIndex: number;
  type: string;
  setsForExercise:
    | { reps: number; weight: number }[]
    | { reps: number; time: number }[]
    | [];
  handleDelete: (wt: string, exe: string) => void;
  handleSave: (
    index: number,
    arg: {
      name: string;
      sets:
        | { reps: number; weight: number }[]
        | { reps: number; time: number }[];
    }
  ) => void;
}

const Exercise = ({
  type,
  exercise,
  exerciseIndex,
  setsForExercise,
  handleDelete,
  handleSave,
}: propsType) => {
  const [sets, setSets] = useState(
    setsForExercise.length === 0
      ? type === "cardio"
        ? [{ reps: 0, time: 0 }]
        : [{ reps: 0, weight: 0 }]
      : setsForExercise
  );
  const handleRepsChange = (index: number, value: number) => {
    const newSets = [...sets];
    newSets[index].reps = value;
    setSets(newSets as typeof sets);
  };

  const handleWeightChange = (index: number, value: number) => {
    const newSets = [...sets];
    if (type !== "cardio") {
      (newSets[index] as { reps: number; weight: number }).weight = value;
    } else {
      (newSets[index] as { reps: number; time: number }).time = value;
    }
    setSets(newSets as typeof sets);
  };

  const addSet = () => {
    if (type !== "cardio") {
      setSets([...sets, { weight: 0, reps: 0 }] as typeof sets);
    } else {
      setSets([...sets, { time: 0, reps: 0 }] as typeof sets);
    }
  };

  const removeSet = (index: number) => {
    const newSets = [...sets];
    newSets.splice(index, 1);

    setSets(newSets as typeof sets);
  };

  useEffect(() => {
    setSets(
      setsForExercise.length === 0
        ? type === "cardio"
          ? [{ reps: 0, time: 0 }]
          : [{ reps: 0, weight: 0 }]
        : setsForExercise
    );
  }, [setsForExercise, type]);

  useEffect(() => {
    handleSave(exerciseIndex, { name: exercise, sets });
  }, [sets, exercise, handleSave, exerciseIndex]);

  return (
    <TableContainer component={Paper} sx={{ border: "2px solid black" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>REPS</TableCell>
            <TableCell>
              {type !== "cardio" ? "WEIGHT (kg)" : "TIME (mins)"}
            </TableCell>
            <TableCell>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((set, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  value={set.reps}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      handleRepsChange(index, value);
                    } else {
                      alert("Negative values are not allowed");
                    }
                  }}
                  type="number"
                  variant="outlined"
                  size="small"
                  required
                />
              </TableCell>
              <TableCell>
                {"weight" in set && (
                  <TextField
                    value={set.weight}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        handleWeightChange(index, value);
                      } else {
                        alert("Negative values are not allowed");
                      }
                    }}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                )}
                {"time" in set && (
                  <TextField
                    value={set["time"]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        handleWeightChange(index, value);
                      } else {
                        alert("Negative values are not allowed");
                      }
                    }}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => removeSet(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        p={2}
      >
        <Button onClick={addSet} variant="contained" color="primary">
          ADD SET
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDelete(type, exercise)}
        >
          Delete Exercise
        </Button>
      </Box>
    </TableContainer>
  );
};

export default Exercise;
