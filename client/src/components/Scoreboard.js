import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import { Line } from '@reactchartjs/react-chart.js'

const dataBar = {
  labels: ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5', 'Person 6'],
  datasets: [
    {
        label: '# of cold calls',
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

const dataLine = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of cold calls / team',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(47, 72, 88)',
        borderColor: 'rgba(47, 72, 88, 0.2)',
      },
      {
        label: 'baseline',
        data: [6, 6, 6, 8, 8, 8],
        fill: false,
        backgroundColor: 'rgb(21, 115, 71)',
        borderColor: 'rgba(21, 115, 71, 0.2)',
      },
    ],
  }

const optionsBar = {
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

const optionsLine = {
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
    <div className= 'scoreBoard'>
    <div style={{
            backgroundColor: 'white',
            width: 500,
            }}>
        <h2 style={{textAlign: 'center'}}>Individual performances week 6</h2>
        <Bar data={dataBar} options={optionsBar} />
    </div>
    <div style={{
            backgroundColor: 'white',
            width: 500,
            }}>
        <h2 style={{textAlign: 'center'}}>Team performance past 6 weeks</h2>
        <Line data={dataLine} options={optionsLine} />    </div>
    </div>
  </>
)

export default Scoreboard