import { getMondayDate } from '../helpers';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from '@reactchartjs/react-chart.js';
import { Line } from '@reactchartjs/react-chart.js';
import PageHeader from '../components/PageHeader';
import { useGlobalContext } from '../appContext';
import FormLoaderOverlay from './FormLoaderOverlay';
import { getAllWigsByTeamId, getTeamMembers } from '../apiHelper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import en from 'date-fns/locale/en-GB';
registerLocale('en', en);

export default function Scoreboard(){
  const { currentUserInfo , wigData, setWigData, teamData, setTeamData } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentWig, setCurrentWig] = useState();
  const [currentLeadMeasure, setCurrentLeadMeasure] = useState();
  const [defaultLeadMeasureDropdownValue, setDefaultLeadMeasureDropdownValue] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState();
  const [filteredLagData, setfilteredLagData] = useState();
  const [individualLeadData, setIndividualLeadData] = useState([]);

  useEffect(() => {
    getTeamMembers(currentUserInfo.teamId)
      .then(data => {
          setTeamData(data);  // global state
      })
      .catch(err => {
          console.error(err);
      });
  }, [])

  useEffect(() => {
    setIsLoading(true);
    getAllWigsByTeamId(currentUserInfo.teamId)
      .then(data => {
          if (data.message && data.message === 'not found') {
            setIsLoading(false);
            return;
          };
          setWigData(data); // global state
          setCurrentWig(data[0]);
          setCurrentLeadMeasure(data[0].leadMeasures[0]);
          setStartDate(new Date(data[0].startDate));
          setEndDate(new Date(data[0].endDate));
          setDateRange(handleDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)));
          setfilteredLagData(handleLagData(handleLagDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)), data[0].lagData));
          setIsLoading(false);
      })
      .catch(err => {
          console.error(err);
      });
  }, [])

  useEffect(() => {
    if (currentLeadMeasure) {
      getIndividualLeadData(currentLeadMeasure);
    }
  }, [teamData, currentLeadMeasure, dateRange])


  const handleSelectedWig = (e) => {
    const wig = wigData.filter(wig => wig.wigId === e.target.value)
    setCurrentWig(wig[0]);
    setCurrentLeadMeasure(wig[0].leadMeasures[0]);
    setStartDate(new Date(wig[0].startDate));
    setEndDate(new Date(wig[0].endDate));
    setDateRange(handleDateFilter(wig[0], new Date(wig[0].startDate), new Date(wig[0].endDate)));
    setfilteredLagData(handleLagData(handleLagDateFilter(wig[0], new Date(wig[0].startDate), new Date(wig[0].endDate)), wig[0].lagData))   
  }

  const handleSelectedLeadMeasure = (e) => {
    const lead = currentWig.leadMeasures.filter(lead => lead.leadId === e.target.value);
    setCurrentLeadMeasure(lead[0]);
    setDefaultLeadMeasureDropdownValue(e.target.value);
  }

  const onChangeDate = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDateRange(handleDateFilter(currentWig, start, end));
    setfilteredLagData(handleLagData(handleLagDateFilter(currentWig, start, end), currentWig.lagData));
  };

  const handleDateFilter = (currentWig, from, to) => {
    const startDate = from?.getTime();
    const endDate = to?.getTime();
    const lagDates = currentWig.lagData.map(date => new Date(date.startDate).getTime());
    const range = lagDates.filter(date => date >= startDate && date <= endDate);

    // console.log(range)

    return range.map(date => new Date(date).toISOString().split("T")[0]);
  }

  const handleLagDateFilter = (currentWig, from, to) => {
    const startDate = from?.getTime();
    const endDate = to?.getTime();
    const lagDates = currentWig.lagData.map(date => new Date(date.startDate).getTime());
    const range = lagDates.filter(date => date >= startDate && date <= endDate);
    return range.map(date => new Date(date).toISOString().split("T")[0]);
  }
  
  const handleLagData = (dateRange, lagData) => {
    return lagData.filter(data => dateRange.includes(data.startDate));
  }

  const getIndividualLeadData = (currentLead) => {
    const data = teamData.filter(member => member.scoreboardInclude === true).map(member => member.leadMeasures.filter(obj => obj.leadId === currentLead.leadId)[0]);
    const sumArray = data.map(obj => {
      let sum = 0;
      let counter = 0;
      if (obj === undefined){
        return sum;
      }
      obj.leadData.forEach(dataSet => {
        if (dateRange && new Date(dataSet.startDate).getTime() >= getMondayDate(startDate) && new Date(dataSet.startDate).getTime() <= endDate){
          sum += parseFloat(dataSet.data) || 0;
          counter = parseFloat(dataSet.data) ? counter + 1 : counter;
        }
      });
      const objWig = wigData.find(wig => wig.wigId === obj.wigId);
      const objLead = objWig.leadMeasures.find(lm => lm.leadId === obj.leadId);
      return objLead.leadDataType === 'percent' ? sum / counter : sum;
    })
    setIndividualLeadData(sumArray);
  }
  
  const dataBar = {
    labels: teamData.length > 0 && teamData.filter(member => member.scoreboardInclude === true).map(member => member.name),
    datasets: [
      {
        label: currentLeadMeasure && currentLeadMeasure.leadName,
        data: individualLeadData,
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
          label: 'Actual',
          data: filteredLagData?.length > 0 ? filteredLagData.map(data => data.actual) : 0,
          fill: false,
          backgroundColor: 'rgb(47, 72, 88)',
          borderColor: 'rgba(47, 72, 88, 0.2)',
        },
        {
          label: 'Target',
          data: filteredLagData?.length > 0 ? filteredLagData.map(data => data.goal) : 0,
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



  return (
    <>
      {isLoading && <FormLoaderOverlay size="small"/>}
      {wigData.length === 0 || isLoading
      ? 
      <div className="noWigMessage page-content">
      <PageHeader pageTitle="No WIG found..." />
        <div className="charts-wigDate">
          <h2 style={{fontWeight: 'normal'}}>You don't appear to have any WIGs yet!</h2>
          <button className="btn btn-success mb-20"><Link to="/setup/add-wig">Add WIG</Link></button>
        </div>
      </div>
      :
      <main className="page-container scoreboard-page page-container--multi-col">
        <div className="page-content scoreboard-charts">
          <div className="charts">
            <PageHeader pageTitle={currentWig && currentWig.wigName} />
            <div className="charts-wigDate">
              <h2>Showing data from {dateRange && dateRange[0]} to {dateRange && dateRange[dateRange.length - 1]}</h2>
            </div>
              <div className= 'scoreBoard'>
                  <section className="page-content" style={{width: "-webkit-fill-available"}}>
                      <PageHeader pageTitle={currentWig ? `LAG - ${currentWig.lagName}` : 'Lag Measure'}/> 
                          <Line data={dataLine} options={optionsLine} style={{
                              backgroundColor: 'white',
                              }}/>
                  </section>
              </div>
              <div className="scoreboards">
              <div className= 'scoreBoard'>
                <section className="page-content" style={{width: "-webkit-fill-available"}}>
                    <PageHeader pageTitle={currentLeadMeasure ? `LEAD - ${currentLeadMeasure.leadName}` : 'Lead Measure'}/> 
                        <Bar data={dataBar} options={optionsBar} style={{
                            backgroundColor: 'white',
                            }}/>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content filters">
          <div className="filterOptions">
            <PageHeader pageTitle="Filters" />
            <div className="options">
              <section className="filterOption-wig">
                <label htmlFor="wigSelect" className="form-label">WIG</label>
                <select onChange={handleSelectedWig} className="form-select" id="wigSelect" name="wigSelect">
                {wigData.length > 0 && wigData.map((wig, index) => 
                    <option key={index} value={wig.wigId}>{wig.wigName}</option>
                )}
                </select>
              </section>
              <section className="filterOption-leadMeasure">
                  <label htmlFor="leadMeasureSelect" className="form-label">Lead Measures</label>
                  <select value={defaultLeadMeasureDropdownValue} onChange={handleSelectedLeadMeasure} className="form-select" id="leadMeasureSelect" name="leadMeasureSelect">
                  {currentWig && currentWig.leadMeasures.map((lead, index) => 
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
            </div>
          </div>
        </div>
      </main>}
    </>
  )}
