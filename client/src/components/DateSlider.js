import React from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
// Import helpers
import { addDays, getWeek, subtractDays } from '../helpers';

export default function DateSlider({ currentMonday, setCurrentMonday, currentWeek, setCurrentWeek, currentYear, setCurrentYear }) {
    const { wigData } = useGlobalContext();

    const prevWeek = () => {
        if ( wigData.length === 0 ) return;

        const prevMonday = subtractDays(currentMonday, 7);
        
        const wigStartDates = wigData.map(wig => new Date(wig.startDate));
        const earliestStartDate = new Date(Math.min.apply(null, wigStartDates));
        if ( prevMonday < earliestStartDate && getWeek(prevMonday) !== getWeek(earliestStartDate)) return;

        setCurrentMonday(prevMonday);
        setCurrentWeek(getWeek(prevMonday));
        setCurrentYear(prevMonday.getUTCFullYear());
    }

    const nextWeek = () => {
        if ( wigData.length === 0 ) return;

        const nextMonday = addDays(currentMonday, 7);

        const wigEndDates = wigData.map(wig => new Date(wig.endDate));
        const latestEndDate = new Date(Math.max.apply(null, wigEndDates));
        if (nextMonday > latestEndDate) return;

        setCurrentMonday(nextMonday);
        setCurrentWeek(getWeek(nextMonday));
        setCurrentYear(nextMonday.getUTCFullYear());
    }

    return (
        <div className="date-slider">
            <button onClick={prevWeek} className="date-slider__arrow"><BsFillCaretLeftFill /></button>
            <div className="date-slider__dates">
                <p className="date-slider__dates--week">Week {currentWeek} - {currentYear}</p>
                <p className="date-slider__dates--weekdays">(Mon {currentMonday.toLocaleDateString()} to Sun {addDays(currentMonday,7).toLocaleDateString()})</p>
            </div>
            <button onClick={nextWeek} className="date-slider__arrow"><BsFillCaretRightFill /></button>
            <hr className="date-slider__underline"></hr>
        </div>
    )
}
