import React, { useEffect, useState } from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import { Line } from '@reactchartjs/react-chart.js'
import PageHeader from '../components/PageHeader';
import { useGlobalContext } from '../appContext';
import { getAllWigsByTeamId, getTeamMembers } from '../apiHelper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import en from 'date-fns/locale/en-GB';
registerLocale('en', en)



export default function Scoreboard(){
  const { currentUserInfo , wigData, setWigData, teamData, setTeamData } = useGlobalContext();
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
    getAllWigsByTeamId(currentUserInfo.teamId)
      .then(data => {
          if (data.message && data.message === 'not found') return;
          setWigData(data); // global state
          setCurrentWig(data[0]);
          setCurrentLeadMeasure(data[0].leadMeasures[0]);
          setStartDate(new Date(data[0].startDate));
          setEndDate(new Date(data[0].endDate));
          setDateRange(handleDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)));
          setfilteredLagData(handleLagData(handleLagDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)), data[0].lagData));
      })
      .catch(err => {
          console.error(err);
      });
  }, [])

  useEffect(() => {
    if (currentLeadMeasure) {
      getIndividualLeadData(currentLeadMeasure);
    }
  }, [currentLeadMeasure, dateRange])

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
    const data = teamData.map(member => member.leadMeasures.filter(obj => obj.leadId === currentLead.leadId)[0]);
    const sumArray = data.map(obj => {
      let sum = 0;
      obj.leadData.forEach(dataSet => {
        if (dateRange && dateRange.includes(dataSet.startDate)){
        sum += dataSet.data || 0;
        }
      })
      return sum;
    })
    setIndividualLeadData(sumArray);
  }
  
  const dataBar = {
    labels: teamData.length > 0 && teamData.map(member => member.name),
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
      {wigData.length === 0 
      ? 
      <div className="noWigMessage page-content">
      <PageHeader pageTitle="No Wig" />
        <div className="charts-wigDate">
          <h2>No Wig found. Please add one first!</h2>
        </div>
      </div>
      :
      <main className="page-container page-container--multi-col">
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
        <div className="page-content scoreboard-charts">
          <div className="charts">
            <PageHeader pageTitle={currentWig && currentWig.wigName} />
            <div className="charts-wigDate">
              <h2>from: {dateRange && dateRange[0]} until: {dateRange && dateRange[dateRange.length - 1]}</h2>
            </div>
            
            <div className="scoreboards">
              <div className= 'scoreBoard'>
                <section className="page-content" style={{height: 300, width: "-webkit-fill-available"}}>
                    <PageHeader pageTitle="Individual lead measures"/> 
                        <Bar data={dataBar} options={optionsBar} style={{
                            backgroundColor: 'white',
                            }}/>
                </section>
              </div>
              <div className= 'scoreBoard'>
                  <section className="page-content" style={{height: 300, width: "-webkit-fill-available"}}>
                      <PageHeader pageTitle="Team lag data"/> 
                          <Line data={dataLine} options={optionsLine} style={{
                              backgroundColor: 'white',
                              }}/>
                  </section>
              </div>
            </div>
          </div>
        </div>
      </main>}
    </>
        /* 
        
            
          <div className="filterOptions">
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
        </div> */
  )
}

// import React, { useEffect, useState } from 'react'
// import { Bar } from '@reactchartjs/react-chart.js'
// import { Line } from '@reactchartjs/react-chart.js'
// import PageHeader from '../components/PageHeader';
// import { dataSet1 } from '../mockData';
// import { useGlobalContext } from '../appContext';
// // import FormLoaderOverlay from './FormLoaderOverlay';
// import { getAllWigsByTeamId, getTeamMembers } from '../apiHelper';
// import Select from 'react-select';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { registerLocale } from  "react-datepicker";
// import en from 'date-fns/locale/en-GB';
// registerLocale('en', en)



