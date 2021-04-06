import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import DateSlider from '../components/DateSlider';
// Import helpers
import { getMondayDate, getWeek } from '../helpers';

export default function WigSessionSummary() {
    const { teamData } = useGlobalContext();

    const [ currentMonday, setCurrentMonday ] = useState( getMondayDate(new Date()) );
    const [ currentWeek, setCurrentWeek ] = useState( getWeek(currentMonday) );
    const [ currentYear, setCurrentYear ] = useState( currentMonday.getUTCFullYear() );

    console.log(teamData);
    
    return (
        <main className="page-container">
            <section className="page-content">
                <PageHeader pageTitle="Wig Session Summary"/>
                <DateSlider 
                    currentMonday={currentMonday}
                    setCurrentMonday={setCurrentMonday}
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                />
                <article>
                    DateSlider
                    <br></br>
                    Wig Session Summary page
                </article>
                <PageFooter />
            </section>
        </main>
    )
}
