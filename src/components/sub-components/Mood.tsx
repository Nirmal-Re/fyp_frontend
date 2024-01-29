import { Button } from "@mui/material";

type propsType = {
  props: {
    mood: boolean;
    hour: string;
  };
};

const Mood = ({ props: { mood, hour } }: propsType) => {
  return (
    <div>
      <Button variant="outlined"> {mood ? `${hour} 😀` : `${hour} 😔`} </Button>
    </div>
  );
};

export default Mood;
