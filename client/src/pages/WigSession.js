import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import LeadTrackerForm from '../components/LeadTrackerForm';
import CommitmentItem from '../components/CommitmentItem';
import AddCommitmentForm from '../components/AddCommitmentForm';
import DateSlider from '../components/DateSlider';
// Import helpers
import { addDays, getMondayDate, getWeek, subtractDays } from '../helpers';

export default function WigSession() {
    const { currentUserInfo, wigData } = useGlobalContext();
    
    const [ currentMonday, setCurrentMonday ] = useState( getMondayDate(new Date()) );
    const [ currentWeek, setCurrentWeek ] = useState( getWeek(currentMonday) );
    const [ currentYear, setCurrentYear ] = useState( currentMonday.getUTCFullYear() );

    const [leadDataToShow, setLeadDataToShow] = useState([]);
    const [commitmentsToShow, setCommitmentsToShow] = useState([]);

    const getCurrentUserCommitments = () => {
        if (currentUserInfo.commitments.length > 0) {
            const current =  currentUserInfo.commitments.filter(item => {
                const date = new Date(item.startDate);
                return getWeek(date) === currentWeek && date.getUTCFullYear() === currentYear;
            });
            return current;
        } else {
            return [];
        }
    }

    const getCurrentLeadData = () => {
        const current = [];

        if (currentUserInfo.leadMeasures.length > 0) {

            currentUserInfo.leadMeasures.forEach(leadMeasure => {
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
        setCommitmentsToShow(getCurrentUserCommitments());
        setLeadDataToShow(getCurrentLeadData());
    }, [currentMonday, currentUserInfo]);

    return (
        <main className="page-container">
            <section className="page-content wig-session-page">
                <PageHeader pageTitle="Wig Session Page"/>

                <DateSlider 
                    currentMonday={currentMonday}
                    setCurrentMonday={setCurrentMonday}
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                />

                <article className="form-container wig-session-page__col-1">
                    {leadDataToShow.length === 0 && 'No WIGs or Leads found for this week...'}
                    
                    {leadDataToShow.length > 0 && <h2 className="form-title mb-10">Update Lead Measures</h2>}
                    {leadDataToShow.length > 0 && leadDataToShow.map((leadMeasure, index) => {
                        return <LeadTrackerForm leadMeasure={leadMeasure} currentMonday={currentMonday} key={index}/>
                    })}
                    
                </article>
                <article className="form-container wig-session-page__col-2">
                    <h2 className="form-title">Weekly Commitments</h2>
                    <AddCommitmentForm 
                        currentMonday={currentMonday}
                    />
                    <h3 className="form-title"> My commitments:</h3>
                    <ul className="commitment-list">
                        {commitmentsToShow.length > 0 && commitmentsToShow.map((commitment, index) => {
                            return <CommitmentItem key={index} commitment={commitment} index={index}/>
                        })}
                        {commitmentsToShow.length === 0 && 'No commitments at the moment...'}
                    </ul>
                </article>
                <PageFooter nonRandomQuote={{
                    quote: "What are the one or two most important things I can do this week to impact the team's performance on the scoreboard?",
                    by: null,
                }}/>
            </section>
        </main>
    )
}
