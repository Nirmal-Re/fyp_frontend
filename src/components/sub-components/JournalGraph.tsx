import { Bar } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, BarElement } from "chart.js";

interface JournalGraphProps {
  props: {
    journalData: any;
  };
}

const JournalGraph = ({ props: { journalData } }: JournalGraphProps) => {
  Chart.register(LinearScale, CategoryScale, BarElement);

  const data = {
    labels: journalData.uploadDateAndTime,
    datasets: [
      {
        label: "journal",
        data: journalData.noOfTrue,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "noOfFalse",
        data: journalData.noOfFalse,
        babelColor: "rgba(60,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default JournalGraph;
