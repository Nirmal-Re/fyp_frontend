import * as React from "react";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

type DateRangePickerProps = {
  onDateChange: (date: string[]) => void;
};

export default function BasicDateTimePicker({
  onDateChange,
}: DateRangePickerProps) {
  const [start, setStart] = React.useState(dayjs().subtract(7, "day"));
  const [end, setEnd] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 0.5fr",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <DateTimePicker
          label="Start"
          value={start}
          onChange={(newValue: Dayjs | null) => {
            if (newValue) {
              setStart(newValue);
            }
          }}
        />
        <DateTimePicker
          label="End"
          value={end}
          onChange={(newValue: Dayjs | null) => {
            if (newValue) {
              setEnd(newValue);
            }
          }}
          sx={{ marginTop: "0px !important" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            onDateChange([
              start.format("YYYY-MM-DD HH:mm:ss"),
              end.format("YYYY-MM-DD HH:mm:ss"),
            ])
          }
        >
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
