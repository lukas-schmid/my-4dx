import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import helpers
import { deleteLead } from '../apiHelper';

export default function LeadMeasureSummaryCard({leadMeasure, wigId}) {
    const { getAndUpdateCurrentUserInfo, getAndUpdateTeamData, getAndUpdateWigs } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);

    const deleteLeadMeasure = async id => {
        setIsLoading(true);

        const response = await deleteLead(wigId, id);
        getAndUpdateCurrentUserInfo();
        getAndUpdateTeamData();
        getAndUpdateWigs();
    }

    useEffect(() => {
        return () => setIsLoading(false);
    });

    return (
        <div className="card member-card">
            <div className="card-header member-card__header">
                {leadMeasure.leadName}
            </div>
            <div className="card-body member-card__body">
                <ul>
                    <li className="member-card__listItem">
                        <strong>Lead type:</strong> <span className="capitalize">{leadMeasure.leadDataType} {leadMeasure.leadDataType === 'percent' && '(%)'}</span>
                    </li>
                    <li className="member-card__listItem">
                        <strong>Lead interval:</strong> <span className="capitalize">{leadMeasure.leadInterval}</span>
                    </li>
                    <li className="member-card__listItem">
                        <strong>Lead benchmark:</strong> {leadMeasure.leadBenchmark || 'none'}
                    </li>
                    <li className="member-card__listItem">
                        <button
                            className="btn btn-danger member-card__btn" 
                            onClick={() => deleteLeadMeasure(leadMeasure.leadId)}
                            disabled={isLoading}
                        >
                                {isLoading ? 'Deleting...' : 'Delete Lead Measure'}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
