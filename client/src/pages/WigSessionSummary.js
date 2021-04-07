import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import DateSlider from '../components/DateSlider';
import MemberWigSummary from '../components/MemberWigSummary';
// Import helpers
import { getMondayDate, getWeek } from '../helpers';

export default function WigSessionSummary() {
    const { teamData, wigData } = useGlobalContext();

    const [ currentMonday, setCurrentMonday ] = useState( getMondayDate(new Date()) );
    const [ currentWeek, setCurrentWeek ] = useState( getWeek(currentMonday) );
    const [ currentYear, setCurrentYear ] = useState( currentMonday.getUTCFullYear() );

    const [teamDataToShow, setTeamDataToShow] = useState([]);

    const getCurrentUserCommitments = (commitmentArray) => {
        if (commitmentArray.length > 0) {
            const current =  commitmentArray.filter(item => {
                const date = new Date(item.startDate);
                return getWeek(date) === currentWeek && date.getUTCFullYear() === currentYear;
            });
            return current;
        } else {
            return [];
        }
    }

    const getCurrentLeadData = (leadMeasuresArray) => {
        const current = [];

        if (leadMeasuresArray.length > 0) {

            leadMeasuresArray.forEach(leadMeasure => {
                const currentData = leadMeasure.leadData.filter(item => {
                    const date = new Date(item.startDate);
                    return getWeek(date) === currentWeek && date.getUTCFullYear() === currentYear;
                });

                const leadInfo = wigData.find(wig => wig.wigId === leadMeasure.wigId).leadMeasures.find(lead => lead.leadId === leadMeasure.leadId);

                if ( currentData.length > 0 ) {
                    current.push({
                        leadData: currentData,
                        wigId: leadMeasure.wigId,
                        ...leadInfo,
                        // wigName: wigData.find(wig => wig.wigId === leadMeasure.wigId).wigName,
                    });
                }
            });
        }
        return current;
    }

    useEffect(() => {
        const filteredData = teamData.map(member => {
            const currentCommitments = getCurrentUserCommitments(member.commitments);
            const currentLeadData = getCurrentLeadData(member.leadMeasures);
            return {
                ...member,
                commitments: currentCommitments,
                leadMeasures: currentLeadData
            }
        });

        setTeamDataToShow([...filteredData]);
    }, [teamData, currentMonday]);
    
    return (
        <main className="page-container wig-session-summary-page">
            <section className="page-content">
                <PageHeader pageTitle="Wig Session Summary" />
                <DateSlider 
                    currentMonday={currentMonday}
                    setCurrentMonday={setCurrentMonday}
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                />
                <article >
                    {teamDataToShow.length > 0 && teamDataToShow.map((member, index) => {
                        return <MemberWigSummary teamMember={member} key={index}/>
                    })}
                </article>
                <PageFooter excludeQuote={true} />
            </section>
        </main>
    )
}
