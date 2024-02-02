import { Bar, Line } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, BarElement } from "chart.js";
Chart.register(LinearScale, CategoryScale, BarElement);

interface JournalGraphProps {
  props: {
    journalData: any;
  };
}

const JournalGraph = ({ props: { journalData } }: JournalGraphProps) => {
  const data = {
    labels: journalData.uploadDateAndTime,
    datasets: [
      {
        label: "journal",
        data: journalData.noOfTrue,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        // type: "bar" as const,
      },
      {
        label: "noOfFalse",
        data: journalData.noOfFalse,
        babelColor: "rgba(60,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        // type: "bar" as const,
      },
      {
        label: "LineData",
        data: journalData.goodMoods,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        // type: "line" as const,
      },

      {
        label: "LineData",
        data: journalData.badMoods,
        babelColor: "rgba(60,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        // type: "line" as const,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart) => {
            // Get default labels
            const labels =
              Chart.overrides.bar.plugins.legend.labels.generateLabels(chart);

            // Override type for line datasets
            labels.forEach((label) => {
              if (label.datasetIndex === 2 || label.datasetIndex === 3) {
                label.type = "line";
              }
            });

            return labels;
          },
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default JournalGraph;
