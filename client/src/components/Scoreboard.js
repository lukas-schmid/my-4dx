import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'

const data = {
  labels: ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5', 'Person 6'],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(21, 115, 71, 0.4)',
        'rgba(0, 108, 87, 0.4)',
        'rgba(0, 100, 98, 0.4)',
        'rgba(0, 91, 101, 0.4)',
        'rgba(27, 81, 98, 0.4)',
        'rgba(47, 72, 88, 0.4)',
      ],
      borderColor: [
        'rgba(21, 115, 71, 1)',
        'rgba(0, 108, 87, 1)',
        'rgba(0, 100, 98, 1)',
        'rgba(0, 91, 101, 1)',
        'rgba(27, 81, 98, 1)',
        'rgba(47, 72, 88, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const Scoreboard = () => (
  <>
    <div className='header'>
      <h1 className='title'>Scoreboard title</h1>
    </div>
    <Bar data={data} options={options} />
  </>
)

export default Scoreboard