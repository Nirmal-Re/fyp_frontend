import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Report = () => {
  const rows = [
    createData("Row 1, Cell 1", "Row 1, Cell 2"),
    createData("Row 2, Cell 1", "Row 2, Cell 2"),
    // ...more rows as needed
  ];

  function createData(col1: string, col2: string) {
    return { col1, col2 };
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Column 1</TableCell>
            <TableCell align="right">Column 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.col1}
              </TableCell>
              <TableCell align="right">{row.col2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Report;
