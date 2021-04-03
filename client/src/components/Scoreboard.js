import React, { useEffect, useState } from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import { Line } from '@reactchartjs/react-chart.js'
import PageHeader from '../components/PageHeader';
import { dataSet1 } from '../mockData';
import { useGlobalContext } from '../appContext';
// import FormLoaderOverlay from './FormLoaderOverlay';
import { getAllWigsByTeamId, getTeamMembers } from '../apiHelper';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import en from 'date-fns/locale/en-GB';
registerLocale('en', en)



export default function Scoreboard(){
  const { currentUserInfo ,isLoading, setIsLoading } = useGlobalContext();
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamMembersDropdown, setTeamMembersDropdown] = useState();
  const [wigs, setWigs] = useState([]);
  const [leadMeasure, setLeadMeasure] = useState();
  const [defaultLeadMeasureDropdownValue, setDefaultLeadMeasureDropdownValue] = useState();
  const [selectedTeamMembers, setSeletedTeamMembers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState();

  useEffect(() => {
    getAllWigsByTeamId(currentUserInfo.teamId)
      .then(data => {
          setWigs(data);
          let defaultWig = data[0];
          setChartData([defaultWig]);
          setLeadMeasure([defaultWig][0].leadMeasures[0]);
          const defaultDateRange = [defaultWig][0].leadMeasures[0].leadData.map(date => date.startDate);
          setDateRange(defaultDateRange);
          const startDate = new Date([defaultWig][0].startDate);
          const endDate = new Date([defaultWig][0].endDate);
          setStartDate(startDate);
          setEndDate(endDate);
          handleDateFilter(startDate, endDate);
          //setIsLoading(false);
      })
      .catch(err => {
          //setIsLoading(false);
          console.error(err);
      });

    getTeamMembers(currentUserInfo.teamId)
      .then(data => {
          setTeamMembers(data);
          setTeamMembersDropdown(data.map(member => {
            return ({name: member.name, label: member.name});
          }))
          //setIsLoading(false);
      })
      .catch(err => {
          //setIsLoading(false);
          console.error(err);
      });
  },[])
  
  const handleSelectedWig = (e) => {
    const chartData = wigs.filter(wig => wig.wigId === e.target.value)
    setChartData(chartData);
    const lead = chartData[0].leadMeasures[0];
    setLeadMeasure(lead);
    const startDate = new Date(chartData[0].startDate);
    const endDate = new Date(chartData[0].endDate);
    setStartDate(startDate);
    setEndDate(endDate);
    handleDateFilter(startDate, endDate);
  }

  const handleSelectedMembers = (selectedOption) => {
    setSeletedTeamMembers(selectedOption);
  };

  const handleSelectedLeadMeasure = (e) => {
    const currentWig = chartData;
    const lead = currentWig[0].leadMeasures.filter(lead => lead.leadId === e.target.value);
    setLeadMeasure(lead[0]);
    setDefaultLeadMeasureDropdownValue(e.target.value);
  }

  const onChangeDate = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    handleDateFilter(start, end);
    console.log(start)
    console.log(end);
  };

  const handleDateFilter = (startDate = chartData[0].startDate, endDate = chartData[0].endDate) => {
    const dates = leadMeasure.leadData.map(date => new Date(date.startDate).getTime());
    const start = startDate?.getTime();
    const end = endDate?.getTime();
    const range = dates.filter(date => date >= start && date <= end)
    const formattedDateArray = range.map(date => new Date(date).toISOString().split("T")[0]);
    setDateRange(formattedDateArray);
  }

  const showData = () => {
    console.log(chartData);
    console.log(leadMeasure);
    console.log(dateRange);
  }


  
  
  const recentLead = dataSet1.recentLead;
  const dates = dataSet1.dates;
  const leadBaseline = dataSet1.leadBaseline;
  const leadDatas = dataSet1.leadData;
  
  
  
  const dataBar = {
    labels: selectedTeamMembers.length > 0 
            ? selectedTeamMembers.map(member => member.name) 
            : teamMembers.map(member => member.name),
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
      labels: dateRange,
      datasets: [
        {
          label: '# of cold calls / team',
          data: leadDatas,
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


  return (
    <>
      <p>
          <h1>{chartData.length > 0 ? chartData[0].wigName : ''}</h1>
      </p>
      <p>
          <h2>from: {chartData.length > 0 ? chartData[0].startDate : ''} until: {chartData.length > 0 ? chartData[0].endDate : ''}</h2>
      </p>
      <div className="filterOptions"> 
          <button type="button" onClick={showData}>console.log</button>
          <section className="filterOption-wig">
              <label htmlFor="wigSelect" className="form-label">WIG</label>
              <select onChange={handleSelectedWig} className="form-select" id="wigSelect" name="wigSelect">
              {wigs.length > 0 && wigs.map((wig, index) => 
                  <option key={index} value={wig.wigId}>{wig.wigName}</option>
              )}
              </select>
          </section>
          <section className="filterOption-leadMeasure">
              <label htmlFor="leadMeasureSelect" className="form-label">Lead Measures</label>
              <select value={defaultLeadMeasureDropdownValue} onChange={handleSelectedLeadMeasure} className="form-select" id="leadMeasureSelect" name="leadMeasureSelect">
              {chartData.length > 0 && chartData[0]?.leadMeasures.map((lead, index) => 
                  <option key={index} value={lead.leadId}>{lead.leadName}</option>
              )}
              </select>
          </section>
          <section className="filterOption-date">
            <label className="form-label" htmlFor="datePicker">Date:</label>
            <DatePicker
              locale="en"
              id="datePicker" 
              name="datePicker" 
              selected={startDate}
              onChange={onChangeDate}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </section>
          <section className="filterOption-teamMembers"></section>
              <label htmlFor="teamMember" className="form-label">TeamMember</label>
              <Select
                isMulti
                id="teamMember"
                name="teamMembers"
                options={teamMembersDropdown}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectedMembers}
              />
      </div>
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
}