// export default function Scoreboard(){
//   const { currentUserInfo , wigData, setWigData, teamData, setTeamData } = useGlobalContext();

//   const [teamMembers, setTeamMembers] = useState([]);
//   const [teamMembersDropdown, setTeamMembersDropdown] = useState();
//   //const [matchingTeamMembers, setMatchingTeamMembers] = useState();
//   const [allWigs, setAllWigs] = useState([]);
//   const [currentWig, setCurrentWig] = useState();
//   const [currentLeadMeasure, setCurrentLeadMeasure] = useState();
//   const [defaultLeadMeasureDropdownValue, setDefaultLeadMeasureDropdownValue] = useState();
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const [dateRange, setDateRange] = useState();
//   const [selectedTeamMembers, setSeletedTeamMembers] = useState([]);
//   const [filteredLagData, setfilteredLagData] = useState();
//   const [individualLeadData, setIndividualLeadData] = useState([]);

//   useEffect(() => {
//     getTeamMembers(currentUserInfo.teamId)
//       .then(data => {
//           setTeamData(data);  // global state
//           setTeamMembers(data);
//           //setTeamMembersDropdown(filterMembersByLeadId(data, currentLeadMeasure));
//           setTeamMembersDropdown(data.map(member => {
//             return ({name: member.name, label: member.name, id: member.id});
//           }));
//       })
//       .catch(err => {
//           //setTeamMembers([]);
//           setTeamMembersDropdown([{name: currentUserInfo.name, label: currentUserInfo.name, id: currentUserInfo.id}]);
//           console.error(err);
//       });
//   }, [])

//   useEffect(() => {
//     getAllWigsByTeamId(currentUserInfo.teamId)
//       .then(data => {
//           if (data.message && data.message === 'not found') return;
//           setWigData(data); // global state
          
//           setAllWigs(data);
//           setCurrentWig(data[0]);
//           setCurrentLeadMeasure(data[0].leadMeasures[0]);
//           setStartDate(new Date(data[0].startDate));
//           setEndDate(new Date(data[0].endDate));
//           setDateRange(handleDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)));
//           setfilteredLagData(handleLagData(handleLagDateFilter(data[0], new Date(data[0].startDate), new Date(data[0].endDate)), data[0].lagData));
//       })
//       .catch(err => {
//           //setAllWigs([]);
//           //setCurrentWig([]);
//           console.error(err);
//       });
//   }, [])

//   useEffect(() => {
//     getIndividualLeadData();
//   }, [currentLeadMeasure])

//   // useEffect (() => {
//   //   if (teamMembers && currentLeadMeasure) {
//   //     const matchingTeamMembers = filterMembersByLeadId(teamMembers, currentLeadMeasure.leadId);
//   //     setMatchingTeamMembers(matchingTeamMembers);
//   //     setTeamMembersDropdown(matchingTeamMembers.map(member => {
//   //       return ({name: member.name, label: member.name, id: member.id});
//   //     }))
//   //   }
//   // },[teamMembers, currentLeadMeasure]);

//   const handleSelectedWig = (e) => {
//     const wig = allWigs.filter(wig => wig.wigId === e.target.value)
//     setCurrentWig(wig[0]);
//     setCurrentLeadMeasure(wig[0].leadMeasures[0]);
//     setStartDate(new Date(wig[0].startDate));
//     setEndDate(new Date(wig[0].endDate));
//     setDateRange(handleDateFilter(wig[0], new Date(wig[0].startDate), new Date(wig[0].endDate)));
//     setfilteredLagData(handleLagData(handleLagDateFilter(wig[0], new Date(wig[0].startDate), new Date(wig[0].endDate)), wig[0].lagData))   
//   }

//   const handleSelectedLeadMeasure = (e) => {
//     const lead = currentWig.leadMeasures.filter(lead => lead.leadId === e.target.value);
//     setCurrentLeadMeasure(lead[0]);
//     setDefaultLeadMeasureDropdownValue(e.target.value);
//     setDateRange(handleDateFilter(currentWig, new Date(currentWig.startDate), new Date(currentWig.endDate)));
//   }

