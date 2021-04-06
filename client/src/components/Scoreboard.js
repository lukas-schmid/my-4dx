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
import { registerLocale } from  "react-datepicker";
import en from 'date-fns/locale/en-GB';
registerLocale('en', en)



export default function Scoreboard(){
  const { currentUserInfo ,isLoading, setIsLoading } = useGlobalContext();
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamMembersDropdown, setTeamMembersDropdown] = useState();
  const [matchingTeamMembers, setMatchingTeamMembers] = useState();
  const [allWigs, setAllWigs] = useState([]);
  const [currentWig, setCurrentWig] = useState();
  const [currentLeadMeasure, setCurrentLeadMeasure] = useState();
  const [defaultLeadMeasureDropdownValue, setDefaultLeadMeasureDropdownValue] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState();
  //const [lagDateRange, setLagDateRange] = useState();
  const [selectedTeamMembers, setSeletedTeamMembers] = useState([]);
  const [filteredLagData, setfilteredLagData] = useState();

  useEffect(() => {
    getTeamMembers(currentUserInfo.teamId)
      .then(data => {
          setTeamMembers(data);
          //setTeamMembersDropdown(filterMembersByLeadId(data, currentLeadMeasure));
          setTeamMembersDropdown(data.map(member => {
            return ({name: member.name, label: member.name, id: member.id});
          }))
      })
      .catch(err => {
          //setTeamMembers([]);
          setTeamMembersDropdown([{name: currentUserInfo.name, label: currentUserInfo.name, id: currentUserInfo.id}]);
          console.error(err);
      });
  }, [])

  useEffect(() => {
    getAllWigsByTeamId(currentUserInfo.teamId)
      .then(data => {
          setAllWigs(data);
          setCurrentWig(data[0]);
          setCurrentLeadMeasure(data[0].leadMeasures[0]);
          setStartDate(new Date(data[0].startDate));
          setEndDate(new Date(data[0].endDate));
          setDateRange(handleDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)));
          //setLagDateRange(handleLagDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)));
          setfilteredLagData(handleLagData(handleLagDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)), data[0].lagData));
      })
      .catch(err => {
          //setAllWigs([]);
          //setCurrentWig([]);
          console.error(err);
      });
  }, [])

  // useEffect (() => {
  //   if (teamMembers && currentLeadMeasure) {
  //     const matchingTeamMembers = filterMembersByLeadId(teamMembers, currentLeadMeasure.leadId);
  //     setMatchingTeamMembers(matchingTeamMembers);
  //     setTeamMembersDropdown(matchingTeamMembers.map(member => {
  //       return ({name: member.name, label: member.name, id: member.id});
  //     }))
  //   }
  // },[teamMembers, currentLeadMeasure]);

  const handleSelectedWig = (e) => {
    const wig = allWigs.filter(wig => wig.wigId === e.target.value)
    setCurrentWig(wig[0]);
    setCurrentLeadMeasure(wig[0].leadMeasures[0]);
    setStartDate(new Date(wig[0].startDate));
    setEndDate(new Date(wig[0].endDate));
    setDateRange(handleDateFilter(wig[0], new Date(wig[0].startDate), new Date(wig[0].endDate)));
    //setLagDateRange(handleLagDateFilter(wig[0], new Date(wig[0].startDate), new Date(wig[0].endDate)));
    setfilteredLagData(handleLagData(handleLagDateFilter(wig[0], new Date(wig[0].startDate), new Date(wig[0].endDate)), wig[0].lagData))   
  }

  const handleSelectedLeadMeasure = (e) => {
    const lead = currentWig.leadMeasures.filter(lead => lead.leadId === e.target.value);
    setCurrentLeadMeasure(lead[0]);
    setDefaultLeadMeasureDropdownValue(e.target.value);
    setDateRange(handleDateFilter(currentWig, new Date(currentWig.startDate), new Date(currentWig.endDate)));
  }

  const onChangeDate = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDateRange(handleDateFilter(currentWig, start, end));
    //setLagDateRange(handleLagDateFilter(currentWig, start, end));
    setfilteredLagData(handleLagData(handleLagDateFilter(currentWig, start, end), currentWig.lagData));
  };

  const handleDateFilter = (currentWig, from, to) => {
    const startDate = from?.getTime();
    const endDate = to?.getTime();
    const lagDates = currentWig.lagData.map(date => new Date(date.startDate).getTime());
    const range = lagDates.filter(date => date >= startDate && date <= endDate);
    return range.map(date => new Date(date).toISOString().split("T")[0]);
  }

  const handleLagDateFilter = (currentWig, from, to) => {
    const startDate = from?.getTime();
    const endDate = to?.getTime();
    const lagDates = currentWig.lagData.map(date => new Date(date.startDate).getTime());
    const range = lagDates.filter(date => date >= startDate && date <= endDate);
    return range.map(date => new Date(date).toISOString().split("T")[0]);
  }

  const handleSelectedMembers = (selectedOption) => {
    setSeletedTeamMembers(selectedOption);
  };

  const handleLagData = (dateRange, lagData) => {
    return lagData.filter(data => dateRange.includes(data.startDate));
  }

  // const filterMembersByLeadId = (teamMembers, leadId) => {
  //   return teamMembers.filter(member => {
  //     const matchingMember = member.leadMeasures.filter(obj => obj.leadId === leadId);
  //     if (matchingMember !== undefined){
  //       return matchingMember[0];
  //     }
  //   });
  // }


  const showData = () => {
    console.log(teamMembers);
    console.log(matchingTeamMembers);
  }
  
  const recentLead = dataSet1.recentLead;
  const dates = dataSet1.dates;
  const leadBaseline = dataSet1.leadBaseline;
  const leadDatas = dataSet1.leadData;
  
  
  
  const dataBar = {
    labels: selectedTeamMembers.length > 0 
            ? selectedTeamMembers.map(member => member.name) 
            : teamMembers?.map(member => member.name),
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
          data: filteredLagData?.length > 0 ? filteredLagData.map(data => data.actual) : 0,
          fill: false,
          backgroundColor: 'rgb(47, 72, 88)',
          borderColor: 'rgba(47, 72, 88, 0.2)',
        },
        {
          label: 'goal',
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
      <button type="button" onClick={showData}>console.log</button>
      {allWigs.length === 0 ? <p>no Wig found</p> :
      <div id="scoreboardContainer">
        <div id="filters">
          <div>
            <div className="page-content add-lead-measure-page">
              <PageHeader pageTitle={currentWig?.wigName} /> 
            </div>
            <div>
              <h2>from: {currentWig?.startDate} until: {currentWig?.endDate}</h2>
            </div>
          <div className="filterOptions">
            <section className="filterOption-wig">
                <label htmlFor="wigSelect" className="form-label">WIG</label>
                <select onChange={handleSelectedWig} className="form-select" id="wigSelect" name="wigSelect">
                {allWigs.length > 0 && allWigs.map((wig, index) => 
                    <option key={index} value={wig.wigId}>{wig.wigName}</option>
                )}
                </select>
            </section>
            <section className="filterOption-leadMeasure">
                <label htmlFor="leadMeasureSelect" className="form-label">Lead Measures</label>
                <select value={defaultLeadMeasureDropdownValue} onChange={handleSelectedLeadMeasure} className="form-select" id="leadMeasureSelect" name="leadMeasureSelect">
                {currentWig?.leadMeasures.map((lead, index) => 
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
            <section className="filterOption-teamMembers">
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
            </section>
          </div>
        </div>
        </div>
        <div id="scoreBoards">
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
                  <PageHeader pageTitle="Team lag data"/> 
                      <Line data={dataLine} options={optionsLine} style={{
                          backgroundColor: 'white',
                          }}/>
              </section>
          </div>
        </div>
    </div>}
  </>
  )
}
