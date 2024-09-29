import React from 'react'
import { Box } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        Height: "100%",
      },
      title: {
        display: true,
        text: "Analytics chart",
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Times Played',
        data: [33, 53, 85, 41, 44, 65],
        borderColor: '#414272',
        backgroundColor: '#414272',
      },
      {
        label: 'Click Rate',
        data: [33, 25, 35, 51, 54, 76],
        borderColor: '#FF4268',
        backgroundColor: '#FF4268',
      },
    ],
  };

  
const Graph = () => {
  return  <Line options={options} data={data} height="400px" />
}

export default Graph
