import React, { useState } from "react";
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
  type: string;
  handleDelete: (wt: string, exe: string) => void;
}

const Exercise = ({ type, exercise, handleDelete }: propsType) => {
  const [sets, setSets] = useState([
    { reps: 10, weight: 55 },
    { reps: 10, weight: 55 },
    { reps: 9, weight: 55 },
    { reps: 7, weight: 52.5 },
  ]);

  const handleRepsChange = (index: number, value: number) => {
    const newSets = [...sets];
    newSets[index].reps = value;
    setSets(newSets);
  };

  const handleWeightChange = (index: number, value: number) => {
    const newSets = [...sets];
    newSets[index].weight = value;
    setSets(newSets);
  };

  const addSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const removeSet = (index: number) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>REPS</TableCell>
            <TableCell>WEIGHT (kg)</TableCell>
            <TableCell>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((set, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  value={set.reps}
                  onChange={(e) =>
                    handleRepsChange(index, Number(e.target.value))
                  }
                  type="number"
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={set.weight}
                  onChange={(e) =>
                    handleWeightChange(index, Number(e.target.value))
                  }
                  type="number"
                  variant="outlined"
                  size="small"
                />
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
        <Button variant="contained" color="primary">
          SAVE
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
