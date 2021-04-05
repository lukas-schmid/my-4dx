import React from 'react';
// Import helpers
import { getWeek, formatWeekFromTo, formatMonthYear } from '../helpers';

export default function DateMiniHeader({weekOrMonth, date}) {

    return (
        <>
        {weekOrMonth.includes('week') && <div className="form-title mb-10">
            Week {`${getWeek(date)}`} <span style={{
                fontStyle: 'italic',
                fontSize: '0.9rem',
            }}>
                {formatWeekFromTo(date)}
            </span>
        </div>}
        {weekOrMonth.includes('month') && <div className="form-title mb-10">
            {formatMonthYear(date)}
        </div>}
        </>
    )
}
