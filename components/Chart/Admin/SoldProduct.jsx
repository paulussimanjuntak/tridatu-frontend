import { Bar } from 'react-chartjs-2'
import { options } from '../data-chart'

const SoldProduct = () => {

  let statisticChart = {
    options: options,
    data: {
      labels: ["Nov", "Des", "Jan", "Feb", "Mar", "Apr"],
      datasets: [
        {
          label: "Penjualan",
          data: [11, 29, 2, 3, 15, 8],
          maxBarThickness: 10,
        },
      ],
    },
  };

  return <Bar data={statisticChart.data} options={statisticChart.options} />

}

export default SoldProduct;
