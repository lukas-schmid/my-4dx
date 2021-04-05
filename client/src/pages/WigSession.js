import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import LeadTrackerForm from '../components/LeadTrackerForm';
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

        setCommitmentsToShow(current);
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

        setLeadDataToShow(current);
    }

    useEffect(() => {
        getCurrentUserCommitments();
        getCurrentLeadData();      
    }, [currentMonday]);

    const commitmentCategories = [...new Set(leadDataToShow.map(lm => lm.leadName)), 'Clear the Path', 'Other'];

    return (
        <main className="page-container">
            <section className="page-content">
                <PageHeader pageTitle="Wig Session Page"/>
                    <div>
                        <button onClick={prevWeek}><BsChevronDoubleLeft /></button>
                        <span>Week {currentWeek} - {currentYear}</span>
                        <span>(Mon {currentMonday.toLocaleDateString()} to Sun {addDays(currentMonday,7).toLocaleDateString()})</span>
                        <button onClick={nextWeek}><BsChevronDoubleRight /></button>
                    </div>
                    <article className="form-container">

                        <button onClick={() => {
                            console.log(leadDataToShow)
                        }}>LOG Lead</button>

                        <LeadTrackerForm leadMeasures={leadDataToShow}/>
                    </article>
                    <article className="form-container">

                        <button onClick={() => {
                            console.log(commitmentsToShow)
                        }}>LOG Commitments</button>
                        
                        <p>1) Loop through and show current commitments</p>
                        <p>2) Show a form for adding new commitments</p>

                    </article>
                <PageFooter excludeQuote={true}/>
            </section>
        </main>
    )
}
