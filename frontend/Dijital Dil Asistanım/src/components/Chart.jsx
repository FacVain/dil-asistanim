import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export function Chart({ chartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartData.title,
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        barThickness: 40,
        data: chartData.data,
        backgroundColor: "#112D4E",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
