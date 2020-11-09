import { Line } from 'react-chartjs-2'
import { options } from '../data-chart'

const StatisticChart = () => {

  let statisticChart = {
    options: options,
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
      datasets: [
        {
          label: "Penjualan",
          data: [0, 2, 1, 1, 5, 10, 12, 30, 26, 11, 23, 42],
        },
      ],
    },
  };

  return <Line data={statisticChart.data} options={statisticChart.options} />

}

export default StatisticChart;
