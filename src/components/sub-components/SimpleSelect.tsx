import * as React from "react";
import { Select, MenuItem } from "@mui/material";

type values = {
  id: string;
  uploadDateAndTime: string;
};

interface SimpleSelectProps {
  data: values[] | [];
  handleChoice: (value: string) => void;
}

export default function SimpleSelect({
  data = [],
  handleChoice,
}: SimpleSelectProps) {
  const [value, setValue] = React.useState("");

  return (
    <Select
      value={value}
      onChange={(event) => handleChoice(event.target.value)}
    >
      {data.map((item) => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.uploadDateAndTime}
          </MenuItem>
        );
      })}
    </Select>
  );
}
