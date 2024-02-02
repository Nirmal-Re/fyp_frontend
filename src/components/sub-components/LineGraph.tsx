import { Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
} from "chart.js";

Chart.register(LinearScale, CategoryScale, LineElement, PointElement);

interface LineGraphProps {
  title: string;
  plotData: any;
}

const LineGraph = ({ title, plotData }: LineGraphProps) => {
  const data = {
    labels: plotData.uploadDateAndTime,
    datasets: [
      {
        label: title,
        data: plotData.averageForEachDay,
        fill: false,
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
  return (
    <div>
      <h1>{`${title} GRAPH`.toUpperCase()} </h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
