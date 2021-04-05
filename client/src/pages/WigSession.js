import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import LeadTrackerForm from '../components/LeadTrackerForm';
import CommitmentItem from '../components/CommitmentItem';
import AddCommitmentForm from '../components/AddCommitmentForm';
// Import helpers
import { addDays, getMondayDate, getWeek, subtractDays } from '../helpers';

export default function WigSession() {
    const { currentUserInfo, wigData } = useGlobalContext();
    
    const [ currentMonday, setCurrentMonday ] = useState( getMondayDate(new Date()) );
    const [ currentWeek, setCurrentWeek ] = useState( getWeek(currentMonday) );
    const [ currentYear, setCurrentYear ] = useState( currentMonday.getUTCFullYear() );

    const [leadDataToShow, setLeadDataToShow] = useState([]);
    const [commitmentsToShow, setCommitmentsToShow] = useState([]);

    const prevWeek = () => {
        const prevMonday = subtractDays(currentMonday, 7);
        setCurrentMonday(prevMonday);
        setCurrentWeek(getWeek(prevMonday));
        setCurrentYear(prevMonday.getUTCFullYear());
    }

    const nextWeek = () => {
        const nextMonday = addDays(currentMonday, 7);
        setCurrentMonday(nextMonday);
        setCurrentWeek(getWeek(nextMonday));
        setCurrentYear(nextMonday.getUTCFullYear());
    }

    const getCurrentUserCommitments = () => {
        const current =  currentUserInfo.commitments.filter(item => {
            const date = new Date(item.startDate);
            return getWeek(date) === currentWeek && date.getUTCFullYear() === currentYear;
        });
        return current;
    }

    const getCurrentLeadData = () => {
        const current = [];
        currentUserInfo.leadMeasures.forEach(leadMeasure => {
            const currentData = leadMeasure.leadData.filter(item => {
                const date = new Date(item.startDate);
                return getWeek(date) === currentWeek && date.getUTCFullYear() === currentYear;
            });

            const leadInfo = wigData.find(wig => wig.wigId === leadMeasure.wigId).leadMeasures.find(lead => lead.leadId === leadMeasure.leadId);

            current.push({
                leadData: currentData,
                wigId: leadMeasure.wigId,
                ...leadInfo,
                // wigName: wigData.find(wig => wig.wigId === leadMeasure.wigId).wigName,
            });
        });
        return current;
    }

    useEffect(() => {
        setCommitmentsToShow(getCurrentUserCommitments());
        setLeadDataToShow(getCurrentLeadData());
    }, [currentMonday]);

    const commitmentCategories = [...new Set(leadDataToShow.map(lm => lm.leadName)), 'Clear the Path', 'Other'];

    return (
        <main className="page-container">
            <section className="page-content wig-session-page">
                <PageHeader pageTitle="Wig Session Page"/>
                    <div className="date-slider">
                        <button onClick={prevWeek} className="date-slider__arrow"><BsFillCaretLeftFill /></button>
                        <div className="date-slider__dates">
                            <p className="date-slider__dates--week">Week {currentWeek} - {currentYear}</p>
                            <p className="date-slider__dates--weekdays">(Mon {currentMonday.toLocaleDateString()} to Sun {addDays(currentMonday,7).toLocaleDateString()})</p>
                        </div>
                        <button onClick={nextWeek} className="date-slider__arrow"><BsFillCaretRightFill /></button>
                        <hr className="date-slider__underline"></hr>
                    </div>
                    <article className="form-container wig-session-page__col-1">
                        <LeadTrackerForm leadMeasures={leadDataToShow} currentMonday={currentMonday}/>
                    </article>
                    <article className="form-container wig-session-page__col-2">
                        <h2 className="form-title">Weekly Commitments</h2>
                        <AddCommitmentForm />
                        <ul className="commitment-list">
                            {commitmentsToShow.map((commitment, index) => {
                                return <CommitmentItem key={index} commitment={commitment} index={index}/>
                            })}
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