//   const onChangeDate = dates => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//     setDateRange(handleDateFilter(currentWig, start, end));
//     setfilteredLagData(handleLagData(handleLagDateFilter(currentWig, start, end), currentWig.lagData));
//   };

//   const handleDateFilter = (currentWig, from, to) => {
//     const startDate = from?.getTime();
//     const endDate = to?.getTime();
//     const lagDates = currentWig.lagData.map(date => new Date(date.startDate).getTime());
//     const range = lagDates.filter(date => date >= startDate && date <= endDate);
//     return range.map(date => new Date(date).toISOString().split("T")[0]);
//   }

//   const handleLagDateFilter = (currentWig, from, to) => {
//     const startDate = from?.getTime();
//     const endDate = to?.getTime();
//     const lagDates = currentWig.lagData.map(date => new Date(date.startDate).getTime());
//     const range = lagDates.filter(date => date >= startDate && date <= endDate);
//     return range.map(date => new Date(date).toISOString().split("T")[0]);
//   }

//   const handleSelectedMembers = (selectedOption) => {
//     setSeletedTeamMembers(selectedOption);
//   };

//   const handleLagData = (dateRange, lagData) => {
//     return lagData.filter(data => dateRange.includes(data.startDate));
//   }

  

//   // const filterMembersByLeadId = (teamMembers, leadId) => {
//   //   return teamMembers.filter(member => {
//   //     const matchingMember = member.leadMeasures.filter(obj => obj.leadId === leadId);
//   //     if (matchingMember !== undefined){
//   //       return matchingMember[0];
//   //     }
//   //   });
//   // }

//   const getIndividualLeadData = () => {
//     const members = selectedTeamMembers.length > 0 
//       ? selectedTeamMembers.map(member => member.id) 
//       : teamMembers?.map(member => member.id);
//     const leadMeasures = members.map(id => {
//       const user = teamData.filter(obj => obj.id === id)[0];
//       return user.leadMeasures.filter(obj => obj.leadId === currentLeadMeasure.leadId)[0];
//     })
//     const data = leadMeasures.map(leadMeasure => {
//       let sum = 0;
//       leadMeasure.leadData.forEach(data => {
//         sum += data.data || 0;
//       })
//       return sum;
//     })
//     setIndividualLeadData(data);
//   }


//   const showData = () => {
//     console.log(teamData);
//     console.log(currentLeadMeasure);
//     console.log(teamMembers);
//     getIndividualLeadData();
//     console.log(individualLeadData);
//   }
  
//   const recentLead = dataSet1.recentLead;
//   const dates = dataSet1.dates;
//   const leadBaseline = dataSet1.leadBaseline;
//   const leadDatas = dataSet1.leadData;
  
  
  
//   const dataBar = {
//     labels: selectedTeamMembers.length > 0 
//             ? selectedTeamMembers.map(member => member.name) 
//             : teamMembers?.map(member => member.name),
//     datasets: [
//       {
//         label: '# of cold calls',
//         data: individualLeadData,
//         backgroundColor: [
//           'rgba(21, 115, 71, 0.4)',
//           'rgba(0, 108, 87, 0.4)',
//           'rgba(0, 100, 98, 0.4)',
//           'rgba(0, 91, 101, 0.4)',
//           'rgba(27, 81, 98, 0.4)',
//           'rgba(47, 72, 88, 0.4)',  
//         ],
//         borderColor: [
//           'rgba(21, 115, 71, 1)',
//           'rgba(0, 108, 87, 1)',
//           'rgba(0, 100, 98, 1)',
//           'rgba(0, 91, 101, 1)',
//           'rgba(27, 81, 98, 1)',
//           'rgba(47, 72, 88, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   }
  
