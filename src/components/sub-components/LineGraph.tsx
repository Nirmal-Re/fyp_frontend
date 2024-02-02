import { Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Typography } from "@mui/material";

Chart.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface LineGraphProps {
  title: string;
  plotData: any;
}

const LineGraph = ({ title, plotData }: LineGraphProps) => {
  const data = {
    labels: plotData.uploadDateAndTime.map((dateStr: string) => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")} ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }),
    datasets: [
      {
        label: title,
        data: plotData.averageForEachDay,
        // fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: title !== "cardio" ? "Weight (kg)" : "Time (minutes)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date And Time",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">{`${title} GRAPH`.toUpperCase()}</Typography>

      <Line data={data} options={options} style={{ width: "100%" }} />
    </div>
  );
};

export default LineGraph;
