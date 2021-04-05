import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import { Line } from '@reactchartjs/react-chart.js'
import PageHeader from '../components/PageHeader';
import { dataSet1 } from '../mockData';

const teamMembers = dataSet1.teamMembers;
const recentLead = dataSet1.recentLead;
const dates = dataSet1.dates;
const leadBaseline = dataSet1.leadBaseline;
const leadData = dataSet1.leadData;


const dataBar = {
  labels: teamMembers,
  datasets: [
    {
        label: '# of cold calls',
        data: recentLead,
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
    labels: dates,
    datasets: [
      {
        label: '# of cold calls / team',
        data: leadData,
        fill: false,
        backgroundColor: 'rgb(47, 72, 88)',
        borderColor: 'rgba(47, 72, 88, 0.2)',
      },
      {
        label: 'baseline',
        data: leadBaseline,
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
            beginAtZero: false,
          },
        },
      ],
    },
  }

const Scoreboard = () => (
  <>
    <div className= 'scoreBoard'>
        <section className="page-content add-lead-measure-page" style={{width: 400, height: 300}}>
            <PageHeader pageTitle="Individual lead measures"/> 
                <Bar data={dataBar} options={optionsBar} style={{
                    backgroundColor: 'white',
                    }}/>
        </section>
    </div>
    <div className= 'scoreBoard'>
        <section className="page-content add-lead-measure-page" style={{width: 400, height: 300}}>
            <PageHeader pageTitle="Team lead measures"/> 
                <Line data={dataLine} options={optionsLine} style={{
                    backgroundColor: 'white',
                    }}/>
        </section>
    </div>
  </>
)

export default Scoreboard
