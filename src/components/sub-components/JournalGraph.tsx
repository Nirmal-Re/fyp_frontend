import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  ChartData,
  ChartDataset,
} from "chart.js";
import { Typography } from "@mui/material";
Chart.register(LinearScale, CategoryScale, BarElement);

interface JournalGraphProps {
  props: {
    journalData: any;
  };
}

const JournalGraph = ({ props: { journalData } }: JournalGraphProps) => {
  if (!journalData?.uploadDateAndTime) {
    return <div></div>;
  }
  const data: ChartData<"bar", number[], string> = {
    labels: journalData.uploadDateAndTime.map((dateStr: string) => {
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
        label: "Done",
        data: journalData.noOfTrue,
        backgroundColor: "lightblue",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        type: "bar" as const,
        order: 1, // This will be drawn first
      },
      {
        label: "Not Done",
        data: journalData.noOfFalse,
        backgroundColor: "lightgreen",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        type: "bar" as const,
        order: 2, // This will be drawn second
      },
      {
        label: "Good Moods",
        data: journalData.goodMoods,
        backgroundColor: "green",
        borderColor: "blue",
        borderWidth: 1,
        type: "line" as const,
        order: 3, // This will be drawn last
      },
      {
        label: "Bad Moods",
        data: journalData.badMoods,
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
        type: "line" as const,
        order: 4, // This will be drawn last
      },
    ] as ChartDataset<"bar", number[]>[],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "No of Entries",
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
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">{"JOURNAL GRAPH".toUpperCase()} </Typography>
      <Bar data={data} options={options} />
    </div>
  );
};

export default JournalGraph;
