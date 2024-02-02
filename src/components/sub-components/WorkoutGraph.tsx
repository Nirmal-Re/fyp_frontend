import { Box } from "@mui/material";
import LineGraph from "./LineGraph";

interface WorkoutGraphProps {
  props: {
    exerciseData: any;
  };
}

const WorkoutGraph = ({ props: { exerciseData } }: WorkoutGraphProps) => {
  return (
    <Box>
      <h1>Workout Graph</h1>
      {Object.entries(exerciseData).map(([key, value]) => {
        return <LineGraph key={key} title={key} plotData={value} />;
      })}
    </Box>
  );
};

export default WorkoutGraph;