//   const dataLine = {
//       labels: dateRange,
//       datasets: [
//         {
//           label: '# of cold calls / team',
//           data: filteredLagData?.length > 0 ? filteredLagData.map(data => data.actual) : 0,
//           fill: false,
//           backgroundColor: 'rgb(47, 72, 88)',
//           borderColor: 'rgba(47, 72, 88, 0.2)',
//         },
//         {
//           label: 'goal',
//           data: filteredLagData?.length > 0 ? filteredLagData.map(data => data.goal) : 0,
//           fill: false,
//           backgroundColor: 'rgb(21, 115, 71)',
//           borderColor: 'rgba(21, 115, 71, 0.2)',
//         },
//       ],
//     }

  
  
//   const optionsBar = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   }
  
//   const optionsLine = {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     }



//   return (
//     <>
//       <button type="button" onClick={showData}>console.log</button>
//       {allWigs.length === 0 ? <p>no Wig found</p> :
//       <div id="scoreboardContainer">
//         <div id="filters">
//           <div>
//             <div className="page-content add-lead-measure-page">
//               <PageHeader pageTitle={currentWig?.wigName} /> 
//             </div>
//             <div>
//               <h2>from: {currentWig?.startDate} until: {currentWig?.endDate}</h2>
//             </div>
//           <div className="filterOptions">
//             <section className="filterOption-wig">
//                 <label htmlFor="wigSelect" className="form-label">WIG</label>
//                 <select onChange={handleSelectedWig} className="form-select" id="wigSelect" name="wigSelect">
//                 {allWigs.length > 0 && allWigs.map((wig, index) => 
//                     <option key={index} value={wig.wigId}>{wig.wigName}</option>
//                 )}
//                 </select>
//             </section>
//             <section className="filterOption-leadMeasure">
//                 <label htmlFor="leadMeasureSelect" className="form-label">Lead Measures</label>
//                 <select value={defaultLeadMeasureDropdownValue} onChange={handleSelectedLeadMeasure} className="form-select" id="leadMeasureSelect" name="leadMeasureSelect">
//                 {currentWig?.leadMeasures.map((lead, index) => 
//                     <option key={index} value={lead.leadId}>{lead.leadName}</option>
//                 )}
//                 </select>
//             </section>
//             <section className="filterOption-date">
//               <label className="form-label" htmlFor="datePicker">Date:</label>
//               <DatePicker
//                 locale="en"
//                 id="datePicker" 
//                 name="datePicker" 
//                 selected={startDate}
//                 onChange={onChangeDate}
//                 startDate={startDate}
//                 endDate={endDate}
//                 selectsRange
//                 inline
//               />
//             </section>
//             <section className="filterOption-teamMembers">
//                 <label htmlFor="teamMember" className="form-label">TeamMember</label>
//                 <Select
//                   isMulti
//                   id="teamMember"
//                   name="teamMembers"
//                   options={teamMembersDropdown}
//                   className="basic-multi-select"
//                   classNamePrefix="select"
//                   onChange={handleSelectedMembers}
//                 />
//             </section>
//           </div>
//         </div>
//         </div>
//         <div id="scoreBoards">
//           <div className= 'scoreBoard'>
//             <section className="page-content add-lead-measure-page" style={{width: 400, height: 300}}>
//                 <PageHeader pageTitle="Individual lead measures"/> 
//                     <Bar data={dataBar} options={optionsBar} style={{
//                         backgroundColor: 'white',
//                         }}/>
//             </section>
//           </div>
//           <div className= 'scoreBoard'>
//               <section className="page-content add-lead-measure-page" style={{width: 400, height: 300}}>
//                   <PageHeader pageTitle="Team lag data"/> 
//                       <Line data={dataLine} options={optionsLine} style={{
//                           backgroundColor: 'white',
//                           }}/>
//               </section>
//           </div>
//         </div>
//     </div>}
//   </>
//   )
// }
